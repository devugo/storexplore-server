"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUserValidation = void 0;
var express_validator_1 = require("express-validator");
exports.createUserValidation = [
    express_validator_1.body('email').isEmail(),
    express_validator_1.body('password').isLength({ min: 5 }),
    express_validator_1.body('name').isLength({ min: 3 }),
    express_validator_1.body('storeName').isLength({ min: 3 }),
];
//# sourceMappingURL=create-user-validation.js.map