import EntryQueries from '../models/EntriesModel';
import { Client } from 'pg';
import jwt from 'jsonwebtoken';
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
const Entries = {
  create(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    // const decode = jwt.verify(request.body.token, process.env.SECRET_JWT_KEY);
    const decode = jwt.verify(token, process.env.SECRET_JWT_KEY);
    const { id } = decode;
    const { title, story } = request.body;
    const values = [title, story];
    client.query(EntryQueries.createEntryQuery, [title, story, id], (err, res) => {
      if (err) {
        response.status(404).json({ error: err });
      } else {
        const result = res.rows;
        response.status(201).json(result);
      }
    });
  },
  getUserEntries(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_JWT_KEY, (err, result) => {
      if (err) {
        response.status(404).json(err);
      } else {
        client.query(`SELECT * FROM entries where user_id = '${result.id}' `, (error, res) => {
          if (error) {
            response.status(201).json({ err: error });
          } else {
            const allUserEntries = res.rows;
            response.status(201).json({ message: allUserEntries });
          }
        });
      }
    });
  },
  getAll(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_JWT_KEY, (err, result) => {
      if (err) {
        response.status(201).json(err);
      } else {
        client.query('SELECT * FROM entries', (error, res) => {
          if (error) {
            response.status(201).json(error);
          } else {
            const allEntries = res.rows;
            response.status(201).json({ message: allEntries });
          }
        });
      }
    });
  },
  // }
  //   /**
  //    * @param {object} request
  //    * @param {object} response
  //    * @return {object} response
  //    */

  getOne(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_JWT_KEY, (err, result) => {
      if (err) {
        response.status(201).json(err);
      } else {
        client.query(`SELECT * FROM entries where id = '${request.params.id}'`, (error, res) => {
          if (error) {
            response.status(201).json(error);
          } else {
            const anEntry = res.rows;
            response.status(201).json({ message: anEntry });
          }
        });
      }
    });
  },
  //   /**
  //    * @param {object} request id
  //    * @param {object} request body
  //    * @param {object} response
  //    * @return {object} response editEntry
  //    */
  update(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_JWT_KEY, (err, result) => {
      if (err) {
        response.status(404).json({ error: err });
      } else {
        const { title, story } = request.body;
        client.query(`UPDATE entries SET title = '${title}', story = '${story}' 
        where id = '${request.params.id}'`, (error, res) => {
          if (error) {
            response.status(404).json({ err: error });
          } else {
            const editEntry = res.rows;
            response.status(201).json({ message: 'Edited successful, click on get to view' });
          }
        });
      }
    });
  },
  //   /**
  //    *
  //    * @param {object} request id
  //    * @param {object} request body
  //    * @param {*} response deleteEntry
  //    */
  remove(request, response) {
    const token = request.headers.authorization.split(' ')[1];
    const decode = jwt.verify(token, process.env.SECRET_JWT_KEY, (err, result) => {
      if (err) {
        response.status(404).json({ error: err });
      } else {
        const { title, story } = request.body;
        client.query(`DELETE FROM entries where id = '${request.params.id}'`, (error, res) => {
          if (error) {
            response.status(404).json({ err: error });
          } else {
            response.status(201).json({ message: 'Deleted successfully' });
          }
        });
      }
    });
  },
};
export default Entries;
