import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';

export const groupChatsGet = asyncHandler(async (req, res) => {
  const groupChats = await GroupChat.find({}, { _id: 0, __v: 0 }).sort({
    date: 1,
  });

  res.json({ message: 'successful fetch', data: groupChats });
});
export const groupChatDetailGet = asyncHandler(async (req, res) => {
  const groupChat = await GroupChat.find({ id: req.body.id }, { _id: 0, _v: 0 })
    .populate('messages')
    .exec();
  res.json({ text: 'successful fetch', data: groupChat });
});
export const groupAllGet = asyncHandler(async (req, res) => {
  const all = await GroupChat.find({ name: 'All' }).exec();

  res.json({ text: 'successful fetch', data: all });
});
export const groupChatPost = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('name needs to have more than 3 letters')
    .escape(),
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
    const group = await GroupChat({ name: req.body.name, id: 'aoeuoea' });

    group.members = req.body.membersId;
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

export const groupChatUpdate = [
  body('name')
    .isLength({ min: 3 })
    .withMessage('name cannot be less than 3 character')
    .escape(),
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors,
        ErrorMessage: 'validating error',
      });
    }

    const group = GroupChat.find({ name: req.body.name });
    if (group) {
      return res.json({
        ErrorMessage: ' already existed name',
      });
    }

    const existedGroup = GroupChat.find({ id: req.body.id });
    if (req.body.name) existedGroup.name = req.body.name;
    if (req.body.admin) existedGroup.admin = req.body.adminId;
    if (req.body.membersId) existedGroup.members = req.body.membersId;
    res.json({
      message: ' updated group Chat',
    });
  }),
];
export const groupChatMessageUpdate = [
  body('message').escape(),
  // call this route  when user upload a text inside a group chat
  asyncHandler(async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({
        errors,
        ErrorMessage: 'validating error',
      });
    }
    const group = await GroupChat.find({ id: req.body.id });

    group.messages.push(req.body.messageId);
    await group.save();

    res.json({
      message: ' storing message sent by user ',
    });
  }),
];
export const allUpdate = [
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
export const allMessageUpdate = [
  body('message').escape(),
  // call this route everytime a user is successfully sign up
  asyncHandler(async (req, res, next) => {
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
export const groupChatDelete = asyncHandler(async (req, res) => {
  await GroupChat.deleteOne({ id: req.body.id });
  res.json({
    message: `successful delete the groupChat  with id: ${req.body.id}`,
  });
});
