import chai, { expect } from 'chai';
import request from 'request';
import app from '../server';
import dbConnect from './dbconnection';
import entries from './entries';
import register, { authentication } from './auth';
// import getAllEntries from './getAllEntries';
// import getAnEntry from './getAnEntry';
// import editEntry from './editEntry';
// import deleteEntry from './deleteEntry';

const urlVer1 = 'http://localhost:3000/api/v1';
const urlVer2 = 'http://localhost:3000/api/v2';
const urlNO = 'http://localhost:3000/api/v1/cool';
const authUrl = 'http://localhost:3000/api/v1/auth';

describe('GET /api/v1', () => {
  it('To test version response status', (done) => {
    request.get(urlVer1, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('The response body should be version one is ok', (done) => {
    request.get(urlVer1, (error, response, body) => {
      expect(body).to.equal('version one is ok');
      done();
    });
  });
});
describe('GET /api/v2', () => {
  it('version two response status', (done) => {
    request.get(urlVer2, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('The response body should be not yet available', (done) => {
    request.get(urlVer2, (error, response, body) => {
      expect(body).to.equal('version two not yet available');
      done();
    });
  });
});
describe('GET /api/v1/cool', () => {
  it('url link not in v1 or v2 response status', (done) => {
    request.get(urlNO, (error, response, body) => {
      expect(response.statusCode).to.equal(404);
      done();
    });
  });
  it('The response body should be error message', (done) => {
    request.get(urlNO, (error, response, body) => {
      expect(body).to.equal('{"error":{"message":"Not found"}}');
      done();
    });
  });
});
describe('GET /api/v1/auth', () => {
  it('Authentication test', (done) => {
    request.get(authUrl, (error, response, body) => {
      expect(response.statusCode).to.equal(200);
      done();
    });
  });
  it('To test version response body(content)', (done) => {
    request.get(authUrl, (error, response, body) => {
      expect(body).to.equal('{"message":"Authictaion is working"}');
      done();
    });
  });
});
dbConnect();
entries();
authentication();
register();
// getAllEntries();
// getAnEntry();
// editEntry();
// deleteEntry();
