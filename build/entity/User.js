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
exports.User = void 0;
var class_transformer_1 = require("class-transformer");
var typeorm_1 = require("typeorm");
var RoleType_1 = require("../enum/RoleType");
var Chat_1 = require("./Chat");
var SaleManager_1 = require("./SaleManager");
var Store_1 = require("./Store");
var StoreOwner_1 = require("./StoreOwner");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column({ unique: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column(),
        class_transformer_1.Exclude(),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], User.prototype, "role", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return SaleManager_1.SaleManager; }, function (saleManager) { return saleManager.user; }, {
            onDelete: 'CASCADE',
        }),
        __metadata("design:type", SaleManager_1.SaleManager)
    ], User.prototype, "saleManager", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return StoreOwner_1.StoreOwner; }, function (storeOwner) { return storeOwner.user; }, {
            onDelete: 'CASCADE',
        }),
        __metadata("design:type", StoreOwner_1.StoreOwner)
    ], User.prototype, "storeOwner", void 0);
    __decorate([
        typeorm_1.OneToMany(function (_type) { return Chat_1.Chat; }, function (chat) { return chat.from; }, {
            eager: false,
        }),
        __metadata("design:type", Array)
    ], User.prototype, "chatsFrom", void 0);
    __decorate([
        typeorm_1.OneToMany(function (_type) { return Chat_1.Chat; }, function (chat) { return chat.to; }, {
            eager: false,
        }),
        __metadata("design:type", Array)
    ], User.prototype, "chatsTo", void 0);
    __decorate([
        typeorm_1.OneToOne(function () { return Store_1.Store; }, function (store) { return store.user; }),
        __metadata("design:type", Store_1.Store)
    ], User.prototype, "store", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], User.prototype, "updatedAt", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
//# sourceMappingURL=User.js.map