import { request } from 'graphql-request';

export interface User {
    username: string;
    password: string;
}

interface GraphQLResponse {
    findUserByUsername: User;
}
const GRAPHQL_API_URL: string = (process.env.GRAPHQL_ENDPOINT_URL)? process.env.GRAPHQL_ENDPOINT_URL: 'http://localhost:4000/graphql';

export async function findUserByUsername(username: string) {
    console.log(GRAPHQL_API_URL);
    const query = `
        query FindUser($username: String!) {
            findUserByUsername(username: $username) {
                username
                password
            }
        }
    `;

    try {
        const data: GraphQLResponse = await request(GRAPHQL_API_URL, query, { username });

        return data?.findUserByUsername;
    } catch (error) {
        console.error("Erreur lors de la requête GraphQL:", error);
        throw error;
    }
}


