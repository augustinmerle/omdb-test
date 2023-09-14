import express from 'express';
import * as handlers from "./handlers";
import {json} from "body-parser";
import dotenv from 'dotenv';
const jwt = require('jsonwebtoken');
import {expressjwt} from "express-jwt";


const SECRET_KEY = 'this-is-My-SEcrÈt-secreT-Secret2023';  // Générez une clé robuste pour votre production

const authenticateJWT = expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] });

dotenv.config();
const app = express();
app.use(json())

app.all('/*', (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});

app.post('/login', (req, res) => {
    const user = {
        id: 1,   // Par exemple
        username: 'john_doe',
        password: 'jojom'
    }
    const { username, password } = req.body;
    console.log(username, password);
    if (username === user.username && password === user.password) {
        const tokenPayload = {
            sub: user.username,
            iss: 'your-app-name',
            iat: Date.now() / 1000,
            exp: (Date.now() / 1000) + (60 * 60) // Le token expire dans 1 heure
        };

        const token = jwt.sign(tokenPayload, SECRET_KEY);
        res.json({ token });
    } else {
        res.status(401).json({ error: 'Utilisateur ou mot de passe invalide' });
    }

});

app.get('/', handlers.root)
app.get('/films', handlers.fastFurious)
app.get('/export', handlers.pirateCaraibes)
app.get('/auth/films',authenticateJWT, handlers.fastFurious)
app.get('/auth/export',authenticateJWT, handlers.pirateCaraibes)


// app.listen(PORT, () => {
//     console.log(`Serveur en écoute sur http://localhost:${PORT}`);
// });

export default app;
