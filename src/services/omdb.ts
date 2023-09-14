import fetch from "cross-fetch";
import {urlencoded} from "express";

export async function getFilm(filmId: any) {
    const resp = await fetch(`${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&type=movie&i=${filmId}`);
    if (!resp.ok) {
        throw new Error('Erreur de réseau lors de la récupération de la réponse de l\'API.');
    }
    return resp.json();
}
export async function searchFilmByName(name: string) {
    const search = encodeURIComponent(name);
    const resp = await fetch(`${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&type=movie&s=${search}`);
    if (!resp.ok) {
        console.log('error')
        throw new Error('Erreur de réseau lors de la récupération de la réponse de l\'API.');
    }
    //@todo gerer le retour   { Response: 'False', Error: 'Movie not found!' }
    return resp.json();
}

export function formatFilmList(data: any) {
    // @ts-ignore
    const result = data.map(filmResult => {
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
    return result;
}
