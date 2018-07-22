import request from 'request';
import { closeSever } from '../server';
import entryModelTest from '../server/model/EntriesModel';

const entriesUrl = 'http://localhost:3000/api/v1/entries';
const entryUrl = 'http://localhost:3000/api/v1/entries/:id';
describe('To test entries server', () => {
  describe('GET /api/v1/entries', () => {
    it('to perform get all entries', (done) => {
      request.get(entriesUrl, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it('to get all entries body', (done) => {
      request.get(entriesUrl, (error, response, body) => {
        expect(body).toBe(entryModelTest.findAll());
        done();
      });
    });
  });
});
describe('To post entries server', () => {
  describe('GET /api/v1/entries', () => {
    it('to post an entry', (done) => {
      request.get(entriesUrl, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it('to pass the post entry body', (done) => {
      request.post(entriesUrl, (error, response, body, data) => {
        expect(body).toBe(entryModelTest.add(data));
        done();
      });
    });
  });
});
describe('GET /api/v1/entries/id', () => {
  it('to perform add entry', (done) => {
    request.get(entriesUrl, (error, response, body) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('to get an entry body', (done) => {
      request.get(entriesUrl, (error, response, body, id) => {
        expect(body).toBe(entryModelTest.findOne(id));
        done();
    });
  });
});
describe('GET /api/v1/entries/id', () => {
  it('to perform edit on an entry', (done) => {
    request.get(entriesUrl, (error, response, body) => {
      expect(response.statusCode).toBe(200);
      done();
    });
  });
  it('to get the edited entry body', (done) => {
      request.put(entriesUrl, (error, response, body, id, data) => {
        expect(body).toBe(entryModelTest.edit(id, data));
        done();
    });
  });
});