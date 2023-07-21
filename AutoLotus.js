var AutoLotus;
(function (AutoLotus) {
    AutoLotus.exampleScript = {};
    var ir = "eroe";
    AutoLotus.exampleScript.OnScriptLoad = function () {
        console.log('AutoLotosFrez complite');
    };
    // let inputBoxValue = Menu.AddInputBox(
    //     ['My', 'Own', 'Path'], // whereAt
    //     'Input Box', // name
    //     'Test' // defaultValue
    // )
    //     .SetNameLocale(locale, loc(locale, "weatherChanger", "type"))
    //     .OnChange(state => (inputBoxValue = state.newValue))
    //     .GetValue();
    // exampleScript.OnUpdate = () => {
    //     console.log(`Current input box value ${inputBoxValue}`);
    // };
    var AutoLotos = Menu.AddToggle(['Frezidevv'], 'AutoLotos', true);
    var HealthLotus = Menu.AddSlider(['FrzScript'], 'Хп для активации', 10, 1000, 100, 10);
    AutoLotus.exampleScript.OnUpdate = function () {
        if (!GameRules.IsActiveGame) {
            return;
        }
        var localHero = EntitySystem.GetLocalHero();
        var localPlayer = EntitySystem.GetLocalPlayer();
        //  let items = LocalHero.GetItem("item_magic_stick", true);
        // for (let index = 0; index < items.length; index++) {
        //     const element = items[index];
        //     console.log(element.GetName())
        // }
        var lotus = localHero.GetItem("item_famango", true) ? localHero.GetItem("item_famango", true) : localHero.GetItem("item_famango", true);
        if (!localPlayer || !localHero) {
            return;
        }
        if (localHero.GetHealth() > HealthLotus.GetValue() - 1) {
            return;
        }
        localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET, localHero, null, lotus, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero);
        // console.log(stick.GetCurrentCharges())
        // if (Engine.OnceAtByKey(0, 'уник название') { ...code }
    };
    // exampleScript.OnUpdate = () => {
    //     if (myOption.GetValue() === true) {
    //         console.log('Option is enabled');
    //     } else {
    //         console.log('Option is disabled :(');
    //     }
    // };
})(AutoLotus || (AutoLotus = {}));
RegisterScript(AutoLotus.exampleScript);
