import express from 'express';
import request from 'supertest';
import logger from 'morgan';
import mongoose from 'mongoose';

import 'dotenv/config';
import userRouter from '../Routes/usersRoutes/users';
import initializeTestingMongoServer from './mongoConfigTesting';
import User from '../DataBase/models/users';
import Message from '../DataBase/models/message';

const app = express();
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/users', userRouter);
initializeTestingMongoServer();
beforeEach(async () => {
  await User.create({
    username: 'klein',
    password: 'aoetuuueee',
    id: '1',
    date: new Date(),
    incomeMessages: [],
  });
  await User.create({
    username: 'noPurpose',
    password: 'aoeteeee',
    id: '2',
    date: new Date(),
    incomeMessages: [],
  });
});
afterEach(async () => {
  await mongoose.connection.dropDatabase();

  const collections = await mongoose.connection.db.collections();

  await Promise.all(
    collections.map(async (collection) => {
      await collection.deleteMany({}); // map collection to collection.deleteMany Calls
    })
  );
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

test('user post works', (done) => {
  request(app)
    .post('/users/123')
    .type('form')
    .send({
      username: 'hereneee',
      password: 'helloeee',
    })

    .then(() => {
      request(app)
        .get('/users/')
        .expect((res) => {
          expect(res.body.data).toHaveLength(3);
        })
        .end(done);
    });
});

test('user update works', (done) => {
  const payload = { displayName: 'cookieTurtle', username: 'herenklein' };
  const id = 1;
  request(app)
    .put(`/users/${id}`)
    .type('form')
    .send(payload)
    .expect((res) => {
      expect(res.body.message).toBe(
        `successfully updated the user with id: ${id}`
      );
    })
    .then(() => {
      request(app)
        .get('/users/1')
        .expect((res) => {
          expect(res.body.data.displayName).toBe('cookieTurtle');
        })
        .end(done);
    });
});
test.skip('user message update works', (done) => {
  // todo : comeback after testing message post
  /**
   * first create a message with a messageId
   *
   * -> find object Id by request().get
   * ->
   * -> then (() => {
   * pass object Id
   * request put(/users/1/messages)
   * })
   */
  const id = 123;
  const payload = { message: 'first message', messageId: id };
  request(app)
    .post('/messages/')
    .type('form')
    .send(payload)
    .then(() => {
      request(app)
        .get(`/messages/${id}`)
        .expect((res) => {
          console.log(res.text);
        })
        .end(done);
    });
  // request(app)
  //   .put('/users/1/messages')
  //   .type('form')
  //   .send(payload)
  //   .expect((res) => {
  //     console.log(res.text);
  //     expect(res.body.message).toBe(
  //       `successfully updated the user with id: ${id}`
  //     );
  //   })
  //   .then(() => {
  //     request(app)
  //       .get('/users/1')
  //       .expect((res) => {
  //         if (res.text) console.log(res.text);
  //         expect(res.body.data.incomeMessage).toHaveLength(1);
  //       })
  //       .end(done);
  //   });
});

test('user delete works', (done) => {
  request(app)
    .delete('/users/2')
    .expect(200)
    .then(() => {
      request(app)
        .get('/users/')
        .expect(200)
        .expect((res) => {
          // post element in the above test did not get deleted according to  the afterEach() call
          expect(res.body.data).toHaveLength(1); // receive: 2
        })
        .end(done);
    });
});
