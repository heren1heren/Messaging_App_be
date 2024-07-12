import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/messages.js';
// import * as controller from '../../Controllers/index.js';

const messageRouter = Router();

messageRouter.get('/', controller.get);

messageRouter.post('/users', controller.postUserMessage);
// messageRouter.post('/groupChats', controller.postGroupChatMessage);
// messageRouter.post('/all', controller.postAllMessage);

// messages.put('/', controller.put);

messageRouter.delete('/:id', controller.del);

export default messageRouter;
