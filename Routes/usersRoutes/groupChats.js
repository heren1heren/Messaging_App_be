import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/groupChats.js';
// import * as controller from '../../Controllers/index.js';

const groupChatRouter = Router();

groupChatRouter.get('/', controller.get);

groupChatRouter.post('/', controller.post);

groupChatRouter.put('/', controller.put);
groupChatRouter.put('/messages', controller.messagePut);

groupChatRouter.delete('/', controller.del);

// for testing option
groupChatRouter.delete('/all', controller.delAll);

export default groupChatRouter;
