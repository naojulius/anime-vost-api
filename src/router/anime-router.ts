import * as express from "express";
import * as multer from 'multer';
import * as path from 'path';
import * as guid from 'uuid-by-string';
import { 
    AllAnime, 
    NewAnime, 
    GetAnimeById,
    GetTrending,
    GetTrends
 } from '../controllers/anime-controller';
import { isAuthenticated } from "../middlewares";
import { GetImage } from "../controllers/files-controller";

export default (router: express.Router)=>{
    const storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, "./uploads/covers")
        },
        filename: function(req, file, callback){
            callback(null, guid(file.originalname).replace(/-/g, "") + path.extname(file.originalname))
        },
    });
    const uploads = multer({storage:  storage});

    router.get("/anime/trends", GetTrends);
    router.post("/anime/new",uploads.array("files"),  NewAnime);
    router.get("/anime/all", AllAnime);
    router.get("/anime/:id", GetAnimeById);
    router.get("/image/:type&:name",  GetImage);
    
}