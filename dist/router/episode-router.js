"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var path = require("path");
var guid = require("uuid-by-string");
var episode_controller_1 = require("../controllers/episode-controller");
exports.default = (function (router) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./uploads/episodes");
        },
        filename: function (req, file, callback) {
            callback(null, guid(file.originalname).replace(/-/g, "") + path.extname(file.originalname));
        },
    });
    var uploads = multer({ storage: storage });
    router.post("/episode/new", uploads.array("files"), episode_controller_1.NewEpisode);
    router.get("/season/:season&:owner", episode_controller_1.GetSeason);
});
