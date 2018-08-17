import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';
import { Client } from 'pg';
import dotenv from 'dotenv';
import users from '../migrations/users';
import entries from '../migrations/entries';
import notify from '../migrations/notify';


dotenv.config();
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
const wrongClient = new Client({
  user: process.env.DB_USER_wrong,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

const Request = supertest(app);

export default function dbConnet() {
  describe('database connection', () => {
    it('should connect to database with correct connection details', (done) => {
      client.connect(done);
    });
    it('should not connect to database with wrong connection details', (done) => {
      wrongClient.connect((err, res) => {
        expect(err);
        done();
      });
    });
  });
  describe('database tables creation', () => {
    it('should create a table if no table exist', (done) => {
      client.query(`${users}; ${entries}; ${notify}`, (err, res) => {
        expect(res);
        done();
      });
    });
  });
}
export { client };
