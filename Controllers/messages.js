import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';

export const get = asyncHandler(async (req, res) => {
  const messages = await Message.find({}, { __v: 0 }).sort({ date: 1 }).exec();
  res.json({ message: 'successful fetch', data: messages });
});
// create postUserMessage, postGroupChatMessage, postAllMessage
export const postUserMessage = [
  body('message').isLength({ min: 1 }).withMessage(' no empty message'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.json({ ErrorMessage: 'empty message' });
      return;
    }

    const user1 = await User.findOne({ id: req.body.senderId });
    const user2 = await User.findOne({ id: req.body.receiverId });

    await Message.create({
      text: req.body.message,
      sender: user1._id,
      receiver: user2._id,
      date: new Date(),
      id: req.params.id,
    });

    res.json({
      message: 'success',
    });
  }),
];
export const postGroupChatMessage = [
  body('message').isLength({ min: 1 }).withMessage(' no empty message'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.json({ ErrorMessage: 'empty message' });
      return;
    }

    const user = await User.findOne({ id: req.body.senderId });
    const groupChat = await User.findOne({ id: req.body.receiverId });

    await Message.create({
      text: req.body.message,
      sender: user._id,
      receiver: groupChat._id,
      date: new Date(),
      id: '1',
    });

    res.json({
      message: 'success',
    });
  }),
];
export const postAllMessage = [
  body('message').isLength({ min: 1 }).withMessage(' no empty message'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty) {
      res.json({ ErrorMessage: 'empty message' });
      return;
    }

    const user = await User.findOne({ id: req.body.senderId });
    const all = await GroupChat.findOne({ id: req.body.receiverId });

    await Message.create({
      text: req.body.message,
      sender: user._id,
      receiver: all._id,
      date: new Date(),
      id: '1',
    });

    res.json({
      message: 'success',
    });
  }),
];
export const del = asyncHandler(async (req, res) => {
  await Message.deleteOne({ id: req.params.id });
  res.json({
    message: `successful delete the message with id: ${req.body.id}`,
  });
});
