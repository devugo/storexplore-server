"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleValidation = void 0;
var express_validator_1 = require("express-validator");
exports.createSaleValidation = [
    express_validator_1.body('soldAt').isString(),
    express_validator_1.body('quantity').isString(),
    express_validator_1.body('product').isString(),
];
//# sourceMappingURL=create-sale-validation.js.map