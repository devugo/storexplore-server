"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreOwnerValidation = void 0;
var express_validator_1 = require("express-validator");
exports.updateStoreOwnerValidation = [
    express_validator_1.body('name').isString().isLength({ min: 2 }),
];
//# sourceMappingURL=update-store-owner-vaidation.js.map