import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';
import inputValidation from '../utils/inputValidation.js';

export const get = asyncHandler(async (req, res) => {
  const groupChats = await GroupChat.find({}, { _id: 0, __v: 0 }).sort({
    date: 1,
  });

  res.json({ message: 'successful fetch', data: groupChats });
});
export const detailGet = asyncHandler(async (req, res) => {
  // todo: how to populate an array of objectId
  const groupChat = await GroupChat.findOne(
    { id: req.params.id },
    { _v: 0 }
  ).exec();
  res.json({ text: 'successful fetch', data: groupChat });
});

export const post = [
  inputValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // implement more
      return res.json({ errors, ErrorMessage: 'validation errors' });
    }
    const duplicatedChat = await GroupChat.findOne({
      name: req.body.name,
    }).exec();
    if (duplicatedChat) {
      return res.json({ ErrorMessage: 'groupChat name is already existed' });
    }
    // success
    const admin = await User.findOne({ id: req.body.adminId });
    const group = await GroupChat({
      name: req.body.name,
      id: req.params.id,
      admin: admin._id,
      date: new Date(),
    });
    console.log(req.body);

    group.members = req.body.memberIds;

    await group.save();
    // todo create a seperate route for all
    // for creating All:
    // const users = await User.find().exec();
    // const membersId = [];
    // users.forEach((user) => {
    //   membersId.push(user._id);
    // });
    // group.members = membersId;
    res.json({ message: 'successfully created an group' });
  }),
];
// need to have seperate updates routes for each input changes

export const put = [
  // need to build a validating function for update
  inputValidation,
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors,
        ErrorMessage: 'validating error',
      });
    }

    const group = await GroupChat.findOne({ name: req.body.name });
    if (group) {
      return res.json({
        ErrorMessage: ' already existed name',
      });
    }

    const existedGroup = await GroupChat.findOne({ id: req.params.id });

    if (req.body.name) existedGroup.name = req.body.name;
    if (req.body.admin) existedGroup.admin = req.body.adminId;
    if (req.body.membersId) existedGroup.members = req.body.membersId;
    await existedGroup.save();
    res.json({
      message: ' updated group Chat',
    });
  }),
];
export const messagePut = [
  inputValidation,
  // call this route  when user upload a text inside a group chat
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors,
        ErrorMessage: 'validating error',
      });
    }
    const group = await GroupChat.find({ id: req.params.id });

    group.messages.push(req.body.messageId);
    await group.save();

    res.json({
      message: ' storing message sent by user ',
    });
  }),
];

export const del = asyncHandler(async (req, res) => {
  await GroupChat.deleteOne({ id: req.params.id });
  res.json({
    message: `successful delete the groupChat  with id: ${req.params.id}`,
  });
});
