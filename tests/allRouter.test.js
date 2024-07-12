import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import allRouter from '../Routes/usersRoutes/all';
import initializeTestingMongoServer from './mongoConfigTesting';

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use('/all', allRouter);
initializeTestingMongoServer();
beforeEach(async () => {});
afterEach(async () => {
  await mongoose.connection.dropDatabase();
  const collections = await mongoose.connection.db.collections();

  await Promise.all(collections.map(async (col) => col.deleteMany({})));
});

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
