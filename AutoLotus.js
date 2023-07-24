var AutoLotus;
(function (AutoLotus) {
    AutoLotus.exampleScript = {};
    AutoLotus.exampleScript.OnScriptLoad = function () {
        console.log('AutoLotosFrez complite');
    };
    var AutoLotos = Menu.AddToggle(['Frezidevv'], 'AutoLotos', true);
    var HealthLotus = Menu.AddSlider(['Frezidevv'], 'Хп для активации', 10, 1000, 100, 10);
    AutoLotus.exampleScript.OnUpdate = function () {
        if (AutoLotos.GetValue() != true) {
            return;
        }
    };
    AutoLotus.exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame) {
            return;
        }
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        var lotus = localHero.GetItem("item_famango", true) ? localHero.GetItem("item_famango", true) : localHero.GetItem("item_great_famango", true) ? localHero.GetItem("item_greater_famango", true) : localHero.GetItem("item_famango", true);
        if (!localPlayer || !localHero) {
            return;
        }
        if (localHero.GetHealth() > HealthLotus.GetValue() - 1) {
            return;
        }
        localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET, localHero, null, lotus, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);
    };
})(AutoLotus || (AutoLotus = {}));
RegisterScript(AutoLotus.exampleScript);
