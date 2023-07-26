var BranchAbuse;
(function (BranchAbuse) {
    var branch = {};
    var KeyBind;
    var PATH = ["FrezBranch"];
    var localhero;
    var localplayer;
    KeyBind = Menu.AddKeyBind(PATH, "Бинд", Enum.ButtonCode.KEY_NONE);
    branch.OnGameStart = branch.OnScriptLoad = function () {
        localhero = EntitySystem.GetLocalHero();
        localplayer = EntitySystem.GetLocalPlayer();
    };
    branch.OnUpdate = function () {
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
