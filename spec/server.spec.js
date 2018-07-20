import request from 'request';
import { closeSever } from '../server';

const versionOneUrl = 'http://localhost:3000/api/v1';
const versionTwoUrl = 'http://localhost:3000/api/v2';
describe('version one Api server', () => {
  describe('GET /api/v1', () => {
    it('return version one status code', (done) => {
      request.get(versionOneUrl, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it('returning version one ok', (done) => {
      request.get(versionOneUrl, (error, response, body) => {
        expect(body).toBe('version one ok');
        done();
      });
    });
  });
});
describe('version two Api server', () => {
  describe('GET /api/v2', () => {
    it('return version two status code', (done) => {
      request.get(versionTwoUrl, (error, response, body) => {
        expect(response.statusCode).toBe(202);
        done();
      });
    });
    it('returning version two ok', (done) => {
      request.get(versionTwoUrl, (error, response, body) => {
        expect(body).toBe('version two ok');
        closeSever();
        done();
      });
    });
  });
});