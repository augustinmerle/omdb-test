
    export const users = [
        {
            username: 'mat',
            password: '12345',
        },
        {
            username: 'PaulAuster',
            password: '12345',

        },
    ];
    export function getUsers() {
        return users
    }
    export function findUserByUsername(username: string) {
        return users.find(user => user.username === username);
    }


