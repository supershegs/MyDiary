import request from 'request';
import entryModelTest from '../server/model/EntriesModel';
import { closeServer } from '../server';


const entriesUrl = 'http://localhost:3000/api/v1/entries';
const entryUrl = 'http://localhost:3000/api/v1/entries/:id';
describe('To post an entry', () => {
  describe('GET /api/v1/entries', () => {
    it('To Add an entry body', (done) => {
      request.post(entriesUrl, (error, response, data) => {
        const entriesAdd = entryModelTest.add(data);  
        const content = '';
        expect(content).toEqual(entriesAdd);
        console.log('Test passed');
        done();
      });
    });
  });
});
describe('To get all entries ', () => {
  describe('GET /api/v1/entries', () => {
    it('To get All entries body', (done) => {
      request.get(entriesUrl, (error, response) => {
        const entriesGetAll = entryModelTest.findAll();  
        const content = ['', ''];
        expect(content).toEqual(entriesGetAll);
        console.log('Test passed');
        done();
      });
    });
  });
});
describe('To get an entry server', () => {
  describe('GET /api/v1/entries/:id', () => {
    it('To get an entry', (done) => {
      request.get(entryUrl, (error, response, id) => {
        const getAnEntry = entryModelTest.findOne(id);  
        const content = {};
        expect(content).toEqual(getAnEntry);
        console.log('Test passed');
        done();
      });
    });
  });
});
describe('To put an entry server', () => {
  describe('GET /api/v1/entries/:id', () => {
    it('To edit entry', (done) => {
      request.put(entryUrl, (error, response, id, data) => {
        const getEdit = entryModelTest.edit(id, data);  
        const content = {};
        expect(content).toEqual(getEdit);
        console.log('Test passed');
        closeServer();
        done();
      });
    });
  });
});
