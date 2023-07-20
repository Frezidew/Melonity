namespace AutoLotus {
    export let exampleScript: ScriptDescription = {};
    
    let ir = "eroe"
    
    exampleScript.OnScriptLoad = () => {
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
    
    let AutoLotos = 
        Menu.AddToggle(['Frezidevv'],  'AutoLotos', true,)
    
    let HealthLotus = Menu.AddSlider(['FrzScript'], 'Хп для активации', 10, 1000, 100, 10)
    
    
    exampleScript.OnUpdate = () => {
        if (!GameRules.IsActiveGame){
            return
        }
        let localHero = EntitySystem.GetLocalHero();
        let localPlayer = EntitySystem.GetLocalPlayer();
    
        //  let items = LocalHero.GetItem("item_magic_stick", true);
        
        // for (let index = 0; index < items.length; index++) {
        //     const element = items[index];
        //     console.log(element.GetName())
        // }
    
        let lotus = localHero.GetItem("famango", true) ? localHero.GetItem("famango", true) : localHero.GetItem("famango", true)
        if (!localPlayer || !localHero){
            return
        }
    
        if (localHero.GetHealth() > HealthLotus.GetValue() - 1){
            return
        }
    
        localPlayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_NO_TARGET, localHero, null, lotus, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localHero,);
    
        // console.log(stick.GetCurrentCharges())
        // if (Engine.OnceAtByKey(0, 'уник название') { ...code }
    
    }
    
    // exampleScript.OnUpdate = () => {
    //     if (myOption.GetValue() === true) {
    //         console.log('Option is enabled');
    //     } else {
    //         console.log('Option is disabled :(');
    //     }
    // };
    }
    
    RegisterScript(AutoLotus.exampleScript);