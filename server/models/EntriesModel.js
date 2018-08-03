import moment from 'moment';
import uuidV4 from 'uuid/v4';
import { Client } from 'pg';
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

/**
 * Class representing a EntriesModel.
 */
class EntriesModel {
  /**
     * create a EntriesModel
     * @param {object} data
     */
  constructor(data) {
    this.entries = [];
  }
  /**
   * To Add object data-entry
   * @param {object} data
   * @return {object} entry
   */

  add(data) {
    const entry = {
      id: uuidV4(),
      title: data.title,
      story: data.story,
      createdDate: moment(),
      modifiedDate: moment(),
    };
    this.entries.push(entry);
    // const text = `INSERT INTO entries
    // (id, title, story,createdDate,modified)
    // VALUES($1, $2, $3, $4, $5) RETURNING *`;
    // const values = [entry.id, entry.title, entry.story, entry.createdDate, entry.modifiedDate];
    // client.query(text, values, (err, res) => {
    //   if (err) {
    //     console.log('Entry not inserted', err);
    //   } else {
    //     const result = res.rows;
    //     this.entries.push(result);
    //   }
    // });
    return entry;
  }
  /**
     * Get all entries
     * @return {object} entries
     */

  findAll() {
    return this.entries;
  }
  /**
     * get an entry with id
     * @param {string} id
     * @return {object} entryOne
     */

  findOne(id) {
    let entryOne = {};
    this.entries.forEach((entry, index) => {
      if (entry.id === id) {
        entryOne = entry;
      }
    });
    return entryOne;
  }
  /**
     *
     * To edit an entry with an id
     * @param {string} id
     * @param {object} data
     * @return {object} entryEdit
     */

  edit(id, data) {
    let entryEdit = {};
    this.entries.forEach((entry, index) => {
      if (entry.id === id) {
        entryEdit = entry;
        entryEdit.title = data.title || entryEdit.title;
        entryEdit.story = data.story || entryEdit.story;
        entryEdit.modifiedDate = moment();
      }
    });
    return entryEdit;
  }
  /**
   *
   * @param {object} id
   * @param {object} data
   */

  delete(id, data) {
    let deleteEdit = {};
    this.entries.forEach((entry, index) => {
      if (entry.id === id) {
        deleteEdit = entry;
        this.entries.splice(index, 1);
      }
    });
    return this.entries;
  }
}
export default new EntriesModel();
