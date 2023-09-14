import { Request, Response } from 'express';
import fetch from 'cross-fetch';

export default async(req: Request, res: Response) => {
    try {
        const response = await fetch('http://www.omdbapi.com/?apikey=1aa8f6ee&type=movie&s=Fast%20%26%20Furious');

        if (!response.ok) {
            throw new Error('Erreur de réseau lors de la récupération de la réponse de l\'API.');
        }
        const data = await response.json();

        const myfilmsList = await Promise.allSettled(data.Search.map(async (film: any) => checkFilm(film)));

        const result = myfilmsList.map(filmResult => {
            if (filmResult.status === "fulfilled") {
                const film = filmResult.value; // Ici, vous accédez à la valeur réelle du film
                return {
                    title: film.Title,
                    Image: film.Poster,
                    year: film.Year,
                    director: film.Director,
                    before2015: film.Year <= "2015",
                    hasPaulWalker: film.Actors.includes("Paul Walker")
                };
            } else {
                // Vous pouvez gérer le cas où la promesse est rejetée, ou simplement retourner un objet vide ou avec des valeurs par défaut
                return {
                    error: "internal error on this movie"
                };
            }
        });
        res.json(result);
    } catch (error) {
        console.error('Erreur lors de l\'appel à l\'API externe:', error);
        res.status(500).send('Erreur lors de l\'appel à l\'API externe');
    }
};
async function checkFilm(film: any) {
    const resp = await fetch(`http://www.omdbapi.com/?apikey=1aa8f6ee&type=movie&i=${film.imdbID}`);
    if (!resp.ok) {
        throw new Error('Erreur de réseau lors de la récupération de la réponse de l\'API.');
    }
    return resp.json();
}
