var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { pool } from "../utils/db";
import { v4 as uuid } from 'uuid';
export class WarriorRecord {
    constructor(obj) {
        if (!obj.name || obj.name.length < 3 || obj.name.length > 10) {
            // throw new ValidationError('Imię Wojownika to jego chluba. Nie może być ono krótsze od 3 znaków, ale by zapaść w pamięci nie powinno być dłuższe niż 10 znaków.');
        }
        this.id = obj.id;
        this.name = obj.name;
        this.fights = obj.fights;
        this.wins = obj.wins;
        this.strength = obj.strength;
        this.defence = obj.defence;
        this.durability = obj.durability;
        this.agility = obj.agility;
    }
    insert() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.id) {
                this.id = uuid();
            }
            yield pool.execute("INSERT INTO `warriors`(`id`,`name`,`fights`, `wins`,`strength`,`defence`,`durability`,`agility`) VALUES(:id, :name)", {
                id: this.id,
                name: this.name,
                fights: this.fights,
                wins: this.wins,
                strength: this.strength,
                defence: this.defence,
                durability: this.durability,
                agility: this.agility,
            });
            return this.id;
        });
    }
    static listAll() {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield pool.execute("SELECT * FROM `warriors` ORDER BY `name` ASC"));
            return results.map(result => new WarriorRecord(result));
        });
    }
    static getOne(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const [results] = (yield pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
                id,
            }));
            return new WarriorRecord(results[0]);
        });
    }
}
//# sourceMappingURL=warrior.record.js.map