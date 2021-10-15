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
exports.SaleController = void 0;
var typeorm_1 = require("typeorm");
var throw_error_1 = require("../helper/throw-error");
var User_1 = require("../entity/User");
var Store_1 = require("../entity/Store");
var SaleService_1 = require("../service/SaleService");
var SaleManager_1 = require("../entity/SaleManager");
var RoleType_1 = require("../enum/RoleType");
var SaleController = /** @class */ (function () {
    function SaleController() {
        this.saleService = new SaleService_1.SaleService();
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.storeRepository = typeorm_1.getRepository(Store_1.Store);
        this.saleManagerRepository = typeorm_1.getRepository(SaleManager_1.SaleManager);
    }
    SaleController.prototype.get = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, user, store, saleManager, sales, error_1, err;
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
                        saleManager = void 0;
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
                    case 6: return [4 /*yield*/, this.saleService.get(store, saleManager, request.query)];
                    case 7:
                        sales = _a.sent();
                        return [2 /*return*/, sales];
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
    SaleController.prototype.dashboardSummary = function (request, response, next) {
        return __awaiter(this, void 0, void 0, function () {
            var email, format, user, store, saleManager, sales, error_2, err;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = request.user.email;
                        format = request.query.format;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 2:
                        user = _a.sent();
                        store = void 0;
                        saleManager = void 0;
                        return [4 /*yield*/, this.storeRepository.findOne({ user: user })];
                    case 3:
                        store = _a.sent();
                        if (!!store) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.saleManagerRepository.findOne({ user: user })];
                    case 4:
                        saleManager = _a.sent();
                        store = saleManager.store;
                        _a.label = 5;
                    case 5: return [4 /*yield*/, this.saleService.dashboardSummary(store, format, saleManager)];
                    case 6:
                        sales = _a.sent();
                        return [2 /*return*/, sales];
                    case 7:
                        error_2 = _a.sent();
                        err = throw_error_1.throwError(error_2);
                        return [2 /*return*/, response.status(err.code).json({
                                message: err.message,
                                success: false,
                            })];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return SaleController;
}());
exports.SaleController = SaleController;
//# sourceMappingURL=SaleController.js.map