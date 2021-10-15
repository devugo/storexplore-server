"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRoutes = void 0;
var ChatController_1 = require("../controller/ChatController");
var authenticate_1 = require("../middleware/authenticate");
exports.ChatRoutes = [
    {
        method: 'get',
        route: '/chats',
        controller: ChatController_1.ChatController,
        action: 'get',
        middleware: authenticate_1.authenticate,
        validation: [],
    },
];
//# sourceMappingURL=chats.js.map