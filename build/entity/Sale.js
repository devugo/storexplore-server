"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Sale = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = require("./Product");
var SaleManager_1 = require("./SaleManager");
var Store_1 = require("./Store");
var Sale = /** @class */ (function () {
    function Sale() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", Number)
    ], Sale.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], Sale.prototype, "soldAt", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true, default: 0 }),
        __metadata("design:type", Number)
    ], Sale.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], Sale.prototype, "date", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (_type) { return Product_1.Product; }, function (product) { return product.sales; }, {
            eager: true,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Product_1.Product)
    ], Sale.prototype, "product", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (_type) { return Store_1.Store; }, function (store) { return store.sales; }, {
            eager: false,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Store_1.Store)
    ], Sale.prototype, "store", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (_type) { return SaleManager_1.SaleManager; }, function (saleManager) { return saleManager.sales; }, {
            eager: false,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", SaleManager_1.SaleManager)
    ], Sale.prototype, "saleManager", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Sale.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Sale.prototype, "updatedAt", void 0);
    Sale = __decorate([
        typeorm_1.Entity()
    ], Sale);
    return Sale;
}());
exports.Sale = Sale;
//# sourceMappingURL=Sale.js.map