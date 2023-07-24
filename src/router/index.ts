import * as express from 'express';

import  animeRouter from "./anime-router";
import trailerRouter from "./trailer-router";
import streamRouter from './stream-router';
import episodeRouter from './episode-router';
import userRouter from './user-router';

const router = express.Router();
export default(): express.Router =>{
    streamRouter(router);
    animeRouter(router);
    trailerRouter(router);
    episodeRouter(router);
    userRouter(router);
   
    return router;
}
