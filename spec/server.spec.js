import request from 'request';
import { closeSever } from '../server/server';

const baseUrl = 'http://localhost:3000/';
describe('Api server', () => {
  describe('GET /', () => {
    it('return status code', (done) => {
      request.get(baseUrl, (error, response, body) => {
        expect(response.statusCode).toBe(200);
        done();
      });
    });
    it('returning Api is now running', (done) => {
      request.get(baseUrl, (error, response, body) => {
        expect(body).toBe('API now is running');
        closeSever();
        done();
      });
    });
  });
});
