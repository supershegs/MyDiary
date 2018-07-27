import EntryModel from '../model/EntriesModel';

const Entries = {
    /**
     * 
     * @param {object} request 
     * @param {object} response 
     * @return {object} response 
     */
    create(request, response) {
        const newEntry = EntryModel.add(request.body);
        if (request.body.title === undefined || request.body.story === undefined) {
            return response.send('Nothing was add');
        }
        return response.send(newEntry);
    },
    /**
     * 
     * @param {object} response
     * @return {object} response
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
     * 
     * @param {object} request  
     * @param {object} response
     * @return {object} response
     */
    update(request, response) {
        const editEntry = EntryModel.edit(request.params.id, request.body);
        return response.send({ editEntry });
    },
};

export default Entries;
