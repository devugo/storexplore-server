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
exports.SaleManagerController = void 0;
var typeorm_1 = require("typeorm");
var express_validator_1 = require("express-validator");
var throw_error_1 = require("../helper/throw-error");
var User_1 = require("../entity/User");
var Formidable = require("formidable");
var Store_1 = require("../entity/Store");
var SaleManagerService_1 = require("../service/SaleManagerService");
var validation_error_message_1 = require("../helper/validation-error-message");
var SaleManagerController = /** @class */ (function () {
    function SaleManagerController() {
        this.saleManagerService = new SaleManagerService_1.SaleManagerService();
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.storeRepository = typeorm_1.getRepository(Store_1.Store);
    }
    SaleManagerController.prototype.get = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, storeUser, store, saleManagers, error_1, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 2:
                        storeUser = _a.sent();
                        return [4 /*yield*/, this.storeRepository.findOne({ user: storeUser })];
                    case 3:
                        store = _a.sent();
                        return [4 /*yield*/, this.saleManagerService.get(store, request.query)];
                    case 4:
                        saleManagers = _a.sent();
                        return [2 /*return*/, saleManagers];
                    case 5:
                        error_1 = _a.sent();
                        err = throw_error_1.throwError(error_1);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerController.prototype.getOne = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, saleManagerUser, errors, saleManager, error_2, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 2:
                        saleManagerUser = _a.sent();
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response.status(400).json({ errors: errors.array() })];
                        }
                        return [4 /*yield*/, this.saleManagerService.getOne(saleManagerUser)];
                    case 3:
                        saleManager = _a.sent();
                        return [2 /*return*/, saleManager];
                    case 4:
                        error_2 = _a.sent();
                        err = throw_error_1.throwError(error_2);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerController.prototype.create = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, storeUser, store, errors, saleManager, error_3, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 2:
                        storeUser = _a.sent();
                        return [4 /*yield*/, this.storeRepository.findOne({ user: storeUser })];
                    case 3:
                        store = _a.sent();
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ message: validation_error_message_1.validationErrorMessage(errors.array()) })];
                        }
                        return [4 /*yield*/, this.saleManagerService.create(request.body, store)];
                    case 4:
                        saleManager = _a.sent();
                        return [2 /*return*/, response.status(201).json(saleManager)];
                    case 5:
                        error_3 = _a.sent();
                        err = throw_error_1.throwError(error_3);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerController.prototype.update = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestUser, errors, user, error_4, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestUser = request.user;
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ message: validation_error_message_1.validationErrorMessage(errors.array()) })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 4, , 5]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                email: requestUser.email,
                            })];
                    case 2:
                        user = _a.sent();
                        return [4 /*yield*/, this.saleManagerService.update(request.body, user)];
                    case 3: return [2 /*return*/, _a.sent()];
                    case 4:
                        error_4 = _a.sent();
                        err = throw_error_1.throwError(error_4);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerController.prototype.activate = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestUser, id, errors, storeUser, store, error_5, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestUser = request.user;
                        id = request.params.id;
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response
                                    .status(400)
                                    .json({ message: validation_error_message_1.validationErrorMessage(errors.array()) })];
                        }
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                email: requestUser.email,
                            })];
                    case 2:
                        storeUser = _a.sent();
                        return [4 /*yield*/, this.storeRepository.findOne({ user: storeUser })];
                    case 3:
                        store = _a.sent();
                        if (!id) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.saleManagerService.activate(id, request.body.active, store)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_5 = _a.sent();
                        err = throw_error_1.throwError(error_5);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerController.prototype.delete = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestUser, id, storeUser, store, deleteManager, error_6, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestUser = request.user;
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                email: requestUser.email,
                            })];
                    case 2:
                        storeUser = _a.sent();
                        return [4 /*yield*/, this.storeRepository.findOne({ user: storeUser })];
                    case 3:
                        store = _a.sent();
                        if (!id) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.saleManagerService.delete(id, store)];
                    case 4:
                        deleteManager = _a.sent();
                        return [2 /*return*/, deleteManager];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_6 = _a.sent();
                        err = throw_error_1.throwError(error_6);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerController.prototype.uploadAvatar = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestUser, user, form_1, file, updateSaleManager, error_7, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestUser = request.user;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 5, , 6]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                email: requestUser.email,
                            })];
                    case 2:
                        user = _a.sent();
                        form_1 = new Formidable();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var _this = this;
                                form_1.parse(request, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        resolve(files.image.path);
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                    case 3:
                        file = _a.sent();
                        return [4 /*yield*/, this.saleManagerService.uploadAvatar(file, user)];
                    case 4:
                        updateSaleManager = _a.sent();
                        return [2 /*return*/, updateSaleManager];
                    case 5:
                        error_7 = _a.sent();
                        err = throw_error_1.throwError(error_7);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SaleManagerController;
}());
exports.SaleManagerController = SaleManagerController;
//# sourceMappingURL=SaleManagerController.js.map