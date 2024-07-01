import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';

export const Get = asyncHandler(async (req, res) => {
  const users = await User.find(
    {},
    {
      _id: 0,
      password: 0,
      __v: 0,
    }
  );
  // not passing sensative information
  res.json({ message: 'successful fetch', data: users });
});
export const userDetailGet = asyncHandler(async (req, res) => {
  const user = await User.find(
    { id: req.body.id },
    { _id: 0, password: 0, __v: 0 }
  )
    .populate('messages')
    .exec();
  res.json({ message: 'successful fetch', data: user });
});

export const Post = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('username needs to have more than 3 letters')
    .escape(),
  body('password')
    .isLength({ min: 7 })
    .withMessage('password needs to have more than 7 letters'),

  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.json({ errors, ErrorMessage: 'validation errors' });
      return;
    }
    const user = await User.findOne({ username: req.body.username }).exec();

    if (user) {
      res.json({ ErrorMessage: 'username is already existed' });
      return;
    }

    bcrypt.hash(req.body.username, 10, async (error, hash) => {
      if (error) return console.log(error);
      await User.create({
        username: req.body.username,
        password: hash,
        date: new Date(),
        id: 'eeee',
      });
    });
    // success
    res.json({ message: 'successfully created an user' });
  }),
];
export const userDelete = asyncHandler(async (req, res) => {
  await User.deleteOne({ id: req.body.id });

  res.json({
    message: `successful delete the user with id: ${req.body.id}`,
  });
});
