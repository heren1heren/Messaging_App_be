import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/groupChats.js';
// import * as controller from '../../Controllers/index.js';

const groupChatRouter = Router();

groupChatRouter.get('/', controller.get);

groupChatRouter.post('/', controller.post);

groupChatRouter.put('/:id', controller.put);
groupChatRouter.put('/:id/messages', controller.messagePut);

groupChatRouter.delete('/:id', controller.del);

export default groupChatRouter;
