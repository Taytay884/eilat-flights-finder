import express, {Application} from "express";
import {Routes} from './routes';
import * as path from "path";

const app: Application = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, 'front')));
new Routes(app);

const PORT: any = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}`));
