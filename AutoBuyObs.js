var AutoBuyObs;
(function (AutoBuyObs) {
    AutoBuyObs.exampleScript = {};
    AutoBuyObs.exampleScript.OnScriptLoad = function () {
        console.log("AutoBuyWards complite");
    };
    var isAutoBuyActive = Menu.AddToggle(["FrezObs"], "AutoBuyObs", false)
        .SetNameLocale("ru", "Автоматическая покупка Обсерверов")
        .OnChange(function (state) { return (isAutoBuyActive = state.newValue); })
        .GetValue();
    AutoBuyObs.exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame || !isAutoBuyActive) {
            return;
        }
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        var obsWard = GameRules.CanPurchaseItem("item_ward_observer");
        if (Engine.OnceAt(1)) {
            if (obsWard) {
                localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_PURCHASE_ITEM, null, null, 42, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, localHero);
                console.log("Ward buy");
            }
            else {
                console.log("don't have obs ward");
            }
        }
    };
})(AutoBuyObs || (AutoBuyObs = {}));
RegisterScript(AutoBuyObs.exampleScript, "AutoBW");
