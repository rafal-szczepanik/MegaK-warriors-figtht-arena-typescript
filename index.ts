import * as express from 'express';
import './utils/db.ts';
import 'express-async-errors';
import {static as eStatic, urlencoded} from "express";
import {engine} from 'express-handlebars';
import {join} from 'path';
import * as methodOverride from 'method-override';
import {handleError} from "./utils/errors";
import {arenaRouter} from "./routers/arena";
import {homeRouter} from "./routers/home";
import {warriorRouter} from "./routers/warrior";
import {hallOfFameRouter} from "./routers/hall-of-fame";

const app = express();

app.use(urlencoded({
    extended: true,
}))
app.use(methodOverride('_method'))
app.use(eStatic(join(__dirname, 'public')))
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);
app.use(handleError)


app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3000');
});