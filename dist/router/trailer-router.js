"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var multer = require("multer");
var path = require("path");
var guid = require("uuid-by-string");
var trailer_controller_1 = require("../controllers/trailer-controller");
exports.default = (function (router) {
    var date = new Date();
    var storage = multer.diskStorage({
        destination: function (req, file, callback) {
            callback(null, "./uploads/trailers");
        },
        filename: function (req, file, callback) {
            callback(null, guid(file.originalname).replace(/-/g, "") + path.extname(file.originalname));
        },
    });
    var uploads = multer({ storage: storage });
    router.post("/trailer/new", uploads.array("files"), trailer_controller_1.NewTrailer);
    router.get("/trailer/:id/", trailer_controller_1.GetTrailerById);
});
