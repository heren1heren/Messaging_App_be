import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import User from '../DataBase/models/users.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

//*Get
export const indexGet = asyncHandler(async (req, res, netx) => {
  res.json({ text: 'main page' });
});
//*post
export const logoutPost = asyncHandler(async (req, res, next) => {
  res.json({
    token: '',
  });
});

//*Delete

//*Update
