import dotenv from 'dotenv';
import path from 'path';

dotenv.config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
});

export default {
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
  pool: {
    min: 2,
    max: 10
  },
  migrations: {
    tableName: 'knex_migrations',
    directory: [path.resolve(__dirname, 'src', 'database', 'migrations')],
    extension: 'ts'
  },
  seeds: {
    directory: [path.resolve(__dirname, 'src', 'database', 'seeds')]
  },
  log: {
    warn() { },
  }
}