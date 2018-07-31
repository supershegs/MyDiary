import { Client } from 'pg';
import users from '../migrations/users';
import entries from '../migrations/entries';
import notify from '../migrations/notify';
import dotenv from 'dotenv';

dotenv.config();

const client = new Client();

const dbConnection = {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  pass: process.env.DB_PASS,
  port: process.env.DB_PORT,
};

client.connect(dbConnection);

client.query(users, (err, res) => {
  if (err) {
    console.log('Not created', err);
  } else {
    console.log('successfully created', res);
  }
});
client.query(entries, (err, res) => {
  if (err) {
    console.log('Not created', err);
  } else {
    console.log('successfully created', res);
  }
});
client.query(notify, (err, res) => {
  if (err) {
    console.log('Not created', err);
  } else {
    console.log('successfully created', res);
  }
});
client.end();

export default client;
