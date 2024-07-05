import express from 'express';
import request from 'supertest';
import logger from 'morgan';
import mongoose from 'mongoose';

import 'dotenv/config';
import userRouter from '../Routes/usersRoutes/users';
import initializeTestingMongoServer from './mongoConfigTesting';
import User from '../DataBase/models/users';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/users', userRouter);
initializeTestingMongoServer();
beforeEach(async () => {
  await User.create({
    username: 'klein',
    password: 'aoetuuu',
    id: '1',
    date: new Date(),
  });
  await User.create({
    username: 'noPurpose',
    password: 'aoet',
    id: 'oaesoaeshtu',
    date: new Date(),
  });
});
afterEach(async () => {
  await mongoose.connection.dropDatabase();
});
test('get users works', (done) => {
  request(app)
    .get('/users')
    .expect('Content-Type', /json/)
    .expect(200)
    .expect((res) => {
      res.body.data.forEach((element) => {
        expect(element).not.toHaveProperty('password');
      });

      expect(res.body.data).toHaveLength(2);
    })
    .end(done);
});
test('user detail get works', (done) => {
  request(app)
    .get('/users/1')
    .expect(200)
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.data).not.toHaveProperty('password');
      expect(res.body.data).toHaveProperty('username');
      expect(res.body.data).toHaveProperty('date');
      expect(res.body.data).toHaveProperty('sentMessages');
      expect(res.body.data).toHaveProperty('incomeMessages');
    })
    .end(done);
});

// don't know how to test these
test('user post works', (done) => {
  request(app)
    .post('/users/')
    .type('form')

    .field('username', 'noname')
    .field('password', 'eeeeeeee')
    .expect((res) => {
      // {"errors":{"errors":[{"type":"field","msg":"username needs to have more than 3 letters","path":"username","location":"body"},{"type":"field","msg":"password needs to have more than 7 letters","path":"password","location":"body"}]},"ErrorMessage":"validation errors"}
      console.log(res);

      expect(res.body.message).toBe('successfully created an user');
    })
    .end(done);
});

test.skip('user update works', (done) => {
  request(app).put('/users/');
});
test.skip('user message update works', (done) => {});

test('user delete works', (done) => {
  request(app)
    .delete('/users/1')
    .expect(200)
    .then(() => {
      request(app)
        .get('/users/')
        .expect(200)
        .expect((res) => {
          expect(res.body.data).toHaveLength(1);
        })
        .end(done);
    });
});
