"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductRoutes = void 0;
var ProductController_1 = require("../controller/ProductController");
var authenticate_1 = require("../middleware/authenticate");
var activate_resource_validation_1 = require("../validation/activate-resource-validation");
var create_product_validation_1 = require("../validation/create-product-validation");
exports.ProductRoutes = [
    {
        method: 'post',
        route: '/products',
        controller: ProductController_1.ProductController,
        action: 'create',
        middleware: authenticate_1.authenticate,
        validation: create_product_validation_1.createProductValidation,
    },
    {
        method: 'get',
        route: '/products',
        controller: ProductController_1.ProductController,
        action: 'get',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'get',
        route: '/products/:id',
        controller: ProductController_1.ProductController,
        action: 'getOne',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'delete',
        route: '/products/:id',
        controller: ProductController_1.ProductController,
        action: 'delete',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'patch',
        route: '/products/:id',
        controller: ProductController_1.ProductController,
        action: 'update',
        middleware: authenticate_1.authenticate,
        validation: create_product_validation_1.createProductValidation,
    },
    {
        method: 'patch',
        route: '/products/activate/:id',
        controller: ProductController_1.ProductController,
        action: 'activate',
        middleware: authenticate_1.authenticate,
        validation: activate_resource_validation_1.activateResourceValidation,
    },
    {
        method: 'patch',
        route: '/products/image/:id',
        controller: ProductController_1.ProductController,
        action: 'uploadImage',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
];
//# sourceMappingURL=products.js.map