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
    PredictScript.prescript.OnGameStart = PredictScript.prescript.OnScriptLoad = function () {
        if (Engine.OnceAt(1)) { // это чтоб у тебя фпс не просаживался
            var Heroes = EntitySystem.GetHeroesList(); //если ты это не будешь в энжин засовывать, тебя матвей в жопу выебет
        }
        var NearHero = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY); //Вот эта вся хуня снизу получает расстояние до героя возле курсора
        var localhero = EntitySystem.GetLocalHero();
        var localplayer = EntitySystem.GetLocalPlayer();
        var NearHeroPos = NearHero.GetAbsOrigin();
        if (!enable) {
            return;
        }
        if (KeyBind.IsKeyDownOnce()) {
            if (localhero.GetAbsOrigin().Distance(NearHeroPos) <= 1300 + localhero.GetCastRangeBonus() && enable) { // эта ебатория вычисляет хватает ли дистанции на хук. Если нет - то тебе скажут что ты даун
                localplayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION, null, NearHeroPos, localhero.GetAbility("pudge_meat_hook"), Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localhero);
                console.log("Хук нашёл");
            }
            else {
                console.log("Хук не нашёл");
            }
        }
    };
    RegisterScript(PredictScript.prescript, "Predict");
})(PredictScript || (PredictScript = {}));
