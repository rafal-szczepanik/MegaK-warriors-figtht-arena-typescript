import { createPool } from 'mysql2/promise';
export const pool = createPool({
    host: 'localhost',
    user: 'root',
    database: 'megak_fight',
    namedPlaceholders: true,
    decimalNumbers: true,
});
//# sourceMappingURL=db.js.map