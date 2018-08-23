import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';

const Request = supertest(app);

export default function entries() {
  const user = { username: 'test', password: 'test' };
  const entry = { title: 'new title', story: 'new story' };
  const notFound = 26;
  describe('POST /api/v1/entries/', () => {
    let token = '';
    let value;
    before((done) => {
      Request.post('/api/v1/auth/login')
        .send(user).end((err, res) => {
          if (res) {
            const { tokenKey, message, status } = res.body;
            token = tokenKey;
          }
          done();
        });
    });
    before((done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      Request.post('/api/v1/entries').set(authentication).send(entry)
        .end((err, res) => {
          value = res.body[0].id;
          expect(res.status).to.equal(201);
          expect(res.body).to.be.an('array');
          expect(res.body.length).to.equal(1);
          done();
        });
    });
    it('it should get all saved entries when a registered users is login', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      Request.get('/api/v1/entries').set(authentication)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('it should get a saved entry by it ID', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      Request.get(`/api/v1/entries/${value}`).set(authentication)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.be.an('object');
          done();
        });
    });
    it('it should not get an saved entry if not on user diary, Not Found', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      Request.get(`/api/v1/entries/${notFound}`).set(authentication)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('entry not found');
          done();
        });
    });
    it('A login in user should be able to edit his or her entry', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      const newEntry = { title: 'new modify title', story: 'new modify story' };
      Request.put(`/api/v1/entries/${value}`).set(authentication).send(newEntry)
        .end((error, res) => {
          expect(res.status).to.equal(201);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Edited successful, click on get to view');
          done();
        });
    });
    it('it should not edit is nothing was change when editing', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      const newEntry = { title: 'new modify title', story: 'new modify story' };
      Request.put(`/api/v1/entries/${value}`).set(authentication).send(newEntry)
        .end((error, res) => {
          expect(res.status).to.equal(200);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Nothing to modify because nothing was change');
          done();
        });
    });
    it('it should not edit if it is not on user diary', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      const newEntry = { title: 'new modify title', story: 'new modify story' };
      Request.put(`/api/v1/entries/${notFound}`).set(authentication).send(newEntry)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('entry can not be edited because it is not found');
          done();
        });
    });
    it('it should delete an entry if not needed again', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      Request.delete(`/api/v1/entries/${value}`).set(authentication)
        .end((error, res) => {
          expect(res.status).to.equal(202);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('Deleted successfully');
          done();
        });
    });
    it('it should not delete an entry if it is not on user diary, Not Found', (done) => {
      const authentication = { Authorization: `Bearer ${token}` };
      Request.delete(`/api/v1/entries/${notFound}`).set(authentication)
        .end((error, res) => {
          expect(res.status).to.equal(404);
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('entry can not be deleted because it is not found');
          done();
        });
    });
  });
}
