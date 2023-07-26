var AutoGlimmer;
(function (AutoGlimmer) {
    AutoGlimmer.glisript = {};
    var localHero;
    var glimmer;
    var AllyHeroes;
    var PATH = ["FrezGlimmer"];
    var localPlayer = EntitySystem.GetLocalPlayer();
    var enable = Menu.AddToggle(PATH, "Enable", false)
        .OnChange(function (state) { return (enable = state.newValue); })
        .GetValue();
    var minPercentHP = Menu.AddSlider(PATH, "%HP", 0, 100, 30, 1).OnChange(function (state) { return (minPercentHP = state.newValue); })
        .OnChange(function (state) { return minPercentHP = state.newValue; })
        .GetValue();
    AutoGlimmer.glisript.OnScriptLoad = AutoGlimmer.glisript.OnGameStart = function () {
        console.log("AutoGlimmer loaded");
        localHero = EntitySystem.GetLocalHero(); //Получаем героя при калбеке
        localPlayer = EntitySystem.GetLocalPlayer(); //Получаем плеера при калбеке
        if (!localHero || !localPlayer) { // если нету героя или плеера, return
            return;
        }
        AllyHeroes = EntitySystem.GetHeroesList().filter(function (hero) { return hero.IsSameTeam(localHero); }); // если всё норм, то получаем всех героев, фильтруем только союзных
    };
    AutoGlimmer.glisript.OnGameEnd = function () {
        localHero = null; //Удаляем героя при окончании игры
        localPlayer = null; //Удаляем плеера при окончании игры
        AllyHeroes = []; // очищаем массив при окончании игры
    };
    AutoGlimmer.glisript.OnUpdate = function () {
        if (!enable) {
            return;
        }
        glimmer = localHero.GetItem('item_glimmer_cape', true); // получаем у героя глимер
        if (!glimmer || glimmer.GetCooldown() != 0 || glimmer.GetManaCost() > localHero.GetMana()) {
            return;
        } // если глимер не найден то return
        var rangeGlimmer = 600 + localHero.GetCastRangeBonus(); // если глимер найден то получаем его каст рэндж
        for (var _i = 0, AllyHeroes_1 = AllyHeroes; _i < AllyHeroes_1.length; _i++) { // идём по массиву из союзных героев
            var allyHero = AllyHeroes_1[_i];
            //1 процент HP    умножаем на минимальный процент использования
            var nowPercentHP = (allyHero.GetMaxHealth() / 100) * minPercentHP;
            if (nowPercentHP >= allyHero.GetHealth()) { // 700 < 300, если у героя больше или ровно 300 хп, то true
                if (localHero.GetAbsOrigin().Distance(allyHero.GetAbsOrigin()) <= rangeGlimmer) { // если каст ренджи глимера хватает то true
                    console.log('test3');
                    localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET, // вид использования таргет/позиция
                    allyHero, // энтити на кого использовать
                    null, // позиция энтити на кого будем использовать
                    glimmer, // предмет который будем использоватиь
                    Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, // кто вызывает скрипт
                    localHero); // энтити который будет использовать предмет
                }
            }
        }
    };
    RegisterScript(AutoGlimmer.glisript, "AutoGlimmer");
})(AutoGlimmer || (AutoGlimmer = {}));
