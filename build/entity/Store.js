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
exports.Store = void 0;
var typeorm_1 = require("typeorm");
var IndustryType_1 = require("../enum/IndustryType");
var Product_1 = require("./Product");
var Sale_1 = require("./Sale");
var SaleManager_1 = require("./SaleManager");
var User_1 = require("./User");
var Store = /** @class */ (function () {
    function Store() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", Number)
    ], Store.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Store.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Store.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Store.prototype, "defaultPassword", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Store.prototype, "industry", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Store.prototype, "logoPath", void 0);
    __decorate([
        typeorm_1.OneToMany(function (_type) { return SaleManager_1.SaleManager; }, function (saleManager) { return saleManager.store; }, {
            eager: false,
        }),
        __metadata("design:type", Array)
    ], Store.prototype, "saleManagers", void 0);
    __decorate([
        typeorm_1.OneToMany(function (_type) { return Product_1.Product; }, function (product) { return product.store; }, {
            eager: false,
        }),
        __metadata("design:type", Array)
    ], Store.prototype, "products", void 0);
    __decorate([
        typeorm_1.OneToMany(function (_type) { return Sale_1.Sale; }, function (sale) { return sale.store; }, {
            eager: false,
        }),
        __metadata("design:type", Array)
    ], Store.prototype, "sales", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Store.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Store.prototype, "updatedAt", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return User_1.User; }, function (user) { return user.store; }, {
            eager: true,
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], Store.prototype, "user", void 0);
    Store = __decorate([
        typeorm_1.Entity()
    ], Store);
    return Store;
}());
exports.Store = Store;
//# sourceMappingURL=Store.js.map