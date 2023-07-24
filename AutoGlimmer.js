var AutoGlimmer;
(function (AutoGlimmer) {
    AutoGlimmer.Glimmer = {};
    exampleScript.OnScriptLoad = function () {
        console.log("AutoGlimmer complite");
    };
    var isScriptActive = Menu.AddToggle(["FrezGlimmer"], "AutoGlimmer", false) && Menu.AddSlider(["FrezGlimmer"], "AutoGlimmer", 1, 100, 30, 1)
        .SetNameLocale("ru", "Автоматический сейф Глиммером")
        .OnChange(function (state) { return (isScriptActive = state.newValue); })
        .GetValue();
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
            for (var _i = 0, heroes_1 = heroes; _i < heroes_1.length; _i++) {
                var allyHero = heroes_1[_i];
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
                for (var _i = 0, AllyHeroes_1 = AllyHeroes; _i < AllyHeroes_1.length; _i++) {
                    var allyHero = AllyHeroes_1[_i];
                    var allypos = allyHero.GetAbsOrigin();
                    if (allypos.Distance(attackAbs) <= attackHero.GetAttackRange()) {
                        break;
                    }
                }
            }
            if (!attackTarget) {
                return;
            }
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
