"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTrailer = exports.getTrailerById = exports.Trailer = void 0;
var mongoose_1 = require("mongoose");
var trailerSchema = new mongoose_1.Schema({
    video: { type: String, required: true },
    owner: { type: mongoose_1.Schema.Types.ObjectId, ref: 'AnimeModel' },
});
exports.Trailer = (0, mongoose_1.model)('Trailer', trailerSchema);
//export const newTrailer = () => Trailer.find({trending: true}).limit(2);
// export const getAllAnime = () => AnimeModel.find();
var getTrailerById = function (id) { return exports.Trailer.findById(id); };
exports.getTrailerById = getTrailerById;
var newTrailer = function (values) { return new exports.Trailer(values).save().then(function (trailer) { return trailer.toObject(); }); };
exports.newTrailer = newTrailer;
// export const deleteAnimeById = (id: string) => AnimeModel.findOneAndDelete({_id: id});
//export const updateTrailer = (id: string, values: Record<string, any>)=> Trailer.findByIdAndUpdate(id, values);
