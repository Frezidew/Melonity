var PredictScript;
(function (PredictScript) {
    PredictScript.prescript = {};
    var KeyBind;
    var PATH = ["FrezPredict"];
    var enable = Menu.AddToggle(PATH, "Enable", false)
        .OnChange(function (state) { return (enable = state.newValue); })
        .SetGeneral(true)
        .GetValue();
    KeyBind = Menu.AddKeyBind(PATH, "Bind", Enum.ButtonCode.KEY_NONE);
    var localhero;
    var localplayer;
    PredictScript.prescript.OnGameStart = function () {
        localhero = EntitySystem.GetLocalHero();
        localplayer = EntitySystem.GetLocalPlayer();
    };
    PredictScript.prescript.OnUpdate = function () {
        if (!enable) {
            return;
        }
        var Heroes = EntitySystem.GetHeroesList();
        if (KeyBind.IsKeyDownOnce()) {
            var NearHero = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY);
            var NearHeroPos = NearHero.GetAbsOrigin();
            if (NearHero.GetAbsOrigin().Distance(localhero.GetAbsOrigin()) <= 1300 + localhero.GetCastRangeBonus()) {
            }
            {
                localplayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION, null, NearHeroPos, localhero.GetAbility("pudge_meat_hook"), Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localhero);
            }
        }
    };
    RegisterScript(PredictScript.prescript, "Predict");
})(PredictScript || (PredictScript = {}));
