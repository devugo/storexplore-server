"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Routes = void 0;
var auth_1 = require("./route/auth");
var chats_1 = require("./route/chats");
var products_1 = require("./route/products");
var sale_manager_1 = require("./route/sale-manager");
var sales_1 = require("./route/sales");
var store_1 = require("./route/store");
var store_owner_1 = require("./route/store-owner");
exports.Routes = __spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray(__spreadArray([], auth_1.AuthRoutes), store_1.StoreRoutes), sale_manager_1.SaleManagerRoutes), products_1.ProductRoutes), sales_1.SaleRoutes), chats_1.ChatRoutes), store_owner_1.StoreOwnerRoutes);
//# sourceMappingURL=routes.js.map