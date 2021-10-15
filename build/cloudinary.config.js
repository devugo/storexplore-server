"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cloudinary = require("cloudinary");
var cloudinaryV2 = cloudinary.v2;
cloudinaryV2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
exports.default = cloudinaryV2;
//# sourceMappingURL=cloudinary.config.js.map