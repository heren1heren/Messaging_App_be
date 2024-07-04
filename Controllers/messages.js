import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';

export const get = asyncHandler(async (req, res) => {
  const messages = await Message.find({}, { _id: 0, __v: 0 })
    .sort({ date: 1 })
    .exec();
  res.json({ message: 'successful fetch', data: messages });
});
export const post = asyncHandler(async (req, res) => {
  const user = await User.find({ username: 'heren' }); // ? refactor again
  const message = await Message.create({
    text: 'hello from heren',
    user: user._id,
  });
  user.messages.push(message);
  await user.save();
  res.json({
    message: 'successful',
  });
});

export const del = asyncHandler(async (req, res) => {
  await Message.deleteOne({ id: req.body.id });
  res.json({
    message: `successful delete the message with id: ${req.body.id}`,
  });
});

// for testing purpose

export const delAll = asyncHandler(async (req, res) => {
  await Message.deleteMany();
  res.json({
    message: `successful delete the message with id: ${req.body.id}`,
  });
});
