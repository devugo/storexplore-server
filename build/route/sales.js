"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SaleRoutes = void 0;
var SaleController_1 = require("../controller/SaleController");
var authenticate_1 = require("../middleware/authenticate");
exports.SaleRoutes = [
    {
        method: 'get',
        route: '/sales',
        controller: SaleController_1.SaleController,
        action: 'get',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'get',
        route: '/sales-summary',
        controller: SaleController_1.SaleController,
        action: 'dashboardSummary',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
];
//# sourceMappingURL=sales.js.map