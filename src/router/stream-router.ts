import * as express from "express";
import * as multer from 'multer';
import * as path from 'path';
import { Stream } from "../controllers/stream-controller";

export default (router: express.Router)=>{
    router.get("/stream/:name&:type" , Stream);
}