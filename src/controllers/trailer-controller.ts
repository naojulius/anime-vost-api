import * as express from "express";
import * as path from 'path';
import * as guid from 'uuid-by-string';

import { newTrailer,getTrailerById } from "../db/trailers";
import { updateAnimeById } from "../db/anime";


export const NewTrailer = async (req: express.Request, res: express.Response) =>{
    
    try{
       var _file = guid(req.files[0].originalname).replace(/-/g, "") + path.extname(req.files[0].originalname);
        let {video, owner} = req.body;
        video = _file;
        if (!video || !owner){
            return res.sendStatus(400)
        }
        const trailer = await newTrailer({
            video,
            owner,
        });
        await updateAnimeById(owner, {"trailer": trailer._id});
        return res.status(200).json(trailer).end();
    }catch(error){
         console.log(error)
         return res.sendStatus(400);
    }
}

export const GetTrailerById = async (req: express.Request, res: express.Response) =>{
    try{
        const {id} = req.params;
        const anime = await getTrailerById(id);
        return res.status(200).json(anime).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}
