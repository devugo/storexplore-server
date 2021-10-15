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
exports.Chat = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Chat = /** @class */ (function () {
    function Chat() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", Number)
    ], Chat.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Chat.prototype, "message", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (_type) { return User_1.User; }, function (user) { return user.chatsFrom; }, {
            eager: false,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], Chat.prototype, "from", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (_type) { return User_1.User; }, function (user) { return user.chatsTo; }, {
            eager: false,
            onDelete: 'CASCADE',
        }),
        typeorm_1.JoinColumn(),
        __metadata("design:type", User_1.User)
    ], Chat.prototype, "to", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Chat.prototype, "createdAt", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], Chat.prototype, "updatedAt", void 0);
    Chat = __decorate([
        typeorm_1.Entity()
    ], Chat);
    return Chat;
}());
exports.Chat = Chat;
//# sourceMappingURL=Chat.js.map