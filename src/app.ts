import express from 'express';
import * as handlers from "./handlers";
import {json} from "body-parser";
import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');
import {expressjwt} from "express-jwt";
import {authenticateJWT} from "./services/auth";


dotenv.config();
const app = express();
app.use(json())

app.all('/*', (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});

app.get('/', handlers.root)
app.get('/films', handlers.fastFurious)
app.get('/export', handlers.pirateCaraibes)
app.get('/auth/films',authenticateJWT, handlers.fastFurious)
app.get('/auth/export',authenticateJWT, handlers.pirateCaraibes)

app.post('/login', handlers.login)
app.post('/search', handlers.filmFetcher)

export default app;
