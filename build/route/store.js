"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StoreRoutes = void 0;
var StoreController_1 = require("../controller/StoreController");
var authenticate_1 = require("../middleware/authenticate");
var create_store_validation_1 = require("../validation/create-store-validation");
exports.StoreRoutes = [
    {
        method: 'get',
        route: '/stores/mine',
        controller: StoreController_1.StoreController,
        action: 'single',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'patch',
        route: '/stores/:id',
        controller: StoreController_1.StoreController,
        action: 'update',
        middleware: authenticate_1.authenticate,
        validation: create_store_validation_1.createStoreValidation,
    },
    {
        method: 'post',
        route: '/stores/upload-logo/:id',
        controller: StoreController_1.StoreController,
        action: 'uploadLogo',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
];
//# sourceMappingURL=store.js.map