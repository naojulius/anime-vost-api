"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var stream_controller_1 = require("../controllers/stream-controller");
exports.default = (function (router) {
    router.get("/stream/:name&:type", stream_controller_1.Stream);
});
