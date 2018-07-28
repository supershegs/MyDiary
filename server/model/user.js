/**
 * https://node-postgres.com/
 */
import { Client } from 'pg';

const client = new Client();

client.connect();
client.query('CREATE TABLE users(id SERIAL PRIMARY KEY not null, name TEXT, username VARCHAR(40), password TEXT');
client.end();
