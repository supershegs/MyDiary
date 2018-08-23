import { Client } from 'pg';
import jwt from 'jsonwebtoken';
import entryQuery from '../../connection/entriesDb';
import dotenv from 'dotenv';
import tokenAuthentication from '../middleware/tokenAuth';


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
    const decode = tokenAuthentication.token(request, response);
    const { id } = decode;
    const { title, story } = request.body;
    const values = [title, story];
    client.query(entryQuery.createEntryQuery, [title, story, id], (err, res) => {
      if (err) {
        response.status(404).json({ error: err });
      } else {
        const result = res.rows;
        response.status(201).json(result);
      }
    });
  },
  getUserEntries(request, response) {
    const decode = tokenAuthentication.token(request, response);
    client.query(`SELECT * FROM entries where user_id = '${decode.id}' `, (error, res) => {
      if (error) {
        response.status(404).json({ err: error });
      } else {
        const allUserEntries = res.rows;
        response.status(200).json({ message: allUserEntries });
      }
    });
  },
  getOne(request, response) {
    const decode = tokenAuthentication.token(request, response);
    if (decode) {
      client.query(`SELECT * FROM entries where id = '${request.params.id}'
        AND user_id = '${decode.id}'`, (error, res) => {
        if (error) {
          response.status(404).json(error);
        } if (res) {
          const anEntry = res.rows;
          if (anEntry.length > 0) {
            response.status(200).json({ message: anEntry });
          }
          if (anEntry.length === 0) {
            response.status(404).json({ message: 'entry not found' });
          }
        }
      });
    }
  },
  update(request, response) {
    const decode = tokenAuthentication.token(request, response);
    if (decode) {
      const { title, story } = request.body;
      client.query(`SELECT * FROM entries where 
          id = '${request.params.id}' AND title = '${title}'
          AND story = '${story}' AND user_id = '${decode.id}'`, (err, data) => {
        if (err) {
          response.status(404).json({ error: err });
        }
        if (data) {
          const list = data.rows;
          if (list.length > 0) {
            response.status(200).json({ message: 'Nothing to modify because nothing was change' });
          }
          if (list.length === 0) {
            client.query(`UPDATE entries SET title = '${title}', story = '${story}' 
              where id = '${request.params.id}'  AND user_id = '${decode.id}'`, (error, res) => {
              if (error) {
                response.status(404).json({ err: error });
              } if (res) {
                const editEntry = res.rowCount;
                if (editEntry > 0) {
                  response.status(201).json({ message: 'Edited successful, click on get to view' });
                }
                if (editEntry === 0) {
                  response.status(404).json({ message: 'entry can not be edited because it is not found' });
                }
              }
            });
          }
        }
      });
    }
  },
  remove(request, response) {
    const decode = tokenAuthentication.token(request, response);
    if (decode) {
      const { title, story } = request.body;
      client.query(`DELETE FROM entries where id = '${request.params.id}'
          AND user_id = '${decode.id}'`, (error, res) => {
        if (error) {
          response.status(404).json({ err: error });
        } if (res) {
          const deleteEntry = res.rowCount;
          if (deleteEntry > 0) {
            response.status(202).json({ message: 'Deleted successfully' });
          }
          if (deleteEntry === 0) {
            response.status(404).json({ message: 'entry can not be deleted because it is not found' });
          }
        }
      });
    }
  },
};
export default Entries;
