import { Request, Response } from 'express';
import {exportToSheet} from '../services/gsheet'
import {searchFilmsByNameAndFormat} from '../services/omdb'

export default async(req: Request, res: Response) => {
    try {
        if (req.body.search == '' || req.body.search == undefined ){
            res.status(500).send(`missing param search`);
        }
        console.log(req.body.search)
        const result = await searchFilmsByNameAndFormat(req.body.search);

        if (req.body.format == "gsheet") {
            const url = await exportToSheet(result)
            res.status(201).send(`file populated see: ${url}`);
        }
        else {
            res.json(result);
        }

    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API externe:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API externe');
    }
};

