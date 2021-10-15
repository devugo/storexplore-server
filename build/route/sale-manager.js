"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleManagerRoutes = void 0;
var SaleManagerController_1 = require("../controller/SaleManagerController");
var authenticate_1 = require("../middleware/authenticate");
var activate_resource_validation_1 = require("../validation/activate-resource-validation");
var create_sale_manager_validation_1 = require("../validation/create-sale-manager-validation");
var update_sale_manager_validation_1 = require("../validation/update-sale-manager-validation");
exports.SaleManagerRoutes = [
    {
        method: 'post',
        route: '/sale-managers',
        controller: SaleManagerController_1.SaleManagerController,
        action: 'create',
        middleware: authenticate_1.authenticate,
        validation: create_sale_manager_validation_1.createSaleManagerValidation,
    },
    {
        method: 'get',
        route: '/sale-managers',
        controller: SaleManagerController_1.SaleManagerController,
        action: 'get',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'get',
        route: '/sale-managers/one',
        controller: SaleManagerController_1.SaleManagerController,
        action: 'getOne',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'delete',
        route: '/sale-managers/:id',
        controller: SaleManagerController_1.SaleManagerController,
        action: 'delete',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'patch',
        route: '/sale-managers',
        controller: SaleManagerController_1.SaleManagerController,
        action: 'update',
        middleware: authenticate_1.authenticate,
        validation: update_sale_manager_validation_1.updateSaleManagerValidation,
    },
    {
        method: 'patch',
        route: '/sale-managers/activate/:id',
        controller: SaleManagerController_1.SaleManagerController,
        action: 'activate',
        middleware: authenticate_1.authenticate,
        validation: activate_resource_validation_1.activateResourceValidation,
    },
    {
        method: 'patch',
        route: '/sale-managers/avatar',
        controller: SaleManagerController_1.SaleManagerController,
        action: 'uploadAvatar',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
];
//# sourceMappingURL=sale-manager.js.map