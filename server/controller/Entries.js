import EntryModel from '../model/EntriesModel';

const Entries = {
    create(req, res) {
        const newEntry = EntryModel.add(req.body);
        console.log(req.body);
        return res.send(newEntry);
    },
    getAll(req, res) {
        const allEntries = EntryModel.findAll();
        return res.send(allEntries);
    },
    getOne(req, res) {
        console.log(req.params.id);
        const anEntry = EntryModel.findOne(req.params.id);
        return res.send(anEntry);
    },
    update(req, res) {
        const editEntry = EntryModel.edit(req.params.id, req.body);
        return res.send({ editEntry });
    },
};

export default Entries;
