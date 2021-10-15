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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var Sale_1 = require("./Sale");
var Store_1 = require("./Store");
var Product = /** @class */ (function () {
    function Product() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", Number)
    ], Product.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Product.prototype, "description", void 0);
    __decorate([
        typeorm_1.Column({ default: true }),
        __metadata("design:type", Boolean)
    ], Product.prototype, "active", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], Product.prototype, "imagePath", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Product.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Number)
    ], Product.prototype, "costPrice", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", Number)
    ], Product.prototype, "sellingPrice", void 0);
    __decorate([
        typeorm_1.OneToMany(function (_type) { return Sale_1.Sale; }, function (sale) { return sale.product; }, {
            eager: false,
        }),
        __metadata("design:type", Array)
    ], Product.prototype, "sales", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (_type) { return Store_1.Store; }, function (store) { return store.products; }, {
            eager: false,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Store_1.Store)
    ], Product.prototype, "store", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Product.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Product.prototype, "updatedAt", void 0);
    Product = __decorate([
        typeorm_1.Entity()
    ], Product);
    return Product;
}());
exports.Product = Product;
//# sourceMappingURL=Product.js.map