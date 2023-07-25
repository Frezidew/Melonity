var precNumber;
var AutoGlimmer;
(function (AutoGlimmer) {
    AutoGlimmer.glisript = {};
    var PATH = ["FrezGlimmer"];
    var HeroHpPrecent;
    var localHero = EntitySystem.GetLocalHero();
    var localPlayer = EntitySystem.GetLocalPlayer();
    var HeroList = EntitySystem.GetHeroesList();
    var AllyHeroes = HeroList.filter(function (hero) { return hero.IsSameTeam(localHero); });
    Menu.AddSlider(PATH, "AutoGlimmer", 0, 100, 30, 1).OnChange(function (state) { return (precNumber = state.newValue); });
    var enable = Menu.AddToggle(PATH, "AutoGlimmer", false)
        .OnChange(function (state) { return (enable = state.newValue); })
        .GetValue();
    AutoGlimmer.glisript.OnScriptLoad = AutoGlimmer.glisript.OnGameStart = function () {
        function percentHp(percent) {
            for (var _i = 0, AllyHeroes_1 = AllyHeroes; _i < AllyHeroes_1.length; _i++) {
                var hero = AllyHeroes_1[_i];
                var offsetHp = hero.GetMaxHealth() - hero.GetHealth();
                var staticHpProcent = (hero.GetMaxHealth() / 100) * percent; // необходимый процент хп каждого союзного героя let offsetHp = hero.GetMaxHealth() - hero.GetHealth() // сколько не хватиает хп
                if (offsetHp <= staticHpProcent)
                    return hero;
                {
                }
            }
        }
        HeroHpPrecent = percentHp(precNumber);
    };
    var glimmer = localHero.GetItem("item_glimmer_cape", true);
    AutoGlimmer.glisript.OnUpdate = function () {
        if (enable) {
            for (var _i = 0, _a = localHero.GetItems(true); _i < _a.length; _i++) {
                var item = _a[_i];
                if (item != glimmer) {
                    return;
                }
                ;
                console.log('У тебя героя есть глимер');
            }
            if (glimmer) {
                var range = glimmer.GetCastRange() + localHero.GetCastRangeBonus();
                console.log('Тебе хватает ренжы для глимера');
                if (range) {
                    console.log('Ты используешь глимер');
                    localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION, HeroHpPrecent, HeroHpPrecent.GetAbsOrigin(), glimmer, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);
                }
            }
        }
    };
    RegisterScript(AutoGlimmer.glisript, "AutoGlimmer");
})(AutoGlimmer || (AutoGlimmer = {}));
