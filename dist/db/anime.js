"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateAnimeById = exports.deleteAnimeById = exports.createAnime = exports.getAnimeById = exports.getAllAnime = exports.getTrending = exports.AnimeModel = void 0;
var mongoose_1 = require("mongoose");
var animeSchema = new mongoose_1.Schema({
    cover: { type: String, required: true },
    title: { type: String, required: true },
    synopsys: { type: String, required: true },
    rating: { type: Number, required: true },
    trending: { type: Boolean, required: false },
    category: { type: String, required: true },
    trailer: { type: mongoose_1.Schema.Types.ObjectId, ref: 'Trailer', required: false },
});
exports.AnimeModel = (0, mongoose_1.model)('Anime', animeSchema);
var getTrending = function () { return exports.AnimeModel.find({ trending: true }).limit(2); };
exports.getTrending = getTrending;
var getAllAnime = function () { return exports.AnimeModel.find(); };
exports.getAllAnime = getAllAnime;
var getAnimeById = function (id) { return exports.AnimeModel.findById(id).populate("trailer"); };
exports.getAnimeById = getAnimeById;
var createAnime = function (values) { return new exports.AnimeModel(values).save().then(function (anime) { return anime.toObject(); }); };
exports.createAnime = createAnime;
var deleteAnimeById = function (id) { return exports.AnimeModel.findOneAndDelete({ _id: id }); };
exports.deleteAnimeById = deleteAnimeById;
var updateAnimeById = function (id, values) { return exports.AnimeModel.findByIdAndUpdate(id, values); };
exports.updateAnimeById = updateAnimeById;
