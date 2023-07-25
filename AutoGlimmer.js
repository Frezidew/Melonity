var AutoGlimmer;
(function (AutoGlimmer) {
    AutoGlimmer.Glimmer = {};
    exampleScript.OnScriptLoad = function () {
        console.log("AutoGlimmer complite");
    };
    var localHero = EntitySystem.GetLocalHero();
    var localPlayer = EntitySystem.GetLocalPlayer();
    var AllyHeroes = [];
    var heroes = EntitySystem.GetHeroesList();
    AutoGlimmer.Glimmer.OnGameEnd = function () {
        isScriptActive = false;
        AllyHeroes = [];
        localHero = null;
        localPlayer = null;
        for (var _i = 0, heroes_1 = heroes; _i < heroes_1.length; _i++) {
            var allyHero = heroes_1[_i];
            if (allyHero.IsSameTeam) {
                AllyHeroes.push(allyHero);
            }
        }
    };
    var isScriptActive = Menu.AddToggle(["FrezGlimmer"], "AutoGlimmer", false)
        .SetNameLocale("ru", "Автоматический сейф Глиммером")
        .OnChange(function (state) { return (isScriptActive = state.newValue); })
        .GetValue();
    function percentHp(percent) {
        for (var _i = 0, AllyHeroes_1 = AllyHeroes; _i < AllyHeroes_1.length; _i++) {
            var hero = AllyHeroes_1[_i];
            var offsetHp = hero.GetMaxHealth() - hero.GetHealth();
            var staticHpProcent = (hero.GetMaxHealth() / 100) * percent; // необходимый процент хп каждого союзного героя let offsetHp = hero.GetMaxHealth() - hero.GetHealth() // сколько не хватиает хп
            if (offsetHp <= staticHpProcent)
                return hero;
            { // если у героя меньше хп или равно значению ты мы его возвращаем return hero
            }
        }
    }
    // тут нужно сделать злоебучий слайдер с процентами
    var ChosenProcent = Menu.AddSlider(["FrezGlimmer"], "AutoGlimmer", 1, 100, 30, 1);
    var HpPercent = percentHp(ChosenProcent);
    exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame || !isScriptActive) {
            return;
        }
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        var AllyHeroes = [];
        var heroes = EntitySystem.GetHeroesList();
        AutoGlimmer.Glimmer.OnGameEnd = function () {
            isScriptActive = false;
            AllyHeroes = [];
            localHero = null;
            localPlayer = null;
            for (var _i = 0, heroes_2 = heroes; _i < heroes_2.length; _i++) {
                var allyHero = heroes_2[_i];
                if (allyHero.IsSameTeam) {
                    AllyHeroes.push(allyHero);
                }
            }
        };
        AutoGlimmer.Glimmer.OnUnitAnimation = function (animation) {
            if (!isScriptActive ||
                !animation.unit ||
                !animation.unit.IsHero() ||
                animation.unit.IsSameTeam(localHero) ||
                !animation.sequenceName.includes("attack")) {
                return;
            }
            ;
            var attackHero = animation.unit;
            var attackAbs = attackHero.GetAbsOrigin();
            var attackTarget = attackHero.FindFacingNPC(Enum.TeamType.TEAM_ENEMY);
            if (attackTarget &&
                attackTarget.IsHero() &&
                attackTarget.GetAbsOrigin().Distance(attackAbs) <= attackHero.GetAttackRange()) { }
            else {
                attackTarget = null;
                for (var _i = 0, AllyHeroes_2 = AllyHeroes; _i < AllyHeroes_2.length; _i++) {
                    var allyHero = AllyHeroes_2[_i];
                    var allypos = allyHero.GetAbsOrigin();
                    if (allypos.Distance(attackAbs) <= attackHero.GetAttackRange()) {
                        break;
                    }
                }
            }
            if (!attackTarget) {
                return;
            }
            // Тут нужно сделать зависимость по срабатыванию от слайдера с процентами
            if (attackTarget.GetHealth() < attackHero.GetMinDamage()) {
                var GlimmerItem = localHero.GetItem("item_glimmer_cape", true);
                if (!GlimmerItem || GlimmerItem.GetCooldown() > 0) {
                    return;
                }
                localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_TARGET, attackTarget, attackTarget.GetAbsOrigin(), GlimmerItem, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);
            }
        };
    };
})(AutoGlimmer || (AutoGlimmer = {}));
RegisterScript(AutoGlimmer.Glimmer, "AutoGlimmer");
