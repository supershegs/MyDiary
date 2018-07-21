
const Entries = {
    create(req, res) {
        return res.send({ message: 'Create an Entry' });
    },
    getAll(req, res) {
        return res.send({ message: 'Get All Entries' });
    },
    getOne(req, res) {
        return res.send({ message: 'Get One Entries' });
    },
    update(req, res) {
        return res.send({ message: 'Update One Entry' });
    },
    delete(req, res) {
        return res.send({ message: 'Delete an Entry' });
    },
};

export default Entries;
