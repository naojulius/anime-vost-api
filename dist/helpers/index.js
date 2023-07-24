"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authentication = exports.random = void 0;
var crypto = require("crypto");
var SECRET = "64b77fdade99b4650666c54d";
var random = function () { return crypto.randomBytes(128).toString('base64'); };
exports.random = random;
var authentication = function (salt, password) {
    return crypto.createHmac('sha256', [salt, password].join("/")).update(SECRET).digest('hex');
};
exports.authentication = authentication;
