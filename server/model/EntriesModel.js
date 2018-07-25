import moment from 'moment';
import uuidV4 from 'uuid/v4';

const entries = [];
class EntriesModel {
    add(data) {
        let entry = {
            id: uuidV4(),
            title: data.title,
            story: data.story,
            createdDate: moment(),
            modifiedDate: moment(),
        };  
        if (data.title === undefined || data.story === undefined) {
            entry = {};
            entries.push();
            console.log('Enter your tite and story');
        } else if (data.title && data.story) {
            console.log('entry');
            entries.push(entry); 
            console.log(entries);
        }                              
        return entry; 
    }

    findAll() {
        return entries;
    }

    findOne(id) {
        for (let i = 0; i < entries.length; i += 1) {
            if (entries[i].id === id) {
                return entries[i];
            }
        }
        return {};
    }

    edit(id, data) {
        for (let i = 0; i < entries.length; i += 1) {
            if (entries[i].id === id) {
                entries[i].title = data.title || entries[i].title;
                entries[i].story = data.story || entries[i].story;
                entries[i].modifiedDate = moment();
                return entries[i];
            }
            if (entries[i].id !== id) {
                console.log('entry not found');
                entries[i] = '';
            }
        }
        return {};
    }
}

export default new EntriesModel();
export { entries };
