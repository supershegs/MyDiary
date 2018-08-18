import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';

const Request = supertest(app);
const newUser = {
  name: 'testing',
  username: 'testing',
  password: 'testing',
};
const user = { username: 'test', password: 'test' };
export function authentication() {
  let token;
  describe('POST /api/v1/auth/login', () => {
    before((done) => {
      it('it should create toke with correct login detials', () => {
        Request.post('/api/v1/auth/login')
          .send(user).end((err, res) => {
            if (err) {
              throw err;
            } else if (res) {
              const { tokenKey, message, status } = res.body;
              token = tokenKey;
            }
          });
      });
      done();
    });
    it('it should successfully login with the right register user and successful create a token for the user',
      (done) => {
        Request.post('/api/v1/auth/login').send(user)
          .end((error, response) => {
            expect(response.status).to.equal(201);
            expect(response.body).to.be.an('object');
            expect(response.body).to.have.property('tokenKey');
            expect(response.body).to.have.property('message');
            expect(response.body).to.have.property('status');
            done();
          });
      });
    it('if not a register user but trying to login, Unauthorized', (done) => {
      Request.post('/api/v1/auth/login').send(newUser)
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.have.property('message');
          expect(response.body.message).to.equal('User Not Found, Failed');
          done();
        });
    });
    it('if username slot is not fill when login is clicked, Forbidden', (done) => {
      Request.post('/api/v1/auth/login').send({ username: '', password: 'test' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('err');
          expect(response.body.err).to.equal('username is empty');
          done();
        });
    });
    it('if password slot is not fill when login is clicked, Forbidden', (done) => {
      Request.post('/api/v1/auth/login').send({ username: 'test', password: '' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.body).to.have.property('err');
          expect(response.body.err).to.equal('password is empty');
          done();
        });
    });
    it('if wrong password was supply, Unacceptable', (done) => {
      Request.post('/api/v1/auth/login').send({ username: 'test', password: 'tes' })
        .end((error, response) => {
          expect(response.status).to.equal(401);
          expect(response.body).to.have.property('err');
          expect(response.body.err).to.equal('wrong password, check your password');
          done();
        });
    });
  });
}
export default function register() {
  describe('POST To Test /api/v1/auth/signup', () => {
    it('To the signup route response status and to make sure it created successfully', (done) => {
      Request.post('/api/v1/auth/signup').send(newUser).end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response).to.be.an('object');
        done();
      });
    });
    it('To sent a message that user successfully added after creating user', (done) => {
      Request.post('/api/v1/auth/signup').send(newUser).end((error, response, request, body) => {
        expect(response.text).to.equal('user successfully added');
        expect(response.body).to.be.an('object');
        expect(request).to.equal(undefined);
        done();
      });
    });
    it('if user already exist when using the same used username ', (done) => {
      const existingUser = {
        name: 'test',
        username: 'test',
        password: 'test',
      };
      Request.post('/api/v1/auth/signup').send(existingUser).end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.text).to.equal('{"message":"username already in used"}');
        done();
      });
    });
    it('if name is empty expected it to be fordidden request', (done) => {
      Request.post('/api/v1/auth/signup').send({ name: '', username: 'testing', password: 'testing' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('{"error":"Sign up failed check the your name"}');
          done();
        });
    });
    it('if username is empty expected it to be forbidden request', (done) => {
      Request.post('/api/v1/auth/signup').send({ name: 'testing', username: '', password: 'testing' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('{"error":"Sign up failed check the your username"}');
          done();
        });
    });
    it('if password is empty expected it to be forbidden request', (done) => {
      Request.post('/api/v1/auth/signup').send({ name: 'testing', username: 'testing', password: '' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('{"error":"Sign up failed, please fill the password"}');
          done();
        });
    });
  });
}
