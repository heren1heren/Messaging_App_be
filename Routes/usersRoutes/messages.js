import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/messages.js';
// import * as controller from '../../Controllers/index.js';

const messageRouter = Router();

messageRouter.get('/', controller.get);

messageRouter.post('/', controller.post);

// messages.put('/', controller.put);

messageRouter.delete('/', controller.del);
// for testing option
messageRouter.delete('/all', controller.delAll);

export default messageRouter;
