"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationErrorMessage = void 0;
var validationErrorMessage = function (errors) {
    var message = '';
    var error = errors[0];
    if (error) {
        message = error.msg + " for " + error.param;
    }
    return message;
};
exports.validationErrorMessage = validationErrorMessage;
//# sourceMappingURL=validation-error-message.js.map