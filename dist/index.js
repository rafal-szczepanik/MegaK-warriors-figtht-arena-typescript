import * as express from 'express';
import 'express-async-errors';
import './utils/db.ts';
import { engine } from 'express-handlebars';
import { homeRouter } from "./routers/home";
import { warriorRouter } from "./routers/warrior";
const app = express();
app.engine('.hbs', engine({
    extname: '.hbs',
}));
app.set('view engine', '.hbs');
app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.listen(3000, '0.0.0.0', () => {
    console.log('Listening on http://localhost:3000');
});
//# sourceMappingURL=index.js.map