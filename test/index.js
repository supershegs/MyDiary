import chai, { expect } from 'chai';
import request from 'request';
import app from '../server';
import userTest from './user';
// import addEntry from './addEntry';
// import getAllEntries from './getAllEntries';
// import getAnEntry from './getAnEntry';
// import editEntry from './editEntry';
// import deleteEntry from './deleteEntry';

const url = 'http://localhost:3000/api/v1';
const urlHigher = 'http://localhost:3000/api/v2';
const urlNO = 'http://localhost:3000/api/v1/cool';

describe('GET /api/v1', () => {
  it('To test version response status', (done) => {
    request.get(url, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('To test version response body', (done) => {
    request.get(url, (error, response, body) => {
      expect(body).to.equal('version one is ok');
      done();
    });
  });
});
describe('GET /api/v2', () => {
  it('if not in version one', (done) => {
    request.get(urlNO, (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('if not in verion error check', (done) => {
    request.get(urlHigher, (error, response, body) => {
      expect(error).to.equal(null);
      expect(body).to.equal('{"error":{"message":"Not found"}}');
      done();
    });
  });
});
describe('GET /api/v2', () => {
  it('if it is a higher version', (done) => {
    request.get(urlHigher, (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('if it is a higher verion error check', (done) => {
    request.get(urlHigher, (error, response, body) => {
      expect(error).to.equal(null);
      expect(body).to.equal('{"error":{"message":"Not found"}}');
      done();
    });
  });
});
userTest();
// addEntry();
// getAllEntries();
// getAnEntry();
// editEntry();
// deleteEntry();
