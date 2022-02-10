import {createPool, Pool} from 'mysql2/promise'

export const pool: Pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_fight',
    namedPlaceholders: true,
    decimalNumbers: true,
});
