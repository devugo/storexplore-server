"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAGE = exports.DB_DATABASE = exports.DDB_PASSWORD = exports.DB_USERNAME = exports.DB_PORT = exports.DB_HOST = exports.JWT_SECRET = void 0;
var dotenv = require("dotenv");
// get config vars
dotenv.config();
// access config var
var _a = process.env, JWT_SECRET = _a.JWT_SECRET, DB_HOST = _a.DB_HOST, DB_PORT = _a.DB_PORT, DB_USERNAME = _a.DB_USERNAME, DDB_PASSWORD = _a.DDB_PASSWORD, DB_DATABASE = _a.DB_DATABASE, STAGE = _a.STAGE;
exports.JWT_SECRET = JWT_SECRET;
exports.DB_HOST = DB_HOST;
exports.DB_PORT = DB_PORT;
exports.DB_USERNAME = DB_USERNAME;
exports.DDB_PASSWORD = DDB_PASSWORD;
exports.DB_DATABASE = DB_DATABASE;
exports.STAGE = STAGE;
//# sourceMappingURL=config.js.map