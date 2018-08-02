import EntryModel from '../models/EntriesModel';

const Entries = {
  /**
   *
   * @param {object} request body
   * @param {object} response
   * @return {object} response  newEntry
   */
  create(request, response) {
    const newEntry = EntryModel.add(request.body);
    const { title, story } = request.body;
    if (title === undefined || story === undefined) {
      throw new Error('Nothing was added');
    }
    if (title.length === 0 || story.length === 0) {
      throw new Error('No value for the database');
    }
    return response.send(newEntry);
  },
  /**
   *
   * @param {object} response
   * @return {object} response allEntries
   */
  getAll(request, response) {
    const allEntries = EntryModel.findAll();
    return response.send(allEntries);
  },
  /**
   * @param {object} request
   * @param {object} response
   * @return {object} response
   */

  getOne(request, response) {
    const anEntry = EntryModel.findOne(request.params.id);
    return response.send(anEntry);
  },

  /**
   * @param {object} request id
   * @param {object} request body
   * @param {object} response
   * @return {object} response editEntry
   */
  update(request, response) {
    const editEntry = EntryModel.edit(request.params.id, request.body);
    return response.send({ editEntry });
  },
  /**
   *
   * @param {object} request id
   * @param {object} request body
   * @param {*} response deleteEntry
   */
  remove(request, response) {
    const deleteEntry = EntryModel.delete(request.params.id, request.body);
    return response.send({ deleteEntry });
  },

};

export default Entries;
