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
exports.SaleManagerService = void 0;
var typeorm_1 = require("typeorm");
var SaleManager_1 = require("../entity/SaleManager");
var UserService_1 = require("./UserService");
var User_1 = require("../entity/User");
var uploadHelper_1 = require("../helper/uploadHelper");
var RoleType_1 = require("../enum/RoleType");
var PAGINATION_1 = require("../constant/PAGINATION");
var SaleManagerService = /** @class */ (function () {
    function SaleManagerService() {
        this.saleManagerRepository = typeorm_1.getRepository(SaleManager_1.SaleManager);
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.userService = new UserService_1.UserService();
        this.entityManager = typeorm_1.getManager();
    }
    SaleManagerService.prototype.get = function (store, filterDto) {
        return __awaiter(this, void 0, void 0, function () {
            var page, search, query, saleManagers, count, reSaleManagers, saleManagersWithSales, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = filterDto.page, search = filterDto.search;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        query = this.saleManagerRepository.createQueryBuilder('sale_manager');
                        query.andWhere('sale_manager.storeId = :store', {
                            store: store.id,
                        });
                        if (search) {
                            query.andWhere('(LOWER(sale_manager.firstname) LIKE LOWER(:search) OR LOWER(sale_manager.lastname) LIKE LOWER(:search) OR LOWER(sale_manager.othernames) LIKE LOWER(:search))', { search: "%" + search + "%" });
                        }
                        query.leftJoinAndSelect('sale_manager.user', 'user');
                        query.leftJoinAndSelect('sale_manager.store', 'store');
                        saleManagers = void 0;
                        if (!page) return [3 /*break*/, 3];
                        query.skip(PAGINATION_1.PAGINATION.itemsPerPage * (parseInt(page) - 1));
                        return [4 /*yield*/, query.take(PAGINATION_1.PAGINATION.itemsPerPage).getMany()];
                    case 2:
                        saleManagers = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, query.getMany()];
                    case 4:
                        saleManagers = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, query.getCount()];
                    case 6:
                        count = _a.sent();
                        reSaleManagers = saleManagers.map(function (saleManager) { return __awaiter(_this, void 0, void 0, function () {
                            var totalSales, totalProducts;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.totalSales(saleManager.id)];
                                    case 1:
                                        totalSales = _a.sent();
                                        return [4 /*yield*/, this.totalProductsSold(saleManager.id)];
                                    case 2:
                                        totalProducts = _a.sent();
                                        saleManager.totalSales = totalSales[0] ? totalSales[0].sales : 0;
                                        saleManager.totalProducts = totalProducts[0]
                                            ? totalProducts[0].products
                                            : 0;
                                        return [2 /*return*/, saleManager];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(reSaleManagers)];
                    case 7:
                        saleManagersWithSales = _a.sent();
                        return [2 /*return*/, { count: count, saleManagers: saleManagersWithSales }];
                    case 8:
                        error_1 = _a.sent();
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerService.prototype.totalSales = function (saleManager) {
        var total = this.entityManager.query('SELECT SUM("soldAt" * quantity) AS "sales" FROM sale WHERE sale."saleManagerId" = $1', [saleManager]);
        return total;
    };
    SaleManagerService.prototype.totalProductsSold = function (saleManager) {
        var total = this.entityManager.query('SELECT SUM(quantity) AS "products" FROM sale WHERE sale."saleManagerId" = $1', [saleManager]);
        return total;
    };
    SaleManagerService.prototype.getOne = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var saleManager, totalSales, totalProducts, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, this.saleManagerRepository.findOne({
                                where: { user: user },
                            })];
                    case 1:
                        saleManager = (_a.sent());
                        if (!saleManager) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.totalSales(saleManager.id)];
                    case 2:
                        totalSales = _a.sent();
                        return [4 /*yield*/, this.totalProductsSold(saleManager.id)];
                    case 3:
                        totalProducts = _a.sent();
                        saleManager.totalSales = totalSales[0] ? totalSales[0].sales : 0;
                        saleManager.totalProducts = totalProducts[0]
                            ? totalProducts[0].products
                            : 0;
                        return [2 /*return*/, saleManager];
                    case 4: throw new Error('Not Found');
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_2 = _a.sent();
                        throw error_2;
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerService.prototype.create = function (createSaleManagerDto, store) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, othernames, gender, address, dob, email, password, user, saleManager, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        firstname = createSaleManagerDto.firstname, lastname = createSaleManagerDto.lastname, othernames = createSaleManagerDto.othernames, gender = createSaleManagerDto.gender, address = createSaleManagerDto.address, dob = createSaleManagerDto.dob, email = createSaleManagerDto.email, password = createSaleManagerDto.password;
                        return [4 /*yield*/, this.userService.register({
                                email: email,
                                password: password,
                                role: RoleType_1.RoleType.SALE_MANAGER,
                            })];
                    case 1:
                        user = _a.sent();
                        saleManager = this.saleManagerRepository.create({
                            firstname: firstname,
                            lastname: lastname,
                            othernames: othernames,
                            dob: dob,
                            gender: gender,
                            address: address,
                            user: user,
                            store: store,
                        });
                        return [4 /*yield*/, this.saleManagerRepository.save(saleManager)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, saleManager];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerService.prototype.update = function (createSaleManagerDto, user) {
        return __awaiter(this, void 0, void 0, function () {
            var firstname, lastname, othernames, dob, gender, address, saleManager, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        firstname = createSaleManagerDto.firstname, lastname = createSaleManagerDto.lastname, othernames = createSaleManagerDto.othernames, dob = createSaleManagerDto.dob, gender = createSaleManagerDto.gender, address = createSaleManagerDto.address;
                        return [4 /*yield*/, this.saleManagerRepository.findOne({
                                user: user,
                            })];
                    case 1:
                        saleManager = _a.sent();
                        if (saleManager) {
                            saleManager.firstname = firstname;
                            saleManager.lastname = lastname;
                            saleManager.othernames = othernames;
                            saleManager.dob = dob;
                            saleManager.gender = gender;
                            saleManager.address = address;
                        }
                        return [2 /*return*/, this.saleManagerRepository.save(saleManager)];
                    case 2:
                        error_4 = _a.sent();
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerService.prototype.activate = function (id, active, store) {
        return __awaiter(this, void 0, void 0, function () {
            var saleManager, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.saleManagerRepository.findOne({
                                where: { store: store, id: id },
                            })];
                    case 1:
                        saleManager = _a.sent();
                        if (saleManager) {
                            saleManager.active = active;
                        }
                        return [2 /*return*/, this.saleManagerRepository.save(saleManager)];
                    case 2:
                        error_5 = _a.sent();
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerService.prototype.delete = function (id, store) {
        return __awaiter(this, void 0, void 0, function () {
            var saleManager, deleteSaleManager, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.saleManagerRepository.findOne({
                                where: { store: store, id: id },
                            })];
                    case 1:
                        saleManager = _a.sent();
                        return [4 /*yield*/, this.userRepository.remove(saleManager.user)];
                    case 2:
                        deleteSaleManager = _a.sent();
                        return [2 /*return*/, deleteSaleManager];
                    case 3:
                        error_6 = _a.sent();
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    SaleManagerService.prototype.uploadAvatar = function (file, user) {
        return __awaiter(this, void 0, void 0, function () {
            var saleManager, imagePath, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.saleManagerRepository.findOne({
                                where: { user: user },
                            })];
                    case 1:
                        saleManager = _a.sent();
                        return [4 /*yield*/, uploadHelper_1.uploadHelper(file)];
                    case 2:
                        imagePath = _a.sent();
                        if (!saleManager) return [3 /*break*/, 4];
                        saleManager.photo = imagePath;
                        return [4 /*yield*/, this.saleManagerRepository.save(saleManager)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, saleManager];
                    case 5:
                        error_7 = _a.sent();
                        throw error_7;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return SaleManagerService;
}());
exports.SaleManagerService = SaleManagerService;
//# sourceMappingURL=SaleManagerService.js.map