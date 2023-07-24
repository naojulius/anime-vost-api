import * as express from "express";
import * as multer from 'multer';
import * as path from 'path';
import * as guid from 'uuid-by-string';
import {
    GetTrailerById,
     NewTrailer,
} from '../controllers/trailer-controller';

export default (router: express.Router)=>{
    const date = new Date();
    const storage = multer.diskStorage({
        destination: function(req, file, callback){
            callback(null, "./uploads/trailers")
        },
        filename: function(req, file, callback){
            callback(null, guid(file.originalname).replace(/-/g, "") + path.extname(file.originalname))
        },
    });

    const uploads = multer({storage:  storage});
    router.post("/trailer/new", uploads.array("files") , NewTrailer);
    router.get("/trailer/:id/", GetTrailerById);
    
}