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
exports.ProductService = void 0;
var typeorm_1 = require("typeorm");
var uploadHelper_1 = require("../helper/uploadHelper");
var Product_1 = require("../entity/Product");
var PAGINATION_1 = require("../constant/PAGINATION");
var ProductService = /** @class */ (function () {
    function ProductService() {
        this.productRepository = typeorm_1.getRepository(Product_1.Product);
        this.entityManager = typeorm_1.getManager();
    }
    ProductService.prototype.get = function (store, filterDto) {
        return __awaiter(this, void 0, void 0, function () {
            var page, search, query, products, count, reProducts, productsWithSales, error_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        page = filterDto.page, search = filterDto.search;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 8, , 9]);
                        query = this.productRepository.createQueryBuilder('product');
                        query.andWhere('product.storeId = :store', {
                            store: store.id,
                        });
                        if (search) {
                            query.andWhere('(LOWER(product.name) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search))', { search: "%" + search + "%" });
                        }
                        products = void 0;
                        if (!page) return [3 /*break*/, 3];
                        query.skip(PAGINATION_1.PAGINATION.itemsPerPage * (parseInt(page) - 1));
                        return [4 /*yield*/, query.take(PAGINATION_1.PAGINATION.itemsPerPage).getMany()];
                    case 2:
                        products = _a.sent();
                        return [3 /*break*/, 5];
                    case 3: return [4 /*yield*/, query.getMany()];
                    case 4:
                        products = _a.sent();
                        _a.label = 5;
                    case 5: return [4 /*yield*/, query.getCount()];
                    case 6:
                        count = _a.sent();
                        reProducts = products.map(function (product) { return __awaiter(_this, void 0, void 0, function () {
                            var totalSales, totalSold;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4 /*yield*/, this.totalSales(product.id)];
                                    case 1:
                                        totalSales = _a.sent();
                                        return [4 /*yield*/, this.totalSold(product.id)];
                                    case 2:
                                        totalSold = _a.sent();
                                        product.totalSales = totalSales[0] ? totalSales[0].sales : 0;
                                        product.totalSold = totalSold[0] ? totalSold[0].products : 0;
                                        return [2 /*return*/, product];
                                }
                            });
                        }); });
                        return [4 /*yield*/, Promise.all(reProducts)];
                    case 7:
                        productsWithSales = _a.sent();
                        return [2 /*return*/, { count: count, products: productsWithSales }];
                    case 8:
                        error_1 = _a.sent();
                        throw error_1;
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.getOne = function (id, store) {
        return __awaiter(this, void 0, void 0, function () {
            var product, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productRepository.findOne({
                                where: { id: id, store: store },
                            })];
                    case 1:
                        product = _a.sent();
                        return [2 /*return*/, product];
                    case 2:
                        error_2 = _a.sent();
                        throw error_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.totalSales = function (product) {
        var total = this.entityManager.query('SELECT SUM("soldAt" * quantity) AS "sales" FROM sale WHERE sale."productId" = $1', [product]);
        return total;
    };
    ProductService.prototype.totalSold = function (product) {
        var total = this.entityManager.query('SELECT SUM(quantity) AS "products" FROM sale WHERE sale."productId" = $1', [product]);
        return total;
    };
    ProductService.prototype.create = function (createProductDto, store) {
        return __awaiter(this, void 0, void 0, function () {
            var name, description, image, costPrice, sellingPrice, quantity, imagePath, product, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        name = createProductDto.name, description = createProductDto.description, image = createProductDto.image, costPrice = createProductDto.costPrice, sellingPrice = createProductDto.sellingPrice, quantity = createProductDto.quantity;
                        return [4 /*yield*/, uploadHelper_1.uploadHelper(image)];
                    case 1:
                        imagePath = _a.sent();
                        product = this.productRepository.create({
                            name: name,
                            description: description,
                            imagePath: imagePath,
                            costPrice: costPrice,
                            sellingPrice: sellingPrice,
                            quantity: quantity,
                            store: store,
                        });
                        return [4 /*yield*/, this.productRepository.save(product)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, product];
                    case 3:
                        error_3 = _a.sent();
                        throw error_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.update = function (id, createProductDto, store) {
        return __awaiter(this, void 0, void 0, function () {
            var name, description, costPrice, sellingPrice, quantity, product, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        name = createProductDto.name, description = createProductDto.description, costPrice = createProductDto.costPrice, sellingPrice = createProductDto.sellingPrice, quantity = createProductDto.quantity;
                        return [4 /*yield*/, this.productRepository.findOne({
                                where: { id: id, store: store },
                            })];
                    case 1:
                        product = _a.sent();
                        if (product) {
                            product.name = name;
                            product.description = description;
                            product.costPrice = costPrice;
                            product.sellingPrice = sellingPrice;
                            product.quantity = quantity;
                        }
                        return [2 /*return*/, this.productRepository.save(product)];
                    case 2:
                        error_4 = _a.sent();
                        throw error_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.activate = function (id, active, store) {
        return __awaiter(this, void 0, void 0, function () {
            var product, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.productRepository.findOne({
                                where: { store: store, id: id },
                            })];
                    case 1:
                        product = _a.sent();
                        if (product) {
                            product.active = active;
                        }
                        return [2 /*return*/, this.productRepository.save(product)];
                    case 2:
                        error_5 = _a.sent();
                        throw error_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.delete = function (id, store) {
        return __awaiter(this, void 0, void 0, function () {
            var product, deleteProduct, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.productRepository.findOne({
                                where: { store: store, id: id },
                            })];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, this.productRepository.remove(product)];
                    case 2:
                        deleteProduct = _a.sent();
                        return [2 /*return*/, deleteProduct];
                    case 3:
                        error_6 = _a.sent();
                        throw error_6;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    ProductService.prototype.uploadImage = function (id, file, store) {
        return __awaiter(this, void 0, void 0, function () {
            var product, imagePath, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        return [4 /*yield*/, this.productRepository.findOne({
                                where: { id: id, store: store },
                            })];
                    case 1:
                        product = _a.sent();
                        return [4 /*yield*/, uploadHelper_1.uploadHelper(file)];
                    case 2:
                        imagePath = _a.sent();
                        if (!product) return [3 /*break*/, 4];
                        product.imagePath = imagePath;
                        return [4 /*yield*/, this.productRepository.save(product)];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4: return [2 /*return*/, product];
                    case 5:
                        error_7 = _a.sent();
                        throw error_7;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=ProductService.js.map