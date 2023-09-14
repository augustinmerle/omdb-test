import express from 'express';
import * as handlers from "./handlers";
import {json} from "body-parser";

const app = express();
app.use(json())

app.all('/*', (req,res,next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "*")
    next()
});


app.get('/', handlers.root)
app.get('/films', handlers.fastFurious)


// app.listen(PORT, () => {
//     console.log(`Serveur en écoute sur http://localhost:${PORT}`);
// });

export default app;
