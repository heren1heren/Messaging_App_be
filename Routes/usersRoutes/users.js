import { Router } from 'express';
import 'dotenv/config';
import * as controller from '../../Controllers/users.js';

const users = Router();

users.get('/');
