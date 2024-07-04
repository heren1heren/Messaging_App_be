import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';

export const get = asyncHandler(async (req, res) => {
  const all = await GroupChat.find({ name: 'All' }).exec();

  res.json({ text: 'successful fetch', data: all });
});

export const post = [];
export const put = [
  // call this route everytime a user is successfully sign up
  asyncHandler(async (req, res, next) => {
    const all = await GroupChat.find({ name: 'all' });
    const users = User.find().exec();
    const membersId = [];
    users.forEach((user) => {
      membersId.push(user._id);
    });
    all.members = membersId;
    await all.save();

    res.json({
      message: ' updated All',
    });
  }),
];
export const messagePut = [
  body('message').escape(),
  // call this route everytime a user is successfully sign up
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors,
        ErrorMessage: 'validating error',
      });
    }
    const all = await GroupChat.find({ name: 'all' });

    all.messages.push(req.body.messageId);
    await all.save();

    res.json({
      message: ' storing message sent by user ',
    });
  }),
];

export const del = asyncHandler(async (req, res) => {
  await GroupChat.deleteOne({ name: 'all' });

  res.json({
    message: 'successful delete all group',
  });
});
