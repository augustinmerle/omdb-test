import { Request, Response } from 'express';
import {getFilmById, searchFilmByName, formatFilmList} from "../services/omdb";

export default async(req: Request, res: Response) => {
    try {
        const data = await searchFilmByName('Fast & Furious');
        const myFilmsList = await Promise.allSettled(data.Search.map(async (film: any) => getFilmById(film.imdbID)));
        const result = await formatFilmList(myFilmsList);
        res.json(result);

    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API externe:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API externe');
    }
};
