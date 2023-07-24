"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var path = require("path");
var guid = require("uuid-by-string");
var anime_controller_1 = require("../controllers/anime-controller");
var files_controller_1 = require("../controllers/files-controller");
exports.default = (function (router) {
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./uploads/covers");
        },
        filename: function (req, file, callback) {
            callback(null, guid(file.originalname).replace(/-/g, "") + path.extname(file.originalname));
        },
    });
    var uploads = multer({ storage: storage });
    router.get("/anime/trends", anime_controller_1.GetTrends);
    router.post("/anime/new", uploads.array("files"), anime_controller_1.NewAnime);
    router.get("/anime/all", anime_controller_1.AllAnime);
    router.get("/anime/:id", anime_controller_1.GetAnimeById);
    router.get("/image/:type&:name", files_controller_1.GetImage);
});
