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
exports.StoreService = void 0;
var typeorm_1 = require("typeorm");
var Store_1 = require("../entity/Store");
var throw_error_1 = require("../helper/throw-error");
var get_error_message_1 = require("../helper/get-error-message");
var ERROR_CODE_1 = require("../constant/ERROR_CODE");
var RoleType_1 = require("../enum/RoleType");
var notFoundErrMsg = function (id) {
    return get_error_message_1.notFoundErrorMessage('Store', id);
};
var StoreService = /** @class */ (function () {
    function StoreService() {
        this.storeRepository = typeorm_1.getRepository(Store_1.Store);
    }
    StoreService.prototype.create = function (createStoreDto) {
        return __awaiter(this, void 0, void 0, function () {
            var name, industry, address, defaultPassword, user, store, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        name = createStoreDto.name, industry = createStoreDto.industry, address = createStoreDto.address, defaultPassword = createStoreDto.defaultPassword, user = createStoreDto.user;
                        store = this.storeRepository.create({
                            name: name,
                            industry: industry,
                            address: address,
                            defaultPassword: defaultPassword,
                            user: user,
                        });
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, , 4]);
                        return [4 /*yield*/, this.storeRepository.save(store)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, store];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StoreService.prototype.single = function (response, user) {
        return __awaiter(this, void 0, void 0, function () {
            var store, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        store = void 0;
                        if (!(user.role === RoleType_1.RoleType.ADMIN)) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.storeRepository.findOne({
                                where: { user: user },
                            })];
                    case 1:
                        store = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (!store) {
                            return [2 /*return*/, throw_error_1.notFoundError(response, 'Store doesnt exist')];
                        }
                        return [2 /*return*/, store];
                    case 3:
                        error_1 = _a.sent();
                        if (error_1.code === ERROR_CODE_1.ERROR_CODE.internal) {
                            return [2 /*return*/, throw_error_1.serverError(response)];
                        }
                        return [2 /*return*/, throw_error_1.notFoundError(response, 'Store doesnt exist')];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StoreService.prototype.update = function (response, id, createStoreDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var name, industry, address, defaultPassword, store, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        name = createStoreDto.name, industry = createStoreDto.industry, address = createStoreDto.address, defaultPassword = createStoreDto.defaultPassword;
                        return [4 /*yield*/, this.storeRepository.findOne({
                                where: { id: id, user: user },
                            })];
                    case 1:
                        store = _a.sent();
                        if (!store) return [3 /*break*/, 3];
                        store.name = name;
                        store.industry = industry;
                        store.address = address;
                        store.defaultPassword = defaultPassword;
                        return [4 /*yield*/, this.storeRepository.save(store)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, store];
                    case 3: return [2 /*return*/, throw_error_1.notFoundError(response, notFoundErrMsg(id))];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_2 = _a.sent();
                        if (error_2.code === ERROR_CODE_1.ERROR_CODE.internal) {
                            return [2 /*return*/, throw_error_1.serverError(response, error_2.message)];
                        }
                        return [2 /*return*/, throw_error_1.notFoundError(response, notFoundErrMsg(id))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StoreService.prototype.updateLogo = function (response, id, logoPath, user) {
        return __awaiter(this, void 0, void 0, function () {
            var store, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.storeRepository.findOne({
                                where: { id: id, user: user },
                            })];
                    case 1:
                        store = _a.sent();
                        if (!store) return [3 /*break*/, 3];
                        store.logoPath = logoPath;
                        return [4 /*yield*/, this.storeRepository.save(store)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, store];
                    case 3: return [2 /*return*/, throw_error_1.notFoundError(response, notFoundErrMsg(id))];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        if (error_3.code === ERROR_CODE_1.ERROR_CODE.internal) {
                            return [2 /*return*/, throw_error_1.serverError(response, error_3.message)];
                        }
                        return [2 /*return*/, throw_error_1.notFoundError(response, notFoundErrMsg(id))];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return StoreService;
}());
exports.StoreService = StoreService;
//# sourceMappingURL=StoreService.js.map