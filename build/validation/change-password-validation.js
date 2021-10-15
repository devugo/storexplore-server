"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.changePasswordValidation = void 0;
var express_validator_1 = require("express-validator");
exports.changePasswordValidation = [
    express_validator_1.body('password').isLength({ min: 3 }),
    express_validator_1.body('passwordAgain').isLength({ min: 3 }),
];
//# sourceMappingURL=change-password-validation.js.map