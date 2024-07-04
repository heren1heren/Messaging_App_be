import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import messageRouter from '../Routes/usersRoutes/messages';
import initializeTestingMongoServer from './mongoConfigTesting';

const app = express();
initializeTestingMongoServer();
beforeEach(async () => {});
afterEach(async () => {});

app.use(express.urlencoded({ extended: false }));

app.use('/messages', messageRouter);

test.skip(' messages get works', (done) => {
  request(app)
    .get('/messages')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});
test.skip('message post works', (done) => {
  /** create 2 users first
   * then create a message based on 2 users
   */

  let user1;
  let user2;

  request(app)
    .post('/messages/')
    .type('form')
    .send({ text: 'say hello from klein' })
    .expect((res) => {
      console.log(res);
      expect(res.body.message).toBe('successfully created a message');
    })
    .end(done);
});
test.skip('message delete works', (done) => {
  request(app).delete('/messages/');
});
