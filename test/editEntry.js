import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';
import EntriesModel from '../server/model/EntriesModel';

const Request = supertest(app);

export default function editEntry() {
  describe('PUT /api/v1/entries/:id', () => {
    const list = EntriesModel.findAll();
    it('To edit an entry id type and response status', (done) => {
      Request.put(`/api/v1/entries/${list[4].id}`)
        .send({ title: 'updated title', story: 'updated story' })
        .end((error, response) => {
          expect(response.status).to.be.equal(200);
          expect(response.body.editEntry.id).to.be.a('string');
          expect(response.body.editEntry.id).to.be.equal(list[4].id);
          expect(response.body.editEntry.title).to.be.equal('updated title');
          expect(response.body.editEntry.story).to.be.equal('updated story');
          expect(response.body.editEntry.title).to.be.equal(list[4].title);
          expect(response.body.editEntry.story).to.be.equal(list[4].story);
          done();
        });
    });
  });
}
