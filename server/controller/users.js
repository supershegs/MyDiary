import userModel, { dbSetting } from '../models/users';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';


dotenv.config();

const client = new Client(dbSetting);
client.connect();

const users = {
  createUser(request, response) {
    const { name, username, password } = request.body;
    const space = /\s/g;
    const usernameEdit = username.replace(space, '');
    const list = userModel.users(request.body);
    if (name.length === 0 || name === '') {
      return response.status(400).json({ error: 'Sign up failed check the your name' });
    }
    if (username.length === 0 || username === '') {
      return response.status(400).json({ error: 'Sign up failed check the your username' });
    }
    if (password.length === 0 || password === '') {
      return response.status(400).json({ error: 'Sign up failed, please fill the password' });
    }
    if (password.match(space)) {
      response.status(201).json('password has space but the space will be removed, successfully added');
    } else {
      client.query(`SELECT * from users WHERE username = '${usernameEdit}' `, (error, output) => {
        if (error) {
          throw new Error('error met', error);
        } if (output) {
          const findList = output.rows;
          if (findList.length > 0) {
            response.status(406).json({ message: 'username already in used' });
          } else if (findList.length < 0 || findList) {
            response.status(201).send('user successfully added');
          }
        }
      });
    }
    return request.body;
  },
  authUser(request, response) {
    const user = {
      username: request.body.username,
      password: request.body.password,
    };
    if (user.password === null || user.password === '') {
      response.status(401).json({ err: 'password empty' });
    } else if (user.username.length > 0 || user.password > 0) {
      client.query(`SELECT * from users WHERE username = '${user.username}' `, (err, result) => {
        if (err) {
          response.status(401).json({ error: 'Authentication Failed', err });
        } if (result) {
          const seen = result.rows;
          if (seen.length === 0) {
            response.status(401).json({ message: 'User Not Found, Failed' });
          } else if (seen.length > 0) {
            bcrypt.compare(user.password, seen[0].password, (error, accept) => {
              if (error) {
                response.status(401).json({
                  message: 'Failed',
                  status: error,
                });
              }
              if (accept === true) {
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
              } else if (accept === false) {
                response.status(401).json({ err: 'password failed' });
              }
            });
          }
        }
      });
    } else {
      response.status(401).json({ err: 'fail completely' });
    }
  },
};

export default users;
