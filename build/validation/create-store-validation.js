"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStoreValidation = void 0;
var express_validator_1 = require("express-validator");
exports.createStoreValidation = [
    express_validator_1.body('name').isLength({ min: 3 }),
    express_validator_1.body('industry').isLength({ min: 4 }),
];
//# sourceMappingURL=create-store-validation.js.map