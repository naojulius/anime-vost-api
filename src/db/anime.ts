import { Schema, model } from "mongoose";
import { CategoryEnum } from "../@core/category-enum";

interface IAnime {
    cover: string;
    title: string;
    synopsys: string;
    rating: number;
    trending: boolean;
    category: string;
    trailer: any;
  }
  

const animeSchema = new Schema<IAnime>({
    cover: { type: String, required: true },
    title: { type: String, required: true },
    synopsys: { type: String, required: true },
    rating: { type: Number, required: true },
    trending: {type: Boolean, required: false},
    category: {type: String, required: true},
    trailer: {type: Schema.Types.ObjectId, ref: 'Trailer', required: false},

  });

export const AnimeModel = model<IAnime>('Anime', animeSchema);
export const getTrending = () => AnimeModel.find({trending: true}).limit(2);
export const getAllAnime = () => AnimeModel.find();
export const getAnimeById = (id: string) => AnimeModel.findById(id).populate("trailer");
export const createAnime = (values: Record<string, any>) => new AnimeModel(values).save().then((anime)=> anime.toObject());
export const deleteAnimeById = (id: string) => AnimeModel.findOneAndDelete({_id: id});
export const updateAnimeById = (id: string, values: Record<string, any>)=> AnimeModel.findByIdAndUpdate(id, values);

