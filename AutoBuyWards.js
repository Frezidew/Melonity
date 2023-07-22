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
        if (GameRules.CanPurchaseItem('item_ward_observer')) {
            localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_PURCHASE_ITEM, null, null, 42, Enum.PlayerOrderIssuer
                .DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, localHero);
        }
        if (GameRules.CanPurchaseItem('item_ward_sentry')) {
            localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_PURCHASE_ITEM, null, null, 42, Enum.PlayerOrderIssuer
                .DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, localHero);
        }
    };
})(AutoBuyWards || (AutoBuyWards = {}));
RegisterScript(AutoBuyWards.exampleScript);
