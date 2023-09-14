import express from 'express';

const app = express();
const PORT = 3000;

app.get('/', (req, res) => {
    res.send('Bonjour depuis Express et TypeScript!');
});

// app.listen(PORT, () => {
//     console.log(`Serveur en écoute sur http://localhost:${PORT}`);
// });

export default app;
