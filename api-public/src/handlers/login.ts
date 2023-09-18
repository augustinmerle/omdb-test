import {Request, Response} from "express";
import { checkLogin, generateToken} from "../services/auth";

export default async(req: Request, res: Response) => {
    const { username, password } = req.body;

    if (await checkLogin(username, password)) {
        res.json(generateToken(username));
    } else {
        res.status(401).json({ error: 'Utilisateur ou mot de passe invalide' });
    }
};

