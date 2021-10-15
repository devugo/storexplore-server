"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var dotenv = require("dotenv");
var http = require('http');
var SocketIO = require("socket.io");
var Server = SocketIO.Server;
// get config vars
dotenv.config();
var routes_1 = require("./routes");
var ChatService_1 = require("./service/ChatService");
var SaleService_1 = require("./service/SaleService");
typeorm_1.createConnection()
    .then(function (connection) { return __awaiter(void 0, void 0, void 0, function () {
    var app, chatService, saleService, server, io;
    return __generator(this, function (_a) {
        app = express();
        app.use(cors());
        app.use(bodyParser.json());
        app.use(bodyParser.urlencoded({ extended: true }));
        chatService = new ChatService_1.ChatService();
        saleService = new SaleService_1.SaleService();
        server = http.createServer(app);
        io = new Server(server, {
            cors: {
                origin: process.env.CLIENT_URL,
                methods: ['GET', 'POST'],
            },
        });
        io.on('connection', function (socket) {
            console.log('Connected');
            socket.on('chat message', function (_a) {
                var from = _a.from, to = _a.to, message = _a.message;
                console.log('Logging chat messages', { from: from, to: to, message: message });
                io.emit('chat message', {
                    from: from,
                    to: to,
                    message: message,
                    createdAt: new Date().toISOString(),
                    new: true,
                });
                chatService.create({ from: from, to: to, message: message });
            });
            socket.on('add sale', function (_a) {
                var from = _a.from, sale = _a.sale;
                return __awaiter(void 0, void 0, void 0, function () {
                    var create;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                console.log('Logging add sale socket...', { from: from, sale: sale });
                                return [4 /*yield*/, saleService.create({ from: from, sale: sale })];
                            case 1:
                                create = _b.sent();
                                if (create.error) {
                                    io.emit('add sale', create);
                                }
                                else {
                                    io.emit('add sale', {
                                        from: from,
                                        sale: __assign(__assign({}, sale), { id: create.id, new: true }),
                                    });
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
            socket.on('delete sale', function (_a) {
                var from = _a.from, sale = _a.sale;
                return __awaiter(void 0, void 0, void 0, function () {
                    var deleted;
                    return __generator(this, function (_b) {
                        switch (_b.label) {
                            case 0:
                                console.log('Loging delete sale socket...', { from: from, sale: sale });
                                return [4 /*yield*/, saleService.delete(sale, from)];
                            case 1:
                                deleted = _b.sent();
                                if (deleted.error) {
                                    io.emit('delete sale', deleted);
                                }
                                else {
                                    io.emit('delete sale', { from: from, id: sale });
                                }
                                return [2 /*return*/];
                        }
                    });
                });
            });
        });
        // register express routes from defined application routes
        routes_1.Routes.forEach(function (route) {
            var _a;
            (_a = app)[route.method].apply(_a, __spreadArray(__spreadArray([route.route, route.middleware
                    ? route.middleware
                    : function (_req, _res, next) {
                        next();
                    }], route.validation), [function (req, res, next) {
                    var result = new route.controller()[route.action](req, res, next);
                    if (result instanceof Promise) {
                        result
                            .then(function (result) {
                            return result !== null && result !== undefined
                                ? res.send(result)
                                : undefined;
                        })
                            .catch(function (error) { return console.log(error); });
                    }
                    else if (result !== null && result !== undefined) {
                        res.json(result);
                    }
                }]));
        });
        // setup express app here
        // ...
        // start express server
        server.listen(process.env.PORT);
        console.log('Express server has started on port 4000. Open http://localhost:4000 to begin');
        return [2 /*return*/];
    });
}); })
    .catch(function (error) { return console.log(error); });
//# sourceMappingURL=index.js.map