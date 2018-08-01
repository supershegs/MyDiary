import { Client } from 'pg';
import dotenv from 'dotenv';
import uuidv4 from 'uuid/v4';
import bcrypt from 'bcrypt';

dotenv.config();
const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});

client.connect();

function hashing(password) {
  return bcrypt.hash(password, 10);
}
class Usermodel {
  constructor(data) {
    this.list = [];
  }

  users(data) {
    let user;
    hashing(data.password)
      .then((res) => {
        user = {
          id: uuidv4(),
          name: data.name,
          username: data.username,
          password: res,
        };
        const findUsername = 'SELECT * FROM users where username value $1';
        const val = [data.username];
        client.query(findUsername, val, (err) => {
          if (err) {
            console.log(data.username, 'is already in used');
          }
        });
        const text = `INSERT INTO users
        (id, name, username, password)
        VALUES($1, $2, $3, $4) RETURNING *`;
        const values = [user.id, user.name, user.username, user.password];
        client.query(text, values, (err, response) => {
          if (err) {
            console.log('Entry not inserted', err);
          } else {
            const result = response.rows;
            console.log('successfully save', result);
            this.list.push(result);
          }
        });
        return user;
      });
  }
}
export default new Usermodel();
