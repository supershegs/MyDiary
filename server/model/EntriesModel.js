

class EntriesModel {
    constructor() {
        this.entries = [
            {
                id: '',
                title: '',
                date: '',
                story: '',
            },
        ];
    }

    add(entry) {
        this.entries.push(entry);
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
}