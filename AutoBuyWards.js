var AutoBuyWards;
(function (AutoBuyWards) {
    AutoBuyWards.exampleScript = {};
    AutoBuyWards.exampleScript.OnScriptLoad = function () {
        console.log('AutoBuyWards complite');
    };
    var IsAutoBuyActive = Menu.AddToggle(['Frezidew'], 'AutoBuyWards', true);
    AutoBuyWards.exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame) {
            return;
        }
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        var Wards = GameRules.CanPurchaseItem("item_ward_observer") ? GameRules.CanPurchaseItem("item_ward_observer") : GameRules.CanPurchaseItem("item_ward_sentry");
        var WardsSentry = GameRules.CanPurchaseItem("item_ward_sentry") ? GameRules.CanPurchaseItem("item_ward_sentry") : GameRules.CanPurchaseItem("item_ward_observer");
        if (!localPlayer || !localHero) {
            return;
        }
        localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_PURCHASE_ITEM, null, null, 42, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, localHero);
    };
})(AutoBuyWards || (AutoBuyWards = {}));
RegisterScript(AutoBuyWards.exampleScript);
