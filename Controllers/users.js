import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';

export const get = asyncHandler(async (req, res) => {
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

export const post = [
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
export const put = [
  body('username')
    .isLength({ min: 3 })
    .withMessage('name cannot be less than 3 character')
    .escape(),
  body('displayName')
    .isLength({ min: 3 })
    .withMessage('displayName cannot be less than 3 character')
    .escape(),
  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors,
        ErrorMessage: 'validating error',
      });
    }

    const duplicatedUser = await User.find({ username: req.body.username });
    const secondDuplicatedUser = await User.find({
      displayName: req.body.displayName,
    });
    if (duplicatedUser) {
      return res.json({
        ErrorMessage: 'already existed username',
      });
    }
    if (secondDuplicatedUser) {
      return res.json({
        ErrorMessage: 'already existed display name',
      });
    }
    // success
    const existedUser = User.find({ id: req.body.id });

    if (req.body.displayName) existedUser.displayName = req.body.displayName;
    if (req.body.username) existedUser.username = req.body.username;
    await existedUser.save();
    res.json({
      message: `successfully updated the user with id ${req.body.id}`,
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
    const user = await User.find({ id: req.body.id });

    user.messages.push(req.body.messageId);
    await user.save();

    res.json({
      message: ' storing message sent by user ',
    });
  }),
];

export const del = asyncHandler(async (req, res) => {
  await User.deleteOne({ id: req.body.id });

  res.json({
    message: `successful delete the user with id: ${req.body.id}`,
  });
});

// for testing purpose

export const delAll = asyncHandler(async (req, res) => {
  await User.deleteMany();

  res.json({
    message: 'successful delete user',
  });
});
