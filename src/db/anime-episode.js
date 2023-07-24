"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBySeason = exports.newEpisode = exports.Episode = void 0;
var mongoose_1 = require("mongoose");
var episodeSchema = new mongoose_1.Schema({
    video: { type: String, required: true },
    season: { type: Number, required: true },
    episode: { type: Number, required: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'AnimeModel' },
});
exports.Episode = (0, mongoose_1.model)('Episode', episodeSchema);
var newEpisode = function (values) { return new exports.Episode(values).save().then(function (trailer) { return trailer.toObject(); }); };
exports.newEpisode = newEpisode;
var getBySeason = function (season) { return exports.Episode.find(season); };
exports.getBySeason = getBySeason;
//export const newTrailer = () => Trailer.find({trending: true}).limit(2);
// export const getAllAnime = () => AnimeModel.find();
//export const getTrailerById = (id: string) => Trailer.findById(id);
//export const newTrailer = (values: Record<string, any>) => new Trailer(values).save().then((trailer)=> trailer.toObject());
// export const deleteAnimeById = (id: string) => AnimeModel.findOneAndDelete({_id: id});
//export const updateTrailer = (id: string, values: Record<string, any>)=> Trailer.findByIdAndUpdate(id, values);
