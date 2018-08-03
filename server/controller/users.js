import userModel from '../models/users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';


dotenv.config();

const client = new Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: process.env.DB_PORT,
});
client.connect();

const users = {
  createUser(request, response) {
    const user = userModel.users(request.body);
    const name = request.body.username;
    const pass = request.body.password;
    if (name.length === 0 || request.body.name.length === 0) {
      return response.status(404).json({ error: 'Sign up failed check the your username' });
    } if (pass.length === 0) {
      return response.status(404).json({ error: 'Sign up failed, please fill the password' });
    }
    response.status(201).json({ message: 'Successfully added' });
    return user;
  },
  authUser(request, response) {
    const user = {
      username: request.body.username,
      password: request.body.password,
    };
    if (user.username.length > 0 || user.password > 0) {
      client.query(`SELECT * from users WHERE username = '${user.username}' `, (err, result) => {
        if (err) {
          response.status(404).json({ error: 'Authentication Failed', err });
        } if (result) {
          const seen = result.rows;
          if (seen.length === 0 || !seen[0].password) {
            response.status(404).json({ message: 'Not Found' });
          } else if (seen.length > 0) {
            bcrypt.compare(user.password, seen[0].password, (error, accept) => {
              if (error) {
                response.status(404).json({
                  message: 'not added',
                  status: error,
                });
              }
              if (accept) {
                const token = jwt.sign({
                  username: seen[0].username,
                  id: seen[0].id,
                }, process.env.SECRET_JWT_KEY,
                {
                  expiresIn: '1h',
                });
                response.status(201).json({
                  message: 'Authentication Passed',
                  status: accept,
                  token_key: token,
                });
              }
            });
          }
        }
      });
    }
  },
};

export default users;
