import chai, { expect, should } from 'chai';
import supertest from 'supertest';
import app from '../server';
import EntriesModel from '../server/model/EntriesModel';


const Request = supertest(app);

export default function getAnEntry() {
  describe('GET an entry /api/v1/entries/:id', () => {
    const list = EntriesModel.findAll();
    it('To get the entryId properties and if response ok', (done) => {
      Request.get(`/api/v1/entries/${list[3].id}`)
        .end((error, response, request) => {
          expect(response.status).to.be.equal(200);
          expect(response.body.id).to.be.a('string');
          expect(list[3].id).to.be.a('string');
          done();
        });
    });
    it('Expected entryId to be the selected entryId', (done) => {
      Request.get(`/api/v1/entries/${list[3].id}`)
        .end((error, response, request) => {
          expect(response.body.id).to.be.equal(list[3].id);
          done();
        });
    });
    it('Expected content to be the same with the one selected', (done) => {
      Request.get(`/api/v1/entries/${list[3].id}`)
        .end((error, response, request) => {
          expect(response.body.title).to.be.equal(list[3].title);
          expect(response.body.story).to.be.equal(list[3].story);
          done();
        });
    });
  });
}
