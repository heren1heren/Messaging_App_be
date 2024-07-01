import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';
import indexRouter from '../Routes/usersRoutes/index';
import 'dotenv/config';

beforeEach(async () => {
  await mongoose.connect(process.env.testMongoDB); // a test account
  // reset all collections before each test
});
afterEach(async () => {
  try {
    const { collections } = mongoose.connection;
    for (const key in collections) {
      const collection = collections[key];
      await collection.deleteMany();
    }
  } finally {
    await mongoose.connection.close();
  }
});
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use('/', indexRouter);
describe('GET all users', () => {
  it('get users', async () => {
    const res = await request(app).get('/users');
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toBe('successful fetch');
  });
});
//* POST
test('user post works', (done) => {
  request(app)
    .post('/users/')
    .type('form')
    .send({ password: 'aoeuuoeaeoea', username: 'nonamee' })
    .expect((res) => {
      expect(res.body.message).toBe('successfully created an user');
    })
    .end(done);
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
test('message post works', (done) => {
  /** create 2 users first
   * then create a message based on 2 users
   */

  let user1;
  let user2;

  // request(app)
  //   .post('/messages/')
  //   .type('form')
  //   .send({ text: 'say hello from klein' })
  //   .expect((res) => {
  //     console.log(res);
  //     expect(res.body.message).toBe('successfully created a message');
  //   })
  //   .end(done);
});
//* delete
test.skip('groupChat delete works', (done) => {
  request(app).delete('/groupChats/');
});
test.skip('user delete works', (done) => {
  request(app).delete('/users/');
});
test.skip('message delete works', (done) => {
  request(app).delete('/messages/');
});
//* update
test.skip('user update works', (done) => {
  request(app).put('/users/');
});
test.skip('group chat update works', (done) => {
  request(app).put('/users/');
});
test.skip('user message update works', (done) => {
  request(app).put('/users/');
});
test.skip('group chat message update works', (done) => {
  request(app).put('/users/');
});
test.skip('all message update works', (done) => {
  request(app).put('/users/');
});
//* get

test.skip('users get works', (done) => {
  request(app).get('/users').expect('Content-Type', /json/).expect(200, done);
});

test.skip('group chats get works', (done) => {
  request(app)
    .get('/groupChats')
    .expect('Content-Type', /json/)
    .expect(200, done);
});

test.skip(' messages get works', (done) => {
  request(app)
    .get('/messages')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});

test.skip('user detail get works', (done) => {
  request(app)
    .get('/users/:id')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});

test.skip('group chat detail  get works', (done) => {
  request(app)
    .get('/groupChats/:id')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});
test.skip("all's detail  get works", (done) => {
  request(app)
    .get('/groupChats/all')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200, done);
});
