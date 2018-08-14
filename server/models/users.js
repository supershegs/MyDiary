import { Client } from 'pg';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import uuidv4 from 'uuid/v4';
import { isNullOrUndefined } from 'util';

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
        client.query(`SELECT * from users WHERE username = '${user.username}' `, (error, output) => {
          if (error) {
            throw new Error('error met', error);
          }
          if (output) {
            const findList = output.rows;
            if (findList.length > 0) {
              throw new Error('username already in use');
            } else if (findList.length < 0 || findList) {
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
                    }
                  });
                }
              } else {
                throw new Error('invalid input');
              }
            }
          }
        });
        return users;
      });
  }
}
export default Usermodel;
export { client };
