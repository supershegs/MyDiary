import chai, { expect } from 'chai';
import supertest from 'supertest';
import app, { closeServer } from '../server';
import EntriesModel from '../server/model/EntriesModel';

const Request = supertest(app);

export default function deleteEntry() {
  describe('DELETE /api/v1/entries/:id', () => {
    const list = EntriesModel.findAll();
    it('To delete an entry from the list', (done) => {
      const init = list.length;
      Request.delete(`/api/v1/entries/${list[5].id}`)
        .end((error, response) => {
          expect(response.status).to.be.equal(200);
          expect(init).to.be.greaterThan(list.length);
          done();
          closeServer();
        });
    });
  });
}
