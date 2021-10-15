"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unathorizedError = exports.notFoundError = exports.serverError = exports.throwError = void 0;
var ERROR_CODE_1 = require("../constant/ERROR_CODE");
var throwError = function (errorObj, message) {
    if (errorObj.code === ERROR_CODE_1.ERROR_CODE.conflict) {
        return {
            code: 409,
            message: message || 'Resource already exists',
        };
    }
    else if (errorObj.code === ERROR_CODE_1.ERROR_CODE.notFound) {
        return {
            code: 404,
            message: message || 'Resource not found',
        };
    }
    else if (errorObj.code === ERROR_CODE_1.ERROR_CODE.unathorize) {
        return {
            code: 403,
            message: message || 'Unathorized',
        };
    }
    else {
        return {
            code: 500,
            message: message || 'Internal Server Error',
        };
    }
};
exports.throwError = throwError;
var serverError = function (response, message) {
    var err = exports.throwError({ code: ERROR_CODE_1.ERROR_CODE.internal }, message);
    return response.status(err.code).json({
        message: err.message,
        success: false,
    });
};
exports.serverError = serverError;
var notFoundError = function (response, message) {
    var err = exports.throwError({ code: ERROR_CODE_1.ERROR_CODE.notFound }, message);
    return response.status(err.code).json({
        message: err.message,
        success: false,
    });
};
exports.notFoundError = notFoundError;
var unathorizedError = function (response, message) {
    var err = exports.throwError({ code: ERROR_CODE_1.ERROR_CODE.unathorize }, message);
    return response.status(err.code).json({
        message: err.message,
        success: false,
    });
};
exports.unathorizedError = unathorizedError;
//# sourceMappingURL=throw-error.js.map