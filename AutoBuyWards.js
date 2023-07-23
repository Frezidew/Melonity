var AutoBuyWards;
(function (AutoBuyWards_1) {
    var AutoBuyWards = {};
    AutoBuyWards_1.exampleScript = {};
    AutoBuyWards_1.exampleScript.OnScriptLoad = function () {
        console.log('AutoBuyWards complite');
    };
    var IsAutoBuyActive = Menu.AddToggle(['Frezidew'], 'AutoBuyWards', true);
    AutoBuyWards_1.exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame) {
            return;
        }
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        var obsWard = GameRules.CanPurchaseItem('item_ward_observer');
        if (Engine.OnceAt(1)) {
            if (obsWard) {
                localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_PURCHASE_ITEM, null, null, 42, Enum.PlayerOrderIssuer
                    .DOTA_ORDER_ISSUER_PASSED_UNIT_ONLY, localHero);
                console.log("Ward buy");
            }
            else {
                console.log("don't have obs ward");
            }
        }
    };
})(AutoBuyWards || (AutoBuyWards = {}));
RegisterScript(AutoBuyWards.exampleScript, "AutoBW");
