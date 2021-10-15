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
exports.ProductController = void 0;
var typeorm_1 = require("typeorm");
var express_validator_1 = require("express-validator");
var throw_error_1 = require("../helper/throw-error");
var User_1 = require("../entity/User");
var Formidable = require("formidable");
var Store_1 = require("../entity/Store");
var ProductService_1 = require("../service/ProductService");
var validation_error_message_1 = require("../helper/validation-error-message");
var SaleManager_1 = require("../entity/SaleManager");
var RoleType_1 = require("../enum/RoleType");
var ProductController = /** @class */ (function () {
    function ProductController() {
        this.productService = new ProductService_1.ProductService();
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.storeRepository = typeorm_1.getRepository(Store_1.Store);
        this.saleManagerRepository = typeorm_1.getRepository(SaleManager_1.SaleManager);
    }
    ProductController.prototype.get = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, store, saleManager, products, error_1, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 2:
                        user = _a.sent();
                        store = void 0;
                        if (!(user.role === RoleType_1.RoleType.ADMIN)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.storeRepository.findOne({ user: user })];
                    case 3:
                        store = _a.sent();
                        return [3 /*break*/, 6];
                    case 4: return [4 /*yield*/, this.saleManagerRepository.findOne({
                            user: user,
                        })];
                    case 5:
                        saleManager = _a.sent();
                        if (saleManager) {
                            store = saleManager.store;
                        }
                        _a.label = 6;
                    case 6: return [4 /*yield*/, this.productService.get(store, request.query)];
                    case 7:
                        products = _a.sent();
                        return [2 /*return*/, products];
                    case 8:
                        error_1 = _a.sent();
                        err = throw_error_1.throwError(error_1);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.getOne = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, id, storeUser, store, errors, product, error_2, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        id = request.params.id;
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
                            return [2 /*return*/, response.status(400).json({ errors: errors.array() })];
                        }
                        return [4 /*yield*/, this.productService.getOne(id, store)];
                    case 4:
                        product = _a.sent();
                        return [2 /*return*/, product];
                    case 5:
                        error_2 = _a.sent();
                        err = throw_error_1.throwError(error_2);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.create = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, storeUser, store, form_1, data_1, file, product, error_3, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 7]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 2:
                        storeUser = _a.sent();
                        return [4 /*yield*/, this.storeRepository.findOne({ user: storeUser })];
                    case 3:
                        store = _a.sent();
                        form_1 = new Formidable();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var _this = this;
                                form_1.parse(request, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        data_1 = fields;
                                        resolve(files.image.path);
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                    case 4:
                        file = _a.sent();
                        data_1.image = file;
                        return [4 /*yield*/, this.productService.create(data_1, store)];
                    case 5:
                        product = _a.sent();
                        return [2 /*return*/, response.status(201).json(product)];
                    case 6:
                        error_3 = _a.sent();
                        err = throw_error_1.throwError(error_3);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.update = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, id, errors, storeUser, store, error_4, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
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
                        if (!id) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 2:
                        storeUser = _a.sent();
                        return [4 /*yield*/, this.storeRepository.findOne({ user: storeUser })];
                    case 3:
                        store = _a.sent();
                        return [4 /*yield*/, this.productService.update(id, request.body, store)];
                    case 4: return [2 /*return*/, _a.sent()];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        err = throw_error_1.throwError(error_4);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ProductController.prototype.activate = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestUser, id, errors, storeUser, store, error_5, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestUser = request.user;
                        id = request.params.id;
                        errors = express_validator_1.validationResult(request);
                        if (!errors.isEmpty()) {
                            return [2 /*return*/, response.status(400).json({ errors: errors.array() })];
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
                        return [4 /*yield*/, this.productService.activate(id, request.body.active, store)];
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
    ProductController.prototype.delete = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestUser, id, storeUser, store, deleteProduct, error_6, err;
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
                        return [4 /*yield*/, this.productService.delete(id, store)];
                    case 4:
                        deleteProduct = _a.sent();
                        return [2 /*return*/, deleteProduct];
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
    ProductController.prototype.uploadImage = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var requestUser, id, storeUser, store, form_2, file, updateSaleManager, error_7, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        requestUser = request.user;
                        id = request.params.id;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.userRepository.findOne({
                                email: requestUser.email,
                            })];
                    case 2:
                        storeUser = _a.sent();
                        return [4 /*yield*/, this.storeRepository.findOne({ user: storeUser })];
                    case 3:
                        store = _a.sent();
                        if (!id) return [3 /*break*/, 6];
                        form_2 = new Formidable();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                var _this = this;
                                form_2.parse(request, function (err, fields, files) { return __awaiter(_this, void 0, void 0, function () {
                                    return __generator(this, function (_a) {
                                        resolve(files.image.path);
                                        return [2 /*return*/];
                                    });
                                }); });
                            })];
                    case 4:
                        file = _a.sent();
                        return [4 /*yield*/, this.productService.uploadImage(id, file, store)];
                    case 5:
                        updateSaleManager = _a.sent();
                        return [2 /*return*/, updateSaleManager];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_7 = _a.sent();
                        err = throw_error_1.throwError(error_7);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return ProductController;
}());
exports.ProductController = ProductController;
//# sourceMappingURL=ProductController.js.map