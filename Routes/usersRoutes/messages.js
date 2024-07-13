import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/messages.js';
// import * as controller from '../../Controllers/index.js';

const messageRouter = Router();

messageRouter.get('/', controller.get);

messageRouter.post('/:id/users/', controller.postUserMessage);
messageRouter.post('/:id/groupChats/', controller.postGroupChatMessage);
messageRouter.post('/:id/all/', controller.postAllMessage);

messageRouter.delete('/:id', controller.del);

export default messageRouter;
