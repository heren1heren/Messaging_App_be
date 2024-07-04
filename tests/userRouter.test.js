import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import userRouter from '../Routes/usersRoutes/users';
import initializeTestingMongoServer from './mongoConfigTesting';
import User from '../DataBase/models/users';

const app = express();
app.use('/users', userRouter);
initializeTestingMongoServer();
beforeEach(async () => {
  await User.create({
    username: 'klein',
    password: 'aoet',
    id: 'oaesoaeshtu',
    date: new Date(),
  });
  await User.create({
    username: 'noPurpose',
    password: 'aoet',
    id: 'oaesoaeshtu',
    date: new Date(),
  });
  const users = await User.find({}, { __v: 0, _id: 0 });
  console.log(users);
});

app.use(express.urlencoded({ extended: false }));
test('get users', (done) => {
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect((res) => {
      console.log(res.body.data);
      expect(res.body.data).toHaveLength(2);
    })
    .end(done);
});
test.skip('user detail get works', (done) => {
  request(app)
    .get('/users/:id')
    .expect('Content-Type', /json/)
    .expect({ name: 'frodo' })
    .expect(200)
    .end(done);
});

test.skip('user post works', (done) => {
  request(app)
    .post('/users/')
    .type('form')
    .send({ password: 'aoeuuoeaeoea', username: 'nonamee' })
    .expect((res) => {
      expect(res.body.message).toBe('successfully created an user');
    })
    .end(done);
});
test.skip('user update works', (done) => {
  request(app).put('/users/');
});
test.skip('user message update works', (done) => {
  request(app).put('/users/');
});
test.skip('user delete works', (done) => {
  request(app).delete('/users/');
});
