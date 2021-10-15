"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
var UserService_1 = require("../service/UserService");
var express_validator_1 = require("express-validator");
var throw_error_1 = require("../helper/throw-error");
var ERROR_CODE_1 = require("../constant/ERROR_CODE");
var StoreOwnerService_1 = require("../service/StoreOwnerService");
var validation_error_message_1 = require("../helper/validation-error-message");
var StoreService_1 = require("../service/StoreService");
var UserController = /** @class */ (function () {
    function UserController() {
        this.userService = new UserService_1.UserService();
        this.storeOwnerService = new StoreOwnerService_1.StoreOwnerService();
        this.storeService = new StoreService_1.StoreService();
    }
    UserController.prototype.register = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, name, storeName, errors, user, error_1, err;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, password = _a.password, name = _a.name, storeName = _a.storeName;
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ message: validation_error_message_1.validationErrorMessage(errors.array()) })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.userService.register({ email: email, password: password })];
                    case 2:
                        user = _b.sent();
                        //  Create store owner
                        return [4 /*yield*/, this.storeOwnerService.create({ name: name }, user)];
                    case 3:
                        //  Create store owner
                        _b.sent();
                        //  Create store
                        return [4 /*yield*/, this.storeService.create({
                                name: storeName,
                                user: user,
                            })];
                    case 4:
                        //  Create store
                        _b.sent();
                        return [2 /*return*/, response.status(201).json(user)];
                    case 5:
                        error_1 = _b.sent();
                        err = throw_error_1.throwError(error_1);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.code === 409 ? 'User with the email already exist' : err.message,
                                success: false,
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.login = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, email, password, error_2, err;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = request.body, email = _a.email, password = _a.password;
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userService.login({ email: email, password: password })];
                    case 2: return [2 /*return*/, _b.sent()];
                    case 3:
                        error_2 = _b.sent();
                        err = throw_error_1.throwError({ code: ERROR_CODE_1.ERROR_CODE.unathorize }, error_2.message);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.retain = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, err_1, error;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userService.retain(email)];
                    case 2:
                        user = _a.sent();
                        return [2 /*return*/, user];
                    case 3:
                        err_1 = _a.sent();
                        error = throw_error_1.throwError({ code: ERROR_CODE_1.ERROR_CODE.notFound });
                        return [2 /*return*/, response.status(error.code).json({
                                message: error.message,
                                success: false,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    UserController.prototype.changePassword = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var errors, email, _a, password, passwordAgain, user, err_2, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ message: validation_error_message_1.validationErrorMessage(errors.array()) })];
                        }
                        email = request.user.email;
                        _a = request.body, password = _a.password, passwordAgain = _a.passwordAgain;
                        if (password !== passwordAgain) {
                            return [2 /*return*/, response.status(400).json({
                                    message: 'Passwords do not match!',
                                })];
                        }
                        _b.label = 1;
                    case 1:
                        _b.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.userService.changePassword(email, request.body)];
                    case 2:
                        user = _b.sent();
                        return [2 /*return*/, user];
                    case 3:
                        err_2 = _b.sent();
                        error = throw_error_1.throwError({ code: ERROR_CODE_1.ERROR_CODE.notFound });
                        return [2 /*return*/, response.status(error.code).json({
                                message: error.message,
                                success: false,
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return UserController;
}());
exports.UserController = UserController;
//# sourceMappingURL=UserController.js.map