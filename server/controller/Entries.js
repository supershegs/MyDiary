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
    return response.status(200).send(newEntry);
  },
  /**
   *
   * @param {object} response
   * @return {object} response
   */
  getAll(request, response) {
    const allEntries = EntryModel.findAll();
    return response.status(200).send(allEntries);
  },
  /**
   * @param {object} request
   * @param {object} response
   * @return {object} response
   */

  getOne(request, response) {
    const anEntry = EntryModel.findOne(request.params.id);
    return response.status(200).send(anEntry);
  },

  /**
   * @param {object} request id
   * @param {object} request body
   * @param {object} response
   * @return {object} response editEntry
   */
  update(request, response) {
    const editEntry = EntryModel.edit(request.params.id, request.body);
    return response.status(200).send({ editEntry });
  },

};

export default Entries;
