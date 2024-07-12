import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import messageRouter from '../Routes/usersRoutes/messages';
import initializeTestingMongoServer from './mongoConfigTesting';
import User from '../DataBase/models/users';
import Message from '../DataBase/models/message';
import GroupChat from '../DataBase/models/groupChat';

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use('/messages', messageRouter);
initializeTestingMongoServer();
beforeEach(async () => {
  const user1 = await User.create({
    username: 'klein',
    password: 'aoetuuueee',
    id: '1',
    date: new Date(),
    incomeMessages: [],
  });
  const user2 = await User.create({
    username: 'noPurpose',
    password: 'aoeteeee',
    id: '2',
    date: new Date(),
    incomeMessages: [],
  });
  await Message.create({
    id: '1',
    text: 'first message',
    sender: user1._id,
    date: new Date(),
    receiver: user2._id,
  });
  // await GroupChat.create({name: 'gr'});
  // await GroupChat.create({})
});
afterEach(async () => {
  await mongoose.connection.dropDatabase();
  const collections = await mongoose.connection.db.collections();

  await Promise.all(collections.map(async (col) => col.deleteMany({})));
});

test(' messages get works', (done) => {
  request(app)
    .get('/messages')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.message).toBe('successful fetch');

      res.body.data.forEach((mes) => {
        expect(mes).toHaveProperty('text');
        expect(mes).toHaveProperty('date');
        expect(mes).toHaveProperty('sender');
        expect(mes).toHaveProperty('receiver');
      });
    })
    .expect(200, done);
});
test('message post users works', (done) => {
  request(app)
    .post('/messages/users')
    .type('form')

    .send({
      message: 'say hello from klein',
      senderId: '1',
      receiverId: '2',
    })

    .then(() => {
      request(app)
        .get('/messages')
        .expect((res) => {
          expect(res.body.data).toHaveLength(2);
        })
        .end(done);
    });
});
test.skip('message post groupChat works', (done) => {
  request(app)
    .post('/messages/groupChats')
    .type('form')

    .send({
      message: 'say hello from klein',
      senderId: '1',
      receiverId: '2',
    })

    .then(() => {
      request(app)
        .get('/messages')
        .expect((res) => {
          expect(res.body.data).toHaveLength(2);
        })
        .end(done);
    });
});
test.skip('message post all works', (done) => {
  request(app)
    .post('/messages/all')
    .type('form')

    .send({
      message: 'say hello from klein',
      senderId: '1',
      receiverId: '2',
    })

    .then(() => {
      request(app)
        .get('/messages')
        .expect((res) => {
          expect(res.body.data).toHaveLength(2);
        })
        .end(done);
    });
});
test('message delete works', (done) => {
  request(app)
    .delete('/messages/1')
    .then(() => {
      request(app)
        .get('/messages/')
        .expect((res) => {
          expect(res.body.data).toHaveLength(0);
        })
        .end(done);
    });
});
