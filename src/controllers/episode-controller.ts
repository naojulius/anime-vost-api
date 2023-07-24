import * as express from "express";
import * as path from 'path';
import * as guid from 'uuid-by-string';

import { newTrailer,getTrailerById } from "../db/trailers";
import { updateAnimeById } from "../db/anime";
import { getBySeason, newEpisode } from "../db/anime-episode";


export const NewEpisode = async (req: express.Request, res: express.Response) =>{
    try{
        var _file = guid(req.files[0].originalname).replace(/-/g, "") + path.extname(req.files[0].originalname);
         let {video, owner,season, episode} = req.body;
         video = _file;
         if (!owner || !season  || !episode){
             return res.sendStatus(400)
         }
         const _episode = await newEpisode({
            owner, episode, season, video
         });
        //  await updateAnimeById(owner, {"trailer": trailer._id});
          return res.status(200).json(_episode).end();
     }catch(error){
          console.log(error)
          return res.sendStatus(400);
     }
}

export const GetSeason = async (req: express.Request, res: express.Response) =>{
    try{
        const seasons = await getBySeason({season: req.params.season, owner: req.params.owner});
        return res.status(200).json(seasons).end();

     }catch(error){
          console.log(error)
          return res.sendStatus(400);
     }
}
