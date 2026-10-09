import pg from 'pg';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config();

const { Pool } = pg;
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT) || 5432,
});

pool.on('connect', () => {
  console.log('Successfully connected to PostgreSQL database!');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle database client:', err);
});

export default pool;