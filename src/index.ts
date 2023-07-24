import * as express from 'express';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';
import * as compression from 'compression';
import * as cors from 'cors';
import { Mongoose, connect } from 'mongoose';
import { AnimeModel } from './db/anime';
import router from './router';

const app = express();
app.use(cors({
    credentials: true
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json({ limit: '300mb' }));




const server = http.createServer(app);
server.listen(8080, ()=>{
    console.log("Running on localhost:8080")
})

const MONGO_URL = 'mongodb+srv://nj:h9UyAqfWUMQISjQN@cluster0.dedx4kk.mongodb.net/?retryWrites=true&w=majority';
run().catch(err=> console.log(err));
async function run() {
    await connect(MONGO_URL);

    const anime = new AnimeModel({
       "title": "Kimetsu no Yaiba",
       "cover": "1.jpg",
       "rating": 7.8,
       "synopsys": "family is attacked by demons and only two members survive - Tanjiro and his sister Nezuko, who is turning into a demon slowly. Tanjiro sets out to become",
      });
}
app.use("/", router());