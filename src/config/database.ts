import dotenv from 'dotenv';
import knex from 'knex';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

const db = knex({
  client: process.env.DB_CLIENT,
  useNullAsDefault: true,
  connection: {
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    ssl: false
  },
});

export default db;