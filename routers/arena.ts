import {Router} from 'express';
import {WarriorRecord} from "../records/warrior.record";
import {fight} from "../utils/fight";

export const arenaRouter = Router();

arenaRouter
    .get('/fight-form', async (req, res) => {
        const warriorList = await WarriorRecord.listAll()
        res.render('arena/fight-form', {
            warriorList
        })
    })

    .post('/fight', async (req, res) => {
        const {name} = req.body
        const [id1, id2] = name
        const warrior1 = await WarriorRecord.getOne(id1)
        const warrior2 = await WarriorRecord.getOne(id2)
        const fightResult = fight(warrior1,warrior2)
        console.log(fightResult)
        res.render('arena/fight', {
            warrior1,
            warrior2,
            fightResult
        })
    })