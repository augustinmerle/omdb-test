import {expressjwt} from "express-jwt";
import {findUserByUsername, User} from "./users"
const jwt = require('jsonwebtoken');

const SECRET_KEY = (process.env.JWT_SECRET_KEY)? process.env.JWT_SECRET_KEY: 'test_my_secret' ;  // Générez une clé robuste pour votre production

// Lors de la connexion ou de l'inscription


export async function checkLogin(username: string, password: string) {
    const user: User = await findUserByUsername(username) || {username: '', password: ""};
        return (username === user.username && password === user.password) ? true : false;
}
export function generateToken(username: string) {
    const tokenPayload = {
        sub: username,
        iss: 'your-app-name',
        iat: Date.now() / 1000,
        exp: (Date.now() / 1000) + (60 * 60) // Le token expire dans 1 heure
    };

    return  jwt.sign(tokenPayload, SECRET_KEY);
}

export const authenticateJWT = expressjwt({ secret: SECRET_KEY, algorithms: ['HS256'] });
