var BranchAbuse;
(function (BranchAbuse) {
    var branch = {};
    var KeyBind;
    var PATH = ["FrezBranch"];
    var localhero;
    var localplayer;
    var enable = Menu.AddToggle(PATH, "Enable", false)
        .OnChange(function (state) { return (enable = state.newValue); })
        .SetGeneral(true)
        .GetValue();
    KeyBind = Menu.AddKeyBind(PATH, "Бинд", Enum.ButtonCode.KEY_NONE);
    branch.OnGameStart = branch.OnScriptLoad = function () {
        localhero = EntitySystem.GetLocalHero();
        localplayer = EntitySystem.GetLocalPlayer();
    };
    // я дура
    branch.OnGameEnd = function () {
        localhero = null;
        localplayer = null;
    };
    branch.OnUpdate = function () {
        if (!enable) {
            return;
        }
        if (KeyBind.IsKeyDown()) {
            var absLocalHero = localhero.GetAbsOrigin();
            var ItemBranch = localhero.GetItem("item_branches", true);
            if (!ItemBranch || localhero.IsAlive()) {
                return;
            }
            localplayer.PrepareUnitOrders(Enum.UnitOrder.DOTA_UNIT_ORDER_CAST_POSITION, null, absLocalHero, ItemBranch, Enum.PlayerOrderIssuer.DOTA_ORDER_ISSUER_HERO_ONLY, localhero);
        }
    };
    RegisterScript(branch, "BranchAbuse");
})(BranchAbuse || (BranchAbuse = {}));
