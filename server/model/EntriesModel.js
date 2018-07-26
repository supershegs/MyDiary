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
        } else if (data.title && data.story) {
            entries.push(entry); 
        }                              
        return entry; 
    }

    findAll() {
        return entries;
    }

    findOne(id) {
        for (const entry of entries) {
            if (entry.id === id) {
                return entry;
            }     
        }   
        return {};   
    }

    edit(id, data) {
        for (let entry of entries) {
            if (entry.id === id) {
                entry.title = data.title || entry.title;
                entry.story = data.story || entry.story;
                entry.modifiedDate = moment();
                return entry;
            }
            if (entry.id !== id) {
                entry = '';
            }
        }
        return {};
    }
}

export default new EntriesModel();
export { entries };
