import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/all.js';

const allRouter = Router();

allRouter.get('/', controller.get);

allRouter.post('/', controller.post);

allRouter.put('/', controller.put);
allRouter.put('/messages', controller.messagePut);

// for testing option
allRouter.delete('/', controller.del);

export default allRouter;
