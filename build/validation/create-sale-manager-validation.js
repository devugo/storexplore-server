"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createSaleManagerValidation = void 0;
var express_validator_1 = require("express-validator");
exports.createSaleManagerValidation = [
    express_validator_1.body('firstname').isString().isLength({ min: 2 }),
    express_validator_1.body('lastname').isString().isLength({ min: 2 }),
    express_validator_1.body('password').isLength({ min: 5 }),
    express_validator_1.body('email').isEmail(),
    express_validator_1.body('dob').isDate(),
];
//# sourceMappingURL=create-sale-manager-validation.js.map