import { Schema, model } from "mongoose";

interface IEpisode {
    video: string;
    owner: any;
    season: number;
    episode: number;
  }

const episodeSchema = new Schema<IEpisode>({
    video: { type: String, required: true },
  
    season: { type: Number, required: true },
    episode: { type: Number, required: true },
    owner: {type: Schema.Types.ObjectId, ref: 'AnimeModel'},
  });

export const Episode = model<IEpisode>('Episode', episodeSchema);
export const newEpisode = (values: Record<string, any>) => new Episode(values).save().then((trailer)=> trailer.toObject());
export const getBySeason = (season: Record<string, any>) => Episode.find(season);
//export const newTrailer = () => Trailer.find({trending: true}).limit(2);
// export const getAllAnime = () => AnimeModel.find();
//export const getTrailerById = (id: string) => Trailer.findById(id);
//export const newTrailer = (values: Record<string, any>) => new Trailer(values).save().then((trailer)=> trailer.toObject());
// export const deleteAnimeById = (id: string) => AnimeModel.findOneAndDelete({_id: id});
//export const updateTrailer = (id: string, values: Record<string, any>)=> Trailer.findByIdAndUpdate(id, values);