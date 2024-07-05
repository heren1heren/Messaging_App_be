import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import groupChatRouter from '../Routes/usersRoutes/groupChats';

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use('/groupChats', groupChatRouter);
beforeEach(async () => {
  await mongoose.connect(process.env.testMongoDB);
});
afterEach(async () => {
  try {
    request(app).delete('/messages/all');
    request(app).delete('/groupChats/all');
    request(app).delete('/groupChats/all');
  } finally {
    await mongoose.connection.close();
  }
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
test('groupChat post works', (done) => {
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
