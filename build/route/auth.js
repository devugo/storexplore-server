"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
var UserController_1 = require("../controller/UserController");
var authenticate_1 = require("../middleware/authenticate");
var change_password_validation_1 = require("../validation/change-password-validation");
var create_user_validation_1 = require("../validation/create-user-validation");
exports.AuthRoutes = [
    {
        method: 'post',
        route: '/auth/register',
        controller: UserController_1.UserController,
        action: 'register',
        middleware: null,
        validation: create_user_validation_1.createUserValidation,
    },
    {
        method: 'post',
        route: '/auth/login',
        controller: UserController_1.UserController,
        action: 'login',
        middleware: null,
        validation: [],
    },
    {
        method: 'get',
        route: '/auth/retain',
        controller: UserController_1.UserController,
        action: 'retain',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
    {
        method: 'patch',
        route: '/auth/change-password',
        controller: UserController_1.UserController,
        action: 'changePassword',
        middleware: authenticate_1.authenticate,
        validation: change_password_validation_1.changePasswordValidation,
    },
];
//# sourceMappingURL=auth.js.map