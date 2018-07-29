import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';

const Request = supertest(app);
const entry = {
  title: 'My new lodge',
  story: 'My new home is located at',
};

export default function addEntry() {
  describe('Api entry test', () => {
    let inputEntryId = '';
    before((done) => {
      it('Adding file successful', () => {
        Request.post('/api/v1/entries')
          .send(entry)
          .end((error, request) => {
            inputEntryId = request.body.id;
            expect(inputEntryId).to.equal(request.body.id);
          });
      });
      done();
    });
    describe('POST /entries', () => {
      it('Add an entry type and status', (done) => {
        Request.post('/api/v1/entries')
          .send(entry)
          .end((error, response) => {
            expect(response.status).to.equal(200);
            expect(response.body).to.be.an('object');
            done();
          });
      });
      it('The entry properties', (done) => {
        Request.post('/api/v1/entries')
          .send(entry)
          .end((error, response) => {
            expect(response.body).to.have.property('id');
            expect(response.body).to.have.property('title');
            expect(response.body).to.have.property('story');
            done();
          });
      });
      it('The entry properties type', (done) => {
        Request.post('/api/v1/entries')
          .send(entry)
          .end((error, response) => {
            expect(response.body.id).to.be.a('string');
            expect(response.body.title).to.be.a('string');
            expect(response.body.story).to.be.a('string');
            done();
          });
      });
      it('The entry content', (done) => {
        Request.post('/api/v1/entries')
          .send(entry)
          .end((error, response) => {
            expect(entry.id).to.be.an('undefined');
            expect(response.body.title).to.equal(entry.title);
            expect(response.body.story).to.be.equal(entry.story);
            done();
          });
      });
    });
  });
}
