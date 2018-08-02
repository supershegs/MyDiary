import { Client } from 'pg';
import dotenv from 'dotenv';
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
  static users(data) {
    let users;
    hashing(data.password)
      .then((res) => {
        const user = {
          id: data.id,
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
              }
            });
          }
        } else {
          throw new Error('invalid input');
        }
      });
  }
}
export default Usermodel;
export { client };
