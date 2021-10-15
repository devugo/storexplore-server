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
exports.SaleService = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = require("../entity/Product");
var Sale_1 = require("../entity/Sale");
var SaleManager_1 = require("../entity/SaleManager");
var User_1 = require("../entity/User");
var PAGINATION_1 = require("../constant/PAGINATION");
var dateRangeUsingSummaryFormat_1 = require("../helper/dateRangeUsingSummaryFormat");
var moment = require('moment');
var SaleService = /** @class */ (function () {
    function SaleService() {
        this.saleRepository = typeorm_1.getRepository(Sale_1.Sale);
        this.productRepository = typeorm_1.getRepository(Product_1.Product);
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.saleManagerRepository = typeorm_1.getRepository(SaleManager_1.SaleManager);
        this.entityManager = typeorm_1.getManager();
    }
    SaleService.prototype.get = function (store, saleManager, filterDto) {
        return __awaiter(this, void 0, void 0, function () {
            var page, date, product, startDate, endDate, saleM, sales, query, startDateIsoString, endDateIsoString, count, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = filterDto.page, date = filterDto.date, product = filterDto.product, startDate = filterDto.startDate, endDate = filterDto.endDate, saleM = filterDto.saleManager;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 7, , 8]);
                        sales = void 0;
                        query = this.saleRepository.createQueryBuilder('sale');
                        query.andWhere('sale.storeId = :store', {
                            store: store.id,
                        });
                        query.orderBy('sale.createdAt', 'DESC');
                        if (product) {
                            query.andWhere('sale.productId = :product', {
                                product: product,
                            });
                        }
                        if (date) {
                            query.andWhere('sale.date = :date', {
                                date: date + " 01:00:00",
                            });
                        }
                        //  Store owner sale manager query param
                        if (saleM) {
                            query.andWhere('sale.saleManagerId = :sm', {
                                sm: saleM,
                            });
                        }
                        if (startDate && endDate) {
                            startDateIsoString = new Date(startDate).toISOString();
                            endDateIsoString = new Date(endDate + ' 23:59:59').toISOString();
                            query.andWhere('sale.createdAt BETWEEN :startDate AND :endDate', {
                                startDate: startDateIsoString,
                                endDate: endDateIsoString,
                            });
                        }
                        if (saleManager) {
                            query.andWhere('sale.saleManagerId = :sm', {
                                sm: saleManager.id,
                            });
                        }
                        query.leftJoinAndSelect('sale.product', 'product');
                        query.leftJoinAndSelect('sale.saleManager', 'sale_manager');
                        if (!page) return [3 /*break*/, 3];
                        query.skip(PAGINATION_1.PAGINATION.itemsPerPage * (parseInt(page) - 1));
                        return [4 /*yield*/, query.take(PAGINATION_1.PAGINATION.itemsPerPage).getMany()];
                    case 2:
                        sales = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, query.getMany()];
                    case 4:
                        sales = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, query.getCount()];
                    case 6:
                        count = _a.sent();
                        return [2 /*return*/, { count: count, sales: sales }];
                    case 7:
                        error_1 = _a.sent();
                        throw error_1;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SaleService.prototype.mySales = function (saleManager) {
        return __awaiter(this, void 0, void 0, function () {
            var sales, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.saleRepository.find({
                                saleManager: saleManager,
                            })];
                    case 1:
                        sales = _a.sent();
                        return [2 /*return*/, sales];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    SaleService.prototype.create = function (createSaleDto) {
        return __awaiter(this, void 0, void 0, function () {
            var from, _a, product, soldAt, quantity, user, getProduct, saleManager, sale, error_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 7, , 8]);
                        from = createSaleDto.from, _a = createSaleDto.sale, product = _a.product, soldAt = _a.soldAt, quantity = _a.quantity;
                        return [4 /*yield*/, this.userRepository.findOne({ where: { id: from } })];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, this.productRepository.findOne(product)];
                    case 2:
                        getProduct = _b.sent();
                        return [4 /*yield*/, this.saleManagerRepository.findOne({
                                where: { user: user },
                            })];
                    case 3:
                        saleManager = _b.sent();
                        if (!getProduct) return [3 /*break*/, 6];
                        if (!(getProduct.quantity >= quantity)) return [3 /*break*/, 5];
                        sale = this.saleRepository.create({
                            soldAt: soldAt,
                            product: getProduct,
                            quantity: quantity,
                            store: saleManager.store,
                            saleManager: saleManager,
                            date: moment().format('YYYY-MM-DD'),
                        });
                        return [4 /*yield*/, this.saleRepository.save(sale)];
                    case 4:
                        _b.sent();
                        // Update Product quantity
                        if (getProduct) {
                            getProduct.quantity = getProduct.quantity - quantity;
                            this.productRepository.save(getProduct);
                        }
                        return [2 /*return*/, sale];
                    case 5: return [2 /*return*/, { error: "There are only " + getProduct.quantity + " items left" }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_3 = _b.sent();
                        throw error_3;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SaleService.prototype.delete = function (id, sm) {
        return __awaiter(this, void 0, void 0, function () {
            var saleManager, sale, product, deleteSale, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 7, , 8]);
                        return [4 /*yield*/, this.saleManagerRepository.findOne(sm)];
                    case 1:
                        saleManager = _a.sent();
                        return [4 /*yield*/, this.saleRepository.findOne({
                                where: { saleManager: saleManager, id: id },
                            })];
                    case 2:
                        sale = _a.sent();
                        product = sale.product;
                        product.quantity = product.quantity + sale.quantity;
                        return [4 /*yield*/, this.productRepository.save(product)];
                    case 3:
                        _a.sent();
                        if (!sale) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.saleRepository.remove(sale)];
                    case 4:
                        deleteSale = _a.sent();
                        return [2 /*return*/, deleteSale];
                    case 5: return [2 /*return*/, { error: 'Unable to delete sale' }];
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        error_4 = _a.sent();
                        throw error_4;
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    SaleService.prototype.dashboardSummary = function (store, format, saleManager) {
        return __awaiter(this, void 0, void 0, function () {
            var query, _a, start, end, sales, totalSales, totalProfit, totalItemsSold;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        query = this.saleRepository.createQueryBuilder('sale');
                        query.andWhere('sale.storeId = :store', {
                            store: store.id,
                        });
                        _a = dateRangeUsingSummaryFormat_1.dateRangeUsingSummaryFormat(format), start = _a.start, end = _a.end;
                        query.andWhere('sale.createdAt BETWEEN :startDate AND :endDate', {
                            startDate: start,
                            endDate: end,
                        });
                        if (saleManager) {
                            query.andWhere('sale.saleManagerId = :sm', {
                                sm: saleManager.id,
                            });
                        }
                        query.leftJoinAndSelect('sale.product', 'product');
                        return [4 /*yield*/, query.getMany()];
                    case 1:
                        sales = _b.sent();
                        totalSales = 0;
                        totalProfit = 0;
                        totalItemsSold = 0;
                        sales.forEach(function (sale) {
                            totalSales += sale.soldAt * sale.quantity;
                            totalProfit += (sale.soldAt - sale.product.costPrice) * sale.quantity;
                            totalItemsSold += sale.quantity;
                        });
                        return [2 /*return*/, { totalSales: totalSales, totalProfit: totalProfit, totalItemsSold: totalItemsSold }];
                }
            });
        });
    };
    return SaleService;
}());
exports.SaleService = SaleService;
//# sourceMappingURL=SaleService.js.map