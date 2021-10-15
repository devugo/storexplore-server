"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSaleManagerValidation = void 0;
var express_validator_1 = require("express-validator");
exports.updateSaleManagerValidation = [
    express_validator_1.body('firstname').isString().isLength({ min: 2 }),
    express_validator_1.body('lastname').isString().isLength({ min: 2 }),
    express_validator_1.body('dob').isDate(),
];
//# sourceMappingURL=update-sale-manager-validation.js.map