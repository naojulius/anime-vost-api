import { Schema, model } from "mongoose";

interface ITrailer {
    video: string;
    owner: any;
  }

const trailerSchema = new Schema<ITrailer>({
    video: { type: String, required: true },
    owner: {type: Schema.Types.ObjectId, ref: 'AnimeModel'},
  });

export const Trailer = model<ITrailer>('Trailer', trailerSchema);
//export const newTrailer = () => Trailer.find({trending: true}).limit(2);
// export const getAllAnime = () => AnimeModel.find();
export const getTrailerById = (id: string) => Trailer.findById(id);
export const newTrailer = (values: Record<string, any>) => new Trailer(values).save().then((trailer)=> trailer.toObject());
// export const deleteAnimeById = (id: string) => AnimeModel.findOneAndDelete({_id: id});
//export const updateTrailer = (id: string, values: Record<string, any>)=> Trailer.findByIdAndUpdate(id, values);