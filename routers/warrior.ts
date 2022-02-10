import {Router} from 'express';
import {WarriorRecord} from "../records/warrior.record";

export const warriorRouter = Router();

warriorRouter

    // .get('/', async (req, res) => {
    //     // const warrior = await WarriorRecord.getOne(req.params.warriorId)
    //     res.render('warrior/warrior', {})
    // })

    .get('/add-form', async (req, res) => {
        res.render('warrior/add-form', {})
    })

    .post('/fight', async (req, res) => {
        const newWarrior = new WarriorRecord(req.body)
        await newWarrior.insert()
        res.render('warrior/warrior-added', {
            newWarrior
        })
    })