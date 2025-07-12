import dotenv from 'dotenv';
import pkg from 'pg';
import path from 'path';
const { Pool } = pkg;

// Load .env from the parent directory (Server folder)
dotenv.config({ path: path.resolve(process.cwd(), '..', '.env') })

const{
    POSTGRES_HOST,
    POSTGRES_DB,
    POSTGRES_PORT,
    POSTGRES_USER,
    POSTGRES_PASSWORD,
} = process.env

// Debug: Check if environment variables are loaded correctly
console.log('Environment variables:');
console.log('HOST:', POSTGRES_HOST);
console.log('DB:', POSTGRES_DB);
console.log('PORT:', POSTGRES_PORT);
console.log('USER:', POSTGRES_USER);
console.log('PASSWORD:', POSTGRES_PASSWORD ? '[HIDDEN]' : 'UNDEFINED');

export const client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    port: POSTGRES_PORT,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
})

client.query('SELECT * FROM users', (err, res) => {
    if (!err) {
        console.log("Connection successful!");
        console.log(res.rows);
    } else {
        console.log("Error:", err);
    }
    client.end();
});

