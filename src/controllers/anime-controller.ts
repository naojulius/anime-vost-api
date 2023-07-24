import * as express from "express";
import * as path from 'path';
import * as guid from 'uuid-by-string';
import mongoose from "mongoose";
import {
     createAnime, 
     getAllAnime, 
     getAnimeById,
     getTrending
} from "../db/anime";



export const NewAnime = async (req: express.Request, res: express.Response) =>{
    try{
        
        // var _file = guid(req.files[0].originalname).replace(/-/g, "") + path.extname(req.files[0].originalname);
        // let {video, owner,season, episode, keyCode} = req.body;
        // video = _file;
        // if (!owner || !season  || !episode || !keyCode){
        //     return res.sendStatus(400)
        // }
        // const _episode = await newEpisode({
        //    owner, episode, season, video, keyCode
        // });
        
        
        
        var _file = guid(req.files[0].originalname).replace(/-/g, "") + path.extname(req.files[0].originalname);
        let {title, synopsys, rating, cover, trending, category, trailer} = req.body;
        
        if (!title || !synopsys || !rating || !category){
            return res.sendStatus(400)
        }
        cover = _file;
        const anime = await createAnime({
            cover,
            rating,
            synopsys,
            title,
            category,
            trending, 
            trailer,
        });
        return res.status(200).json(anime).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}
export const AllAnime = async (req: express.Request, res: express.Response) =>{
    try{
        const anime = await getAllAnime();
        return res.status(200).json(anime).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}

export const GetAnimeById = async (req: express.Request, res: express.Response) =>{
    try{
        const {id} = req.params;
        const anime = await getAnimeById(id);
        return res.status(200).json(anime).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}


export const GetTrending = async (req: express.Request, res: express.Response) =>{
    try{
        const anime = await getTrending();
        return res.status(200).json(anime).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}

export const GetTrends = async (req: express.Request, res: express.Response) =>{
    try{
        const anime = await getTrending();
        return res.status(200).json(anime).end();
    }catch(error){
        console.log(error)
        return res.sendStatus(400);
    }
}