import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import groupChatRouter from '../Routes/usersRoutes/groupChats';
import initializeTestingMongoServer from './mongoConfigTesting';

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use('/groupChats', groupChatRouter);
initializeTestingMongoServer();
beforeEach(async () => {});
afterEach(async () => {
  await mongoose.connection.dropDatabase();
  const collections = await mongoose.connection.db.collections();

  await Promise.all(collections.map(async (col) => col.deleteMany({})));
});

test.skip('group chats get works', (done) => {
  request(app)
    .get('/groupChats')
    .expect('Content-Type', /json/)
    .expect(200, done);
});
test.skip('group chat detail  get works', (done) => {
  request(app)
    .get('/groupChats/:id')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});
test.skip('groupChat post works', (done) => {
  request(app)
    .post('/groupChats/')
    .type('form')
    .send({ name: 'nonamee' })
    .expect((res) => {
      expect(res.body.message).toBe('successfully created an group');
    })
    .end(done);
});

test.skip('group chat update works', (done) => {
  request(app).put('/users/');
});

test.skip('group chat message update works', (done) => {
  request(app).put('/users/');
});
test.skip('groupChat delete works', (done) => {
  request(app).delete('/groupChats/');
});
