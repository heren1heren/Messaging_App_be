import express from 'express';
import request from 'supertest';

import mongoose from 'mongoose';

import 'dotenv/config';
import groupChatRouter from '../Routes/usersRoutes/groupChats';
import initializeTestingMongoServer from './mongoConfigTesting';
import GroupChat from '../DataBase/models/groupChat';
import User from '../DataBase/models/users';
import Message from '../DataBase/models/message';

const app = express();
app.use(express.urlencoded({ extended: false }));

app.use('/groupChats', groupChatRouter);
initializeTestingMongoServer();
beforeEach(async () => {
  const admin = await User.create({
    username: 'klein',
    password: 'aoetuuueee',
    id: '1',
    date: new Date(),
    incomeMessages: [],
  });
  await User.create({
    username: 'klein',
    password: 'aoetuuueee',
    id: '2',
    date: new Date(),
    incomeMessages: [],
  });
  await User.create({
    username: 'klein',
    password: 'aoetuuueee',
    id: '3',
    date: new Date(),
    incomeMessages: [],
  });
  const groupChat = await GroupChat({
    id: '1',
    name: 'firstGroup',
    date: new Date(),
    admin: admin._id,
    incomeMessages: [],
  });
  const message = await Message.create({
    text: 'hello',
    id: '1',
    sender: admin._id,
    date: new Date(),
    receiver: groupChat._id,
  });
  groupChat.incomeMessages.push(message._id);
  await groupChat.save();
});
afterEach(async () => {
  await mongoose.connection.dropDatabase();
  const collections = await mongoose.connection.db.collections();

  await Promise.all(collections.map(async (col) => col.deleteMany({})));
});

test('group chats get works', (done) => {
  request(app)
    .get('/groupChats')
    .expect('Content-Type', /json/)
    .expect((res) => {
      expect(res.body.data).toHaveLength(1);
    })
    .expect(200, done);
});
test('group chat detail  get works', (done) => {
  request(app)
    .get('/groupChats/1')
    .expect((res) => {
      // console.log(res.text);
      expect(res.body.data).toHaveProperty('name');
    })
    .expect('Content-Type', /json/)
    .expect(200, done);
});
test('groupChat post works', (done) => {
  /**
   * passing members id to the request
   *
   */
  request(app)
    .post('/groupChats/1')
    .type('form')
    .send({
      name: 'noname',
      adminId: '1',
      // memberIds: ['1', '2', '3']
    })
    .expect((res) => {
      // console.log(res.text);
      expect(res.body.message).toBe('successfully created an group');
    })
    .then(() => {
      request(app)
        .get('/groupChats')
        .expect('Content-Type', /json/)
        .expect((res) => {
          expect(res.body.data).toHaveLength(2);
        })
        .end(done);
    });
});

test('group chat update  name works', (done) => {
  request(app)
    .put('/groupChats/1')
    .type('form')
    .send({ name: 'changedName' })

    .then(() => {
      request(app)
        .get('/groupChats/1')
        .expect((res) => {
          expect(res.body.data).toHaveProperty('name');
          expect(res.body.data.name).toBe('changedName');
        })
        .end(done);
    });
});

test('group chat message update works', (done) => {
  request(app)
    .put('/groupchats/1/messages')
    .type('form')
    .send({ messageId: '1', senderId: '1', messageText: 'sent Message' })

    .then(() => {
      request(app)
        .get('/groupChats/1')
        .expect((res) => {
          expect(res.body.data).toHaveProperty('incomeMessages');
          expect(res.body.data.incomeMessages).toHaveLength(2);
        })
        .end(done);
    });
});

test('groupChat delete works', (done) => {
  request(app)
    .delete('/groupChats/1')
    .then(() => {
      request(app)
        .get('/groupChats/1')
        .expect((res) => {
          expect(res.body.data).toBe(null);
        })
        .end(done);
    });
});
