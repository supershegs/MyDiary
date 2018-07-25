import request from 'request';
import EntriesModel, { entries } from '../server/model/EntriesModel';
import { closeServer } from '../server';
import moment from 'moment';
import uuidV4 from 'uuid/v4';
 
 const entryOne = { 
  id: uuidV4(),
  title: 'My new lodge', 
  story: 'My new home is located at',
  createdDate: moment(),
  modifiedDate: moment(),
};
const entryTwo = { 
  id: uuidV4(),
  title: 'My new car', 
  story: 'My new car is painted black',
  createdDate: moment(),
  modifiedDate: moment(),
};
const entryThree = { 
  id: uuidV4(),
  title: 'My new bag', 
  story: 'My new bag is expensive',
  createdDate: moment(),
  modifiedDate: moment(),
};
entries.push(entryOne, entryTwo);

const entriesUrl = 'http://localhost:3000/api/v1/entries';
const entryUrl = 'http://localhost:3000/api/v1/entries/:id';

describe('To POST an entry', () => {
  describe('GET /api/v1/entries', () => {
    const init = EntriesModel.add(entryThree);
    it('To add an entry', (done) => {
      request.post(entriesUrl, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(entryThree.id).not.toBe(init.id);
        expect(entryThree.title).toBe(init.title);
        expect(entryThree.story).toBe(init.story);
        expect(entryThree.createdDate).not.toBe(init.createdDate);
        expect(entryThree.modifiedDate).not.toBe(init.modifiedDate);
        done();
      });
    });
  });
});

describe('To GET all entries', () => {
  describe('GET /api/v1/entries', () => {
    const init = EntriesModel.findAll();
    const list = entries;
    it('To GET all entries', (done) => {
      request.post(entriesUrl, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(list).toBe(init);
        done();
      });
    });
  });
});
describe('To GET an entry', () => {
  describe('GET /api/v1/entries/:id', () => {
    const init = EntriesModel.findOne(entries[0].id);
    it('To GET an entry body', (done) => {
      request.post(entriesUrl, (error, response) => {
        expect(response.statusCode).toBe(200);
        expect(entries.id).toBeUndefined();
        expect(init.title).toBe('My new lodge');
        done();
      });
    });
  });
});
describe('To Edit an entry', () => {
  describe('GET /api/v1/entries/:id', () => {
    const init = EntriesModel.edit(entries[1].id, entries[1]);
    it('To PUT entry body', (done) => {
      request.put(entriesUrl, (error, response) => {
        expect(response.statusCode).toBe(404);
        console.log('Test passed');
        done();
      });
    });
  });
});

