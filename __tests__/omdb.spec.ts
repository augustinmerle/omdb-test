jest.mock('cross-fetch', () => fetchMock);
import fetchMock from 'jest-fetch-mock';
import {getFilmById, formatFilmList, getFilmByName, searchFilmByName} from '../src/services/omdb'

describe('Test omdb func', () => {
    beforeAll(() => {
        jest.mock('cross-fetch', () => fetchMock);
    });
    beforeEach(() => {
        fetchMock.resetMocks();
    });

    const film1 = {
            "Title": "Film Title",
            "Poster": "V1.jpg",
            "Year": "2003",
            "Director": "me",
            "Actors": "Vin Diesel, Paul Walker, Michelle Rodriguez",
        };
    const film2 = {
            "Title": "Film Title 2",
            "Poster": "V2.jpg",
            "Year": "2016",
            "Director": "still me",
            "Actors": "Vin Diesel, Paul Walker, Michelle Rodriguez",
            "otherPAramToIgnore": "should be ignored ignore"
        };

    it('test func getFilmById', async () => {
        fetchMock.mockResponseOnce(JSON.stringify(film2));
        await expect( getFilmById("tt0449088")).resolves.toStrictEqual(
        film2
        );
    })
    it('test formatFilmList', async () => {
        fetchMock.mockResponses(JSON.stringify(film1));
        await expect(formatFilmList( [
                {status: "fulfilled", value: film1 },
                {status: "fulfilled", value: film2 },
                {status: "fulfilled", value: film1 }
            ] )).resolves.toStrictEqual(
                [{
                    "Image": film1.Poster,
                    "before2015": true,
                    "director": film1.Director,
                    "hasCommonActorswithSW": true,
                    "hasPaulWalker": true,
                    "title": film1.Title,
                    "year": film1.Year
                }, {
                    "Image": film2.Poster,
                    "before2015": false,
                    "director": film2.Director,
                    "hasCommonActorswithSW": true,
                    "hasPaulWalker": true,
                    "title": film2.Title,
                    "year": film2.Year
                }, {
                    "Image": film1.Poster,
                    "before2015": true,
                    "director": film1.Director,
                    "hasCommonActorswithSW": true,
                    "hasPaulWalker": true,
                    "title": film1.Title,
                    "year": film1.Year
                }]
        );
    })
})
