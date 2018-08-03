import { Client } from 'pg';
import users from '../migrations/users';
import entries from '../migrations/entries';
import notify from '../migrations/notify';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

client.connect();

client.query(`${users}; ${entries}; ${notify}`, (err, res) => {
  if (err) {
    console.log('Database not created', err);
  } else {
    console.log('Database successfully created');
  }
  client.end();
});


export default client;
