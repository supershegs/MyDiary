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
    const decode = jwt.verify(request.body.token, process.env.SECRET_JWT_KEY);
    const { id } = decode;
    const { title, story } = request.body;
    const values = [title, story];
    client.query(EntryQueries.createEntryQuery, [title, story, id], (err, res) => {
      if (err) {
        throw new Error('Entry not inserted', err);
      } else {
        const result = res.rows;
        response.status(201).json(result);
      }
    });
  },
  getAll(request, response) {
    // console.log(id);
    client.query(EntryQueries.getEntriesQuery, (err, res) => {
      if (err) {
        throw new Error('Entry not inserted', err);
      } else {
        const result = res.rows;
        response.status(201).json({ message: result });
      }
    });
  },
//   /**
//    * @param {object} request
//    * @param {object} response
//    * @return {object} response
//    */

//   getOne(request, response) {
//     const anEntry = EntryModel.findOne(request.params.id);
//     return response.send(anEntry);
//   },

//   /**
//    * @param {object} request id
//    * @param {object} request body
//    * @param {object} response
//    * @return {object} response editEntry
//    */
//   update(request, response) {
//     const editEntry = EntryModel.edit(request.params.id, request.body);
//     return response.send({ editEntry });
//   },
//   /**
//    *
//    * @param {object} request id
//    * @param {object} request body
//    * @param {*} response deleteEntry
//    */
//   remove(request, response) {
//     const deleteEntry = EntryModel.delete(request.params.id, request.body);
//     return response.send({ deleteEntry });
//   },
};

export default Entries;
