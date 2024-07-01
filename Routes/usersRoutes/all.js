import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/all.js';

const all = Router();

all.get('/', controller.user);
