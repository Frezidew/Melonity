var AutoLotus;
(function (AutoLotus) {
    AutoLotus.exampleScript = {};
    AutoLotus.exampleScript.OnScriptLoad = function () {
        console.log('AutoLotosFrez complite');
    };
    var truefalse;
    var AutoLotos = Menu.AddToggle(['Frezidevv'], 'AutoLotos', true);
    AutoLotos.OnChange(function (state) {
        truefalse = state.newValue;
    });
    AutoLotus.exampleScript.OnUpdate = function () {
        if (!truefalse) {
            return;
        }
    };
    var HealthLotus = Menu.AddSlider(['FrzScript'], 'Хп для активации', 10, 1000, 100, 10);
    AutoLotus.exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame) {
            return;
        }
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        var lotus = localHero.GetItem("item_famango", true) ? localHero.GetItem("item_famango", true) : localHero.GetItem("item_great_famango", true) ? localHero.GetItem("item_greater_famango", true)
            :
        ;
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
