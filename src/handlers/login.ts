import {Request, Response} from "express";
import jwt from "jsonwebtoken";
import { checkLogin, generateToken} from "../services/auth";
export default async(req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username, password);

    if (checkLogin(username, password)) {
        res.json(generateToken(username));
    } else {
        res.status(401).json({ error: 'Utilisateur ou mot de passe invalide' });
    }
};

