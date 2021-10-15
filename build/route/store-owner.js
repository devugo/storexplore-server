"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreOwnerRoutes = void 0;
var StoreOwnerController_1 = require("../controller/StoreOwnerController");
var authenticate_1 = require("../middleware/authenticate");
var update_store_owner_vaidation_1 = require("../validation/update-store-owner-vaidation");
exports.StoreOwnerRoutes = [
    {
        method: 'patch',
        route: '/store-owner',
        controller: StoreOwnerController_1.StoreOwnerController,
        action: 'update',
        middleware: authenticate_1.authenticate,
        validation: update_store_owner_vaidation_1.updateStoreOwnerValidation,
    },
    {
        method: 'patch',
        route: '/store-owner/avatar',
        controller: StoreOwnerController_1.StoreOwnerController,
        action: 'uploadAvatar',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
];
//# sourceMappingURL=store-owner.js.map