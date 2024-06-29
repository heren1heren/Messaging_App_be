import { Router } from 'express';
import 'dotenv/config';
import passport from 'passport';
import * as controller from '../../Controllers/index.js';
// import * as controller from '../../Controllers/index.js';

const index = Router();
const array = [];

//*GET
index.get('/', controller.indexGet);

index.get('/users', controller.usersGet);

index.get('/messages', controller.messagesGet);

index.get('/groupChats', controller.groupChatsGet);

index.get('/users/:id', controller.userDetailGet);

//*POST

index.post('/users/', controller.userPost);

index.post('/messages/', controller.messagePost);

index.post('/groupChats/', controller.groupChatPost);
//*Delete
index.delete('/messages/', controller.messageDelete);

index.delete('/users/', controller.userDelete);

index.delete('/groupChats/', controller.groupChatDelete);
//*Update
index.put('/users/:id ', controller.userUpdate);
index.put('/groupChats/:id ', controller.groupChatUpdate);

//demo test
index.get('/test', (req, res) => res.json({ array }));

index.post('/test', (req, res) => {
  array.push(req.body.item);
  res.send('success!');
});

export default index;
