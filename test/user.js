import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';

const Request = supertest(app);
// const users = supertest.agent(app);

export default function userTest() {
  const users = {
    name: 'samuel dwell',
    username: 'samdwell',
    password: 'admin',
  };
  describe('POST /signup', () => {
    it('sign up reponse and content', () => {
      before((done) => {
        Request.post('/api/v1/auth/signup')
          .send(users).end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.password).to.be.a('string');
            expect(res.body.username).to.equal(users.username);
            expect(res.body.name).to.equal(users.name);
          });
      });
    });
  });
  describe('POST /login', () => {
    it('sign ip reponse and content', () => {
      const user = { username: 'samdwell', password: 'admin' };
      before((done) => {
        Request.post('/api/v1/auth/login')
          .send(user).end((err, res) => {
            expect(res.statusCode).to.equal(200);
            expect(res.body).to.be.an('object');
            expect(res.body.password).to.be.a('string');
            expect(res.body.username).to.equal(users.username);
          });
      });
    });
  });
  describe('POST /login', () => {
    const user = { username: 'samdwell', password: 'admin' };
    it('The login details', (done) => {
      Request.post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          expect(user.username).to.equal('samdwell');
          expect(user.password).to.equal('admin');
          done();
        });
    });
  });
}
