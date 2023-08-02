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
    PredictScript.prescript.OnGameStart = function () {
        // это чтоб у тебя фпс не просаживался
        //если ты это не будешь в энжин засовывать, тебя матвей в жопу выебет
        //Вот эта вся хуня снизу получает расстояние до героя возле курсора
        var localhero = EntitySystem.GetLocalHero();
        var localplayer = EntitySystem.GetLocalPlayer();
        var Heroes = EntitySystem.GetHeroesList();
        if (KeyBind.IsKeyDown()) {
            var NearHero = Input.GetNearestHeroToCursor(Enum.TeamType.TEAM_ENEMY);
            var NearHeroPos = NearHero.GetAbsOrigin();
            if (localhero.GetAbsOrigin().Distance(NearHeroPos) <= 1300 && enable) // эта ебатория вычисляет хватает ли дистанции на хук. Если нет - то тебе скажут что ты даун
             {
                console.log("Получил местоположение героя");
                localplayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION, null, NearHeroPos, localhero.GetAbility("pudge_meat_hook"), Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localhero);
                console.log("Хук нашёл, ренжу получил");
            }
            else {
                console.log("Хук не нашёл");
            }
        }
    };
    RegisterScript(PredictScript.prescript, "Predict");
})(PredictScript || (PredictScript = {}));
