import chai, { expect } from 'chai';
import supertest from 'supertest';
import app from '../server';
import userModel from '../server/models/users';


const Request = supertest(app);
const user = {
  name: 'testing',
  username: 'testing',
  password: 'testing',
};
export default function authentication() {
  describe('POST To Test /api/v1/auth/signup', () => {
    const count = ['count'];
    it('To the signup route response status and to make sure it created successfully', () => {
      Request.post('/api/v1/auth/signup').send(user).end((error, response) => {
        expect(response.status).to.equal(201);
        expect(response).to.be.an('object');
      });
    });
    it('To sent a message that user successfully added after creating user', (done) => {
      Request.post('/api/v1/auth/signup').send(user).end((error, response, request, body) => {
        expect(response.text).to.equal('user successfully added');
        expect(response.body).to.be.an('object');
        expect(request).to.equal(undefined);
        done();
      });
    });
    it('if user already exist when using the same used username ', (done) => {
      Request.post('/api/v1/auth/signup').send({
        name: 'test',
        username: 'test',
        password: 'test',
      }).end((error, response) => {
        expect(response.status).to.equal(406);
        expect(response.text).to.equal('{"message":"username already in used"}');
        done();
      });
    });
    it('if name is empty expected it to be fordidden request', (done) => {
      Request.post('/api/v1/auth/signup').send({ name: '', username: 'sample', password: 'sample' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('{"error":"Sign up failed check the your name"}');
          done();
        });
    });
    it('if username is empty expected it to be forbidden request', (done) => {
      Request.post('/api/v1/auth/signup').send({ name: 'sample', username: '', password: 'sample' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('{"error":"Sign up failed check the your username"}');
          done();
        });
    });
    it('if password is empty expected it to be forbidden request', (done) => {
      Request.post('/api/v1/auth/signup').send({ name: 'sample', username: 'sample', password: '' })
        .end((error, response) => {
          expect(response.status).to.equal(400);
          expect(response.text).to.equal('{"error":"Sign up failed, please fill the password"}');
          done();
        });
    });
  });
  // describe('Api entry test', () => {
  //   let inputEntryId = '';
  //   before((done) => {
  //     it('Adding file successful', () => {
  //       Request.post('/api/v1/entries')
  //         .send(entry)
  //         .end((error, request) => {
  //           inputEntryId = request.body.id;
  //           expect(inputEntryId).to.equal(request.body.id);
  //         });
  //     });
  //     done();
  //   });
  //   describe('POST /entries', () => {
  //     it('Add an entry type and status', (done) => {
  //       Request.post('/api/v1/entries')
  //         .send(entry)
  //         .end((error, response) => {
  //           expect(response.status).to.equal(200);
  //           expect(response.body).to.be.an('object');
  //           done();
  //         });
  //     });
  //     it('The entry properties', (done) => {
  //       Request.post('/api/v1/entries')
  //         .send(entry)
  //         .end((error, response) => {
  //           expect(response.body).to.have.property('title');
  //           expect(response.body).to.have.property('story');
  //           done();
  //         });
  //     });
  //     it('The entry properties type', (done) => {
  //       Request.post('/api/v1/entries')
  //         .send(entry)
  //         .end((error, response) => {
  //           expect(response.body.id).to.be.a('string');
  //           expect(response.body.title).to.be.a('string');
  //           expect(response.body.story).to.be.a('string');
  //           done();
  //         });
  //     });
  //     it('The entry content', (done) => {
  //       Request.post('/api/v1/entries')
  //         .send(entry)
  //         .end((error, response) => {
  //           expect(entry.id).to.be.an('undefined');
  //           expect(response.body.title).to.equal(entry.title);
  //           expect(response.body.story).to.be.equal(entry.story);
  //           done();
  //         });
  //     });
  //   });
  // });
}
