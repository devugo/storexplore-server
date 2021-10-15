"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
var jwt = require("jsonwebtoken");
var authenticate = function (req, res, next) {
    var authHeader = req.headers['authorization'];
    var token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.sendStatus(401);
    jwt.verify(token, process.env.JWT_SECRET, function (err, user) {
        if (err)
            return res.status(403).json({
                message: 'Unathourized',
            });
        req.user = user;
        next();
    });
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map