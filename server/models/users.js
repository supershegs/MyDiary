import { Client } from 'pg';
import dotenv from 'dotenv';
import uuidv4 from 'uuid/v4';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { throws } from 'assert';

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
  static users(data) {
    let users;
    hashing(data.password)
      .then((res) => {
        const user = {
          id: uuidv4(),
          name: data.name,
          username: data.username,
          password: res,
        };
        const text = `INSERT INTO users
        (id, name, username, password)
        VALUES($1, $2, $3, $4) RETURNING *`;
        const values = [user.id, user.name, user.username, user.password];
        if (data.username.length > 0 || data.password > 0) {
          if (data.name.length > 0) {
            client.query(text, values, (err, result) => {
              if (err) {
                throw new Error(err);
              } else {
                users = (result.rows);
                return users;
              // const token = jwt.sign({ response.ro, process.env.SECRET_KEY});
              }
            });
          }
        } else {
          throw new Error('invalid input');
        }
      });
  }

  static signin(data) {
    const user = {
      username: data.username,
      password: data.password,
    };
    if (data.username.length > 0 || data.password > 0) {
      client.query(`SELECT * from users WHERE username = '${data.username}' `, (err, res) => {
        if (err) {
          throw new Error('not found');
        } else {
          const seen = res.rows;
          console.log('5', seen[0].username);
          if (seen.length === 0 || !seen[0].password) {
            throw new Error('Authentication failed');
          } else if (seen.length > 0) {
            bcrypt.compare(data.password, seen[0].password)
              .then((error, result) => {
                if (error) {
                  throw new Error('not an hashed password', error);
                }
                if (result) {
                  console.log('successfully compared', result);
                }
              });
          }
        }
      });
    }
  }
}
export default Usermodel;
export { client };
