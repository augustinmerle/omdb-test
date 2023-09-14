import { Request, Response } from 'express';
import {appendToSheet, createSheetAndGetURL} from '../services/gsheet'
import {formatFilmList, getFilmById, searchFilmByName} from '../services/omdb'

export default async(req: Request, res: Response) => {
    try {
        const search = await searchFilmByName('pirates of the caribbean');
        const myFilmsList = await Promise.allSettled(search.Search.map(async (film: any) => getFilmById(film.imdbID)));

        const result = await formatFilmList(myFilmsList);
            //@todo create new sheet if id is missing
        let sheet = {id: '', url:''};
        if (process.env.GSHEET_SPREADSHEET_ID == "") {
                 // @ts-ignore
                sheet = await createSheetAndGetURL('new Export for Pirates des caraibes')
        }
        else {
             // @ts-ignore
        sheet = {id: process.env.GSHEET_SPREADSHEET_ID, url: ''}
        }

        appendToSheet(result, sheet.id)
            .then(response => {
                console.log('Données ajoutées:', response.data);
            })
            .catch(error => {
                console.error('Erreur lors de l’ajout des données:', error);
            });

        // @ts-ignore
        res.status(201).send(`file populated see: https://docs.google.com/spreadsheets/d/${process.env.GSHEET_SPREADSHEET_ID}/edit`);

    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API externe:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API externe');
    }
};

