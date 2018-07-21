import moment from 'moment';
import uuidV4 from 'uuid/v4';

class EntriesModel {
    constructor(data) {
        this.entries = [];
    }

    add(data) {
        const entry = {
            id: uuidV4(),
            title: data.title,
            story: data.story,
            createdDate: moment(),
            modifiedDate: moment(),
         };
        this.entries.push(entry);
        return entry;
    }

    findAll() {
        return this.entries;
    }

    findOne(id) {
        for (let i = 0; i < this.entries; i += 1) {
            if (this.entries[i].id === id) {
                return this.entries[i];
            }
        }
        return {};
    }

    edit(id, data) {
        for (let i = 0; i < this.entries; i += 1) {
            if (this.entries[i].id === id) {
                this.entries[i].title = data.title || this.entries[i].title;
                this.entries[i].story = data.story || this.entries[i].story;
                this.entries[i].modifiedDate = moment();
                return this.entries[i];
            }
        }
        return {};
    }
}

export default new EntriesModel();
