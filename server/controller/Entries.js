import EntryModel from '../model/EntriesModel';

const Entries = {
  /**
   *
   * @param {object} request body
   * @param {object} response
   * @return {object} response  newEntry
   */
  create(request, response) {
    const newEntry = EntryModel.add(request.body);
    if (request.body.title === undefined || request.body.story === undefined) {
      throw new Error('Nothing was added');
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
