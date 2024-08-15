import dotenv from 'dotenv';
dotenv.config();

// Import and require Pool (node-postgres)
// A connection pool handles multiple operations to improve performance
import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: 'localhost',
    port: 5432,
    database: process.env.DB_NAME,
});

const connectToDb = async () => {
    try {
        await pool.connect();
        console.log('Connected to the database.');
    } catch (err) {
        console.error('Error connecting to the database:', err);
        process.exit(1);
    }
};

export { pool, connectToDb };