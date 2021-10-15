"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProductValidation = void 0;
var express_validator_1 = require("express-validator");
exports.createProductValidation = [
    express_validator_1.body('name').isString().isLength({ min: 2 }),
    express_validator_1.body('description').isString(),
    express_validator_1.body('quantity').isNumeric(),
    express_validator_1.body('image').isString().optional(),
    express_validator_1.body('store').isString().optional(),
];
//# sourceMappingURL=create-product-validation.js.map