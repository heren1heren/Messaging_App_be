import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import allRouter from '../Routes/usersRoutes/all';

const app = express();
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

app.use(express.urlencoded({ extended: false }));
app.use('/all', allRouter);
test.skip('all message update works', (done) => {
  request(app).put('/users/');
});
test.skip('all message delete works', (done) => {});
test.skip("all's detail  get works", (done) => {
  request(app)
    .get('/groupChats/all')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});
