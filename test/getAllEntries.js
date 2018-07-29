import chai, { expect, should } from 'chai';
import supertest from 'supertest';
import app from '../server';
import EntriesModel from '../server/model/EntriesModel';

const Request = supertest(app);

export default function getAllEntries() {
  describe('GET All Entries - GET /api/v1/entries', () => {
    // Use this to add multiple entries
    EntriesModel.add({ title: 'entry1', story: 'entry1 story' });
    EntriesModel.add({ title: 'entry2', story: 'entry2 story' });
    EntriesModel.add({ title: 'entry3', story: 'entry3 story' });
    it('To get entries length and if it reponse status is ok', (done) => {
      Request.get('/api/v1/entries')
        .end((error, response) => {
          const list = EntriesModel.findAll();
          expect(response.status).to.be.equal(200);
          expect(response.body.length).to.be.equal(list.length);
          done();
        });
    });
    it('To get entries properties', (done) => {
      Request.get('/api/v1/entries')
        .end((error, response) => {
          const list = EntriesModel.findAll();
          expect(list).to.be.an('array');
          expect(response.body).to.be.an('array');
          done();
        });
    });
    it('To get GET entries checked for correct values ', (done) => {
      Request.get('/api/v1/entries')
        .end((error, response) => {
          const list = EntriesModel.findAll();
          expect(response.body.id).to.be.equal(list.id);
          expect(response.body.title).to.be.equal(list.title);
          expect(response.body.story).to.be.equal(list.story);
          done();
        });
    });
  });
}
