import * as express from "express";
import * as multer from 'multer';
import * as path from 'path';
import * as guid from 'uuid-by-string';
import { GetSeason, NewEpisode } from "../controllers/episode-controller";

export default (router: express.Router)=>{


    const storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, "./uploads/episodes")
        },
        filename: function(req, file, callback){
            callback(null, guid(file.originalname).replace(/-/g, "") + path.extname(file.originalname))
        },
    });

    const uploads = multer({storage:  storage});
    router.post("/episode/new" ,uploads.array("files"),  NewEpisode);
    router.get("/season/:season&:owner",  GetSeason);
}