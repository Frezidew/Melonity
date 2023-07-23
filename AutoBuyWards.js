"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.exampleScript = void 0;
var AutoBW = {};
exports.exampleScript = {};
exports.exampleScript.OnScriptLoad = function () {
    console.log('AutoBuyWards complite');
};
var IsAutoBuyActive = Menu.AddToggle(['Frezidew'], 'AutoBuyWards', true);
exports.exampleScript.OnUpdate = function () {
    if (!GameRules.IsActiveGame) {
        return;
    }
    AutoBW.OnUpdate = function () {
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
};
RegisterScript(AutoBW, "AutoBW");
