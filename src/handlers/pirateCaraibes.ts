import { Request, Response } from 'express';
import {appendToSheet, createSheetAndGetURL} from '../services/gsheet'
import {searchFilmsByNameAndFormat} from '../services/omdb'

export default async(req: Request, res: Response) => {
    try {
        const result = await searchFilmsByNameAndFormat('pirates of the caribbean');

        //@todo create new sheet if id is missing
        const sheet = (process.env.GSHEET_SPREADSHEET_ID == "")?
            await createSheetAndGetURL('new Export for Pirates des caraibes'):
            {id: process.env.GSHEET_SPREADSHEET_ID, url: `https://docs.google.com/spreadsheets/d/${process.env.GSHEET_SPREADSHEET_ID}/edit`};

        // @ts-ignore
        appendToSheet(result, sheet.id)
            .then(response => {
                console.log('Données ajoutées:', response.data);
            })
            .catch(error => {
                console.error('Erreur lors de l’ajout des données:', error);
            });

        res.status(201).send(`file populated see: ${sheet.url}`);

    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API externe:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API externe');
    }
};

