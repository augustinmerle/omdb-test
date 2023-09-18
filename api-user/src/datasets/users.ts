
    export const users = [
        {
            username: 'mat',
            password: '12345',
        },
        {
            username: 'PaulAuster',
            password: '12345',
        },
        {
            username: 'john_doe',
            password: 'jojom',
        },

    ];
    export function getUsers() {
        return users
    }
    export function findUserByUsername(username: string) {
        return users.find(user => user.username === username);
    }


