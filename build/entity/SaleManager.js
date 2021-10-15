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
exports.SaleManager = void 0;
var typeorm_1 = require("typeorm");
var GenderType_1 = require("../enum/GenderType");
var Sale_1 = require("./Sale");
var Store_1 = require("./Store");
var User_1 = require("./User");
var SaleManager = /** @class */ (function () {
    function SaleManager() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", Number)
    ], SaleManager.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], SaleManager.prototype, "firstname", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], SaleManager.prototype, "lastname", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], SaleManager.prototype, "othernames", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], SaleManager.prototype, "address", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], SaleManager.prototype, "gender", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", Date)
    ], SaleManager.prototype, "dob", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true }),
        __metadata("design:type", String)
    ], SaleManager.prototype, "photo", void 0);
    __decorate([
        typeorm_1.Column({ default: true }),
        __metadata("design:type", Boolean)
    ], SaleManager.prototype, "active", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return User_1.User; }, function (user) { return user.saleManager; }, {
            eager: true,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], SaleManager.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function (_type) { return Sale_1.Sale; }, function (sale) { return sale.saleManager; }, {
            eager: false,
        }),
        __metadata("design:type", Array)
    ], SaleManager.prototype, "sales", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (_type) { return Store_1.Store; }, function (store) { return store.saleManagers; }, {
            eager: true,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", Store_1.Store)
    ], SaleManager.prototype, "store", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], SaleManager.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], SaleManager.prototype, "updatedAt", void 0);
    SaleManager = __decorate([
        typeorm_1.Entity()
    ], SaleManager);
    return SaleManager;
}());
exports.SaleManager = SaleManager;
//# sourceMappingURL=SaleManager.js.map