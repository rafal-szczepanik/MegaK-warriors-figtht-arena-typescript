import {v4 as uuid} from 'uuid';
import {FieldPacket} from "mysql2/promise";
import {pool} from "../utils/db";
import {ValidationError} from "../utils/errors";

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]]

export class WarriorRecord {
    public id?: string;
    public readonly name: string;
    public readonly strength: number;
    public readonly defence: number;
    public readonly durability: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: WarriorRecord) {
        const {wins, agility, defence, durability, id, strength, name} = obj

        const sum = [agility, defence, durability, strength].reduce((prev, curr) => Number(prev) + Number(curr), 0)

        if (!obj.name || name.length < 3 || name.length > 10) {
            throw new ValidationError('Imię Wojownika to jego chluba. Nie może być ono krótsze od 3 znaków, ale by zapaść w pamięci nie powinno być dłuższe niż 10 znaków.');
        }

        if (sum !== 10) {
            throw new ValidationError(`Suma statystyk musi wynosić 10. Aktualnie jest to ${sum}`);
        }
        this.id = id
        this.name = name
        this.wins = wins
        this.strength = strength
        this.defence = defence
        this.durability = durability
        this.agility = agility
    }

    async insert(): Promise<string> {
        if (!this.id) {
            this.id = uuid()
        }
        if (!this.wins) {
            this.wins = 0
        }

        await pool.execute("INSERT INTO `warriors`(`id`,`name`, `wins`,`strength`,`defence`,`durability`,`agility`) VALUES(:id, :name, :wins, :strength, :defence, :durability, :agility)", {
            id: this.id,
            name: this.name,
            // fights: this.fights,
            wins: this.wins,
            strength: this.strength,
            defence: this.defence,
            durability: this.durability,
            agility: this.agility,
        })
        return this.id
    }

    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = (await pool.execute("SELECT * FROM `warriors` ORDER BY `name` ASC")) as WarriorRecordResults;
        return results.map(result => new WarriorRecord(result))
    }

    static async getOne(id: string): Promise<WarriorRecord> {
        const [results] = (await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id,
        })) as WarriorRecordResults;
        return new WarriorRecord(results[0])
    }
}