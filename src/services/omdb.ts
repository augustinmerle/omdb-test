import fetch from "cross-fetch";
import {urlencoded} from "express";

export async function getFilmById(filmId: any) {
    const resp = await fetch(`${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&type=movie&i=${filmId}`);
    if (!resp.ok) {
        throw new Error('Erreur de réseau lors de la récupération de la réponse de l\'API.');
    }
    return resp.json();
}
export async function getFilmByName(filmName: string) {
    const search = encodeURIComponent(filmName);
    const resp = await fetch(`${process.env.OMDB_API_URL}/?apikey=${process.env.OMDB_API_KEY}&type=movie&t=${search}`);
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
    //@todo gerer le retour  { Response: 'False', Error: 'Movie not found!' }
    return resp.json();
}
function hasStarWarsActor(actors: string, starWarsActors: any): boolean {
    const actorsArray = actors.split(', ').map(actor => actor.trim());
    return actorsArray.some(actor => starWarsActors.includes(actor));
}

//@todo remove use of PromiseSettledResult
export async function formatFilmList(data: PromiseSettledResult<any>[]) {
    const starWarsData = await getFilmByName('Star Wars');
    // @ts-ignore
    const result = data.map(filmResult => {
        if (filmResult.status === "fulfilled") {
            const film = filmResult.value; // Ici, vous accédez à la valeur réelle du film
            // @ts-ignore
            return {
                title: film.Title,
                Image: film.Poster,
                year: film.Year,
                director: film.Director,
                before2015: film.Year <= "2015",
                hasPaulWalker: film.Actors.includes("Paul Walker"),
                hasCommonActorswithSW: hasStarWarsActor(film.Actors ,starWarsData.Actors)
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
export async function searchFilmsByNameAndFormat(filmName: string){
    const search = await searchFilmByName(filmName);
    const myFilmsList = await Promise.allSettled(search.Search.map(async (film: any) => getFilmById(film.imdbID)));
    return  await formatFilmList(myFilmsList);

}
