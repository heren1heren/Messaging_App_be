import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';

export const messagesGet = asyncHandler(async (req, res) => {
  const messages = await Message.find({}, { _id: 0, __v: 0 })
    .sort({ date: 1 })
    .exec();
  res.json({ message: 'successful fetch', data: messages });
});
