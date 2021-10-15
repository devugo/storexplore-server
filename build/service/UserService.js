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
exports.UserService = void 0;
var jwt = require("jsonwebtoken");
var typeorm_1 = require("typeorm");
var User_1 = require("../entity/User");
var bcrypt = require("bcrypt");
var RoleType_1 = require("../enum/RoleType");
var SaleManager_1 = require("../entity/SaleManager");
var StoreOwner_1 = require("../entity/StoreOwner");
var UserService = /** @class */ (function () {
    function UserService() {
        this.userRepository = typeorm_1.getRepository(User_1.User);
        this.saleManagerRepository = typeorm_1.getRepository(SaleManager_1.SaleManager);
        this.storeOwnerRepository = typeorm_1.getRepository(StoreOwner_1.StoreOwner);
    }
    UserService.prototype.register = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, role, salt, hashPassword, user, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        email = createUserDto.email, password = createUserDto.password, role = createUserDto.role;
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 1:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 2:
                        hashPassword = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        user = this.userRepository.create({
                            email: email,
                            password: hashPassword,
                            role: role ? role : RoleType_1.RoleType.ADMIN,
                        });
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 5:
                        err_1 = _a.sent();
                        throw err_1;
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.login = function (createUserDto) {
        return __awaiter(this, void 0, void 0, function () {
            var email, password, user, saleManager, storeOwner, _a, payload, accessToken;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        email = createUserDto.email, password = createUserDto.password;
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 1:
                        user = _b.sent();
                        return [4 /*yield*/, this.saleManagerRepository.findOne({ user: user })];
                    case 2:
                        saleManager = _b.sent();
                        return [4 /*yield*/, this.storeOwnerRepository.findOne({ user: user })];
                    case 3:
                        storeOwner = _b.sent();
                        if (saleManager) {
                            if (!saleManager.active) {
                                throw new Error('Your account is not active. Please, contact your provider');
                            }
                        }
                        _a = user;
                        if (!_a) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcrypt.compare(password, user.password)];
                    case 4:
                        _a = (_b.sent());
                        _b.label = 5;
                    case 5:
                        if (!_a) return [3 /*break*/, 7];
                        payload = { email: email };
                        return [4 /*yield*/, jwt.sign(payload, process.env.JWT_SECRET, {
                                expiresIn: process.env.JWT_EXPIRE_DURATION,
                            })];
                    case 6:
                        accessToken = _b.sent();
                        return [2 /*return*/, {
                                accessToken: accessToken,
                                email: user.email,
                                role: user.role,
                                id: user.id,
                                saleManager: saleManager,
                                storeOwner: storeOwner,
                            }];
                    case 7: throw new Error('Invalid credentials');
                }
            });
        });
    };
    UserService.prototype.retain = function (email) {
        return __awaiter(this, void 0, void 0, function () {
            var user, saleManager, storeOwner;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.saleManagerRepository.findOne({ user: user })];
                    case 2:
                        saleManager = _a.sent();
                        return [4 /*yield*/, this.storeOwnerRepository.findOne({ user: user })];
                    case 3:
                        storeOwner = _a.sent();
                        return [2 /*return*/, {
                                email: user.email,
                                role: user.role,
                                id: user.id,
                                saleManager: saleManager,
                                storeOwner: storeOwner,
                            }];
                    case 4: throw new Error('Not Found');
                }
            });
        });
    };
    UserService.prototype.changePassword = function (email, changePasswordDto) {
        return __awaiter(this, void 0, void 0, function () {
            var password, user, salt, hashPassword;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        password = changePasswordDto.password;
                        return [4 /*yield*/, this.userRepository.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) return [3 /*break*/, 5];
                        return [4 /*yield*/, bcrypt.genSalt()];
                    case 2:
                        salt = _a.sent();
                        return [4 /*yield*/, bcrypt.hash(password, salt)];
                    case 3:
                        hashPassword = _a.sent();
                        user.password = hashPassword;
                        return [4 /*yield*/, this.userRepository.save(user)];
                    case 4:
                        _a.sent();
                        return [2 /*return*/, user];
                    case 5: throw new Error('Not Found');
                }
            });
        });
    };
    return UserService;
}());
exports.UserService = UserService;
//# sourceMappingURL=UserService.js.map