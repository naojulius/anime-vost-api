"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var anime_router_1 = require("./anime-router");
var trailer_router_1 = require("./trailer-router");
var stream_router_1 = require("./stream-router");
var episode_router_1 = require("./episode-router");
var user_router_1 = require("./user-router");
var router = express.Router();
exports.default = (function () {
    (0, stream_router_1.default)(router);
    (0, anime_router_1.default)(router);
    (0, trailer_router_1.default)(router);
    (0, episode_router_1.default)(router);
    (0, user_router_1.default)(router);
    return router;
});
