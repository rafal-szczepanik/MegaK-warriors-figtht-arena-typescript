import {Router} from 'express';
// import {WarriorRecord} from "../records/warrior.record";

export const hallOfFameRouter = Router();

hallOfFameRouter
    .get('/list', async (req, res) => {
        res.render('hall-of-fame/list', {})
    })
