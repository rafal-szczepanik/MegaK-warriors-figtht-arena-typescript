import {WarriorRecord} from "../records/warrior.record";

export function fight(warrior1: WarriorRecord, warrior2: WarriorRecord): {
    winner: WarriorRecord,
    log: string[]
} {
    const log = []
    const warriorObj1 = {
        hp: warrior1.durability * 10,
        dp: warrior1.defence,
        warrior: warrior1
    }

    const warriorObj2 = {
        hp: warrior2.durability * 10,
        dp: warrior2.defence,
        warrior: warrior2
    }

    let attacker = warriorObj1;
    let defender = warriorObj2

    while (defender.hp > 0) {
        if ((defender.warrior.agility + defender.warrior.defence > defender.warrior.strength) && defender.dp > 0) {
            defender.dp = defender.dp - attacker.warrior.strength
            console.log(`Wojownik ${attacker.warrior.name} zaatakował ${defender.warrior.name} i zadał mu ${attacker.warrior.strength} obrażeń. ${defender.warrior.name} ma teraz ${defender.dp < 0 ? 0 : defender.dp} tarczy i ${defender.hp} hp`)
            if (defender.dp < 0) {
                defender.hp = defender.hp + defender.dp
                defender.dp = 0
            }
        } else {
            defender.hp = defender.hp - attacker.warrior.strength
            console.log(`Wojownik ${attacker.warrior.name} zaatakował ${defender.warrior.name} i zadał mu ${attacker.warrior.strength} obrażeń. ${defender.warrior.name} ma teraz ${defender.hp} hp.`)
        }

        [attacker, defender] = [defender, attacker]

    }
    const winner = attacker.warrior
    return {winner, log}
}