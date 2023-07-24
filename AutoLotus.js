var AutoLotus;
(function (AutoLotus_1) {
    AutoLotus_1.exampleScript = {};
    AutoLotus_1.exampleScript.OnScriptLoad = function () {
        console.log("AutoLotosFrez complite");
    };
    var AutoLotus = Menu.AddToggle(["FrezLotus"], "AutoLotus", false)
        .SetNameLocale("ru", "АвтоЛотус")
        .OnChange(function (state) { return (AutoLotus = state.newValue); })
        .GetValue();
    var HealthLotus = Menu.AddSlider(["FrezLotus"], "Хп для активации", 10, 1000, 100, 10);
    AutoLotus_1.exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame || !AutoLotus)
            return;
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        var lotus = localHero.GetItem("item_greater_famango", true) ||
            localHero.GetItem("item_great_famango", true) ||
            localHero.GetItem("item_famango", true);
        if (localHero.GetHealth() > HealthLotus.GetValue() - 1) {
            return;
        }
        localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET, localHero, null, lotus, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);
    };
})(AutoLotus || (AutoLotus = {}));
RegisterScript(AutoLotus.exampleScript);
