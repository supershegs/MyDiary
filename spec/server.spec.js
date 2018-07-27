import supertest from 'supertest';
import app from '../server';
import EntriesModel from '../server/model/EntriesModel';

const entry = {
  title: 'My new lodge',
  story: 'My new home is located at',
};
const Request = supertest(app);

describe('Entry API Unit Tests', () => {
  let inputEntryId = '';
  beforeAll((done) => {
    Request.post('/api/v1/entries')
      .send(entry)
      .end((error, request) => {
        inputEntryId = request.body.id;
        expect(inputEntryId).toBe(request.body.id);
        done();
      });
  });
  describe('GET /api/v1/entries', () => {
    it('Add an entry status', (done) => {
      Request.post('/api/v1/entries')
        .send(entry)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.id).toBeTruthy();
          done();
        });
    });
  });
  describe('GET /api/v1/entries', () => {
    it('Add an entry to diary list', (done) => {
      Request.post('/api/v1/entries')
        .send(entry)
        .end((error, response) => {
          expect(response.body.title).toEqual(entry.title);
          expect(response.body.story).toEqual(entry.story);
          done();
        });
    });
  });


  describe('GET an entry /api/v1/entries/:id', () => {
    it('Get an entry with id status', (done) => {
      Request.get(`/api/v1/entries/${inputEntryId}`)
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.id).toEqual(inputEntryId);
          done();
        });
    });
  });
  describe('GET an entry /api/v1/entries/:id', () => {
    it('Get an entry with a valid entryId', (done) => {
      Request.get(`/api/v1/entries/${inputEntryId}`)
        .end((error, response) => {
          expect(response.body.title).toEqual(entry.title);
          expect(response.body.story).toEqual(entry.story);
          done();
        });
    });
  });

  describe('PUT /api/v1/entries/:id', () => {
    it('edit the title of an entry', (done) => {
      Request.put(`/api/v1/entries/${inputEntryId}`)
        .send({ title: 'updated title' })
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.editEntry.id).toEqual(inputEntryId);
          expect(response.body.editEntry.title).toEqual('updated title');
          expect(response.body.editEntry.story).toEqual(entry.story);
          done();
        });
    });
  });
  describe('GET All Entries - GET /api/v1/entries', () => {
    // Use this to add multiple entries
    EntriesModel.add({ title: 'entry1', story: 'entry1 story' });
    EntriesModel.add({ title: 'entry2', story: 'entry2 story' });
    EntriesModel.add({ title: 'entry3', story: 'entry3 story' });
    it('To get All entries', (done) => {
      Request.get('/api/v1/entries')
        .end((error, response) => {
          expect(response.status).toEqual(200);
          expect(response.body.length).toBeGreaterThanOrEqual(3);
          expect(response.body[1].title).toEqual('entry2');
          done();
        });
    });
  });
});
