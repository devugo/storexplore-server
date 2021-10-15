"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.successCreationMessage = exports.notFoundErrorMessage = void 0;
var notFoundErrorMessage = function (entity, id) {
    return entity + " with ID \"" + id + "\" not found";
};
exports.notFoundErrorMessage = notFoundErrorMessage;
var successCreationMessage = function (entity) {
    return entity + " has been created successfully";
};
exports.successCreationMessage = successCreationMessage;
//# sourceMappingURL=get-error-message.js.map