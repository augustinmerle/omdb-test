import { Request, Response } from 'express';
import { searchFilmsByNameAndFormat} from "../services/omdb";

export default async(req: Request, res: Response) => {
    try {
        const result = await searchFilmsByNameAndFormat('Fast & Furious');

        res.json(result);

    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API externe:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API externe');
    }
};
