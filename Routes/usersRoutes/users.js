import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/users.js';

const userRouter = Router();

userRouter.get('/', controller.get);
userRouter.get('/:id', controller.userDetailGet);
userRouter.post('/:id', controller.post);

userRouter.put('/:id', controller.put);

userRouter.put('/:id/messages', controller.messagePut);

userRouter.delete('/:id', controller.del);

export default userRouter;
