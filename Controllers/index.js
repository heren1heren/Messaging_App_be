import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';
//* Get

// export const usersGet = asyncHandler(async (req, res) => {
//   const users = await User.find(
//     {},
//     {
//       _id: 0,
//       password: 0,
//       __v: 0,
//     }
//   );
//   // not passing sensative information
//   res.json({ message: 'successful fetch', data: users });
// });
// export const userDetailGet = asyncHandler(async (req, res) => {
//   const user = await User.find(
//     { id: req.body.id },
//     { _id: 0, password: 0, __v: 0 }
//   )
//     .populate('messages')
//     .exec();
//   res.json({ message: 'successful fetch', data: user });
// });
// export const messagesGet = asyncHandler(async (req, res) => {
//   const messages = await Message.find({}, { _id: 0, __v: 0 })
//     .sort({ date: 1 })
//     .exec();
//   res.json({ message: 'successful fetch', data: messages });
// });

// export const groupChatsGet = asyncHandler(async (req, res) => {
//   const groupChats = await GroupChat.find({}, { _id: 0, __v: 0 }).sort({
//     date: 1,
//   });

//   res.json({ message: 'successful fetch', data: groupChats });
// });
// export const groupChatDetailGet = asyncHandler(async (req, res) => {
//   const groupChat = await GroupChat.find({ id: req.body.id }, { _id: 0, _v: 0 })
//     .populate('messages')
//     .exec();
//   res.json({ text: 'successful fetch', data: groupChat });
// });
// export const groupAllGet = asyncHandler(async (req, res) => {
//   const all = await GroupChat.find({ name: 'All' }).exec();

//   res.json({ text: 'successful fetch', data: all });
// });
//* post
// export const messagePost = asyncHandler(async (req, res) => {
//   const user = await User.find({ username: 'heren' }); // ? refactor again
//   const message = await Message.create({
//     text: 'hello from heren',
//     user: user._id,
//   });
//   user.messages.push(message);
//   await user.save();
//   res.json({
//     message: 'successful',
//   });
// });
// export const userPost = [
//   body('username')
//     .isLength({ min: 3 })
//     .withMessage('username needs to have more than 3 letters')
//     .escape(),
//   body('password')
//     .isLength({ min: 7 })
//     .withMessage('password needs to have more than 7 letters'),

//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       res.json({ errors, ErrorMessage: 'validation errors' });
//       return;
//     }
//     const user = await User.findOne({ username: req.body.username }).exec();

//     if (user) {
//       res.json({ ErrorMessage: 'username is already existed' });
//       return;
//     }

//     bcrypt.hash(req.body.username, 10, async (error, hash) => {
//       if (error) return console.log(error);
//       await User.create({
//         username: req.body.username,
//         password: hash,
//         date: new Date(),
//         id: 'eeee',
//       });
//     });
//     // success
//     res.json({ message: 'successfully created an user' });
//   }),
// ];
// export const groupChatPost = [
//   body('name')
//     .isLength({ min: 3 })
//     .withMessage('name needs to have more than 3 letters')
//     .escape(),
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       // implement more
//       return res.json({ errors, ErrorMessage: 'validation errors' });
//     }
//     const duplicatedChat = await GroupChat.findOne({
//       name: req.body.name,
//     }).exec();
//     if (duplicatedChat) {
//       return res.json({ ErrorMessage: 'groupChat name is already existed' });
//     }
//     // success
//     const group = await GroupChat({ name: req.body.name, id: 'aoeuoea' });

//     group.members = req.body.membersId;

//     // for creating All:
//     // const users = await User.find().exec();
//     // const membersId = [];
//     // users.forEach((user) => {
//     //   membersId.push(user._id);
//     // });
//     // group.members = membersId;
//     res.json({ message: 'successfully created an group' });
//   }),
// ];

//* Delete

// export const messageDelete = asyncHandler(async (req, res) => {
//   await Message.deleteOne({ id: req.body.id });
//   res.json({
//     message: `successful delete the message with id: ${req.body.id}`,
//   });
// });
// export const userDelete = asyncHandler(async (req, res) => {
//   await User.deleteOne({ id: req.body.id });

//   res.json({
//     message: `successful delete the user with id: ${req.body.id}`,
//   });
// });
// export const groupChatDelete = asyncHandler(async (req, res) => {
//   await GroupChat.deleteOne({ id: req.body.id });
//   res.json({
//     message: `successful delete the groupChat  with id: ${req.body.id}`,
//   });
// });

//* Update
// export const groupChatUpdate = [
//   body('name')
//     .isLength({ min: 3 })
//     .withMessage('name cannot be less than 3 character')
//     .escape(),
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({
//         errors,
//         ErrorMessage: 'validating error',
//       });
//     }

//     const group = GroupChat.find({ name: req.body.name });
//     if (group) {
//       return res.json({
//         ErrorMessage: ' already existed name',
//       });
//     }

//     const existedGroup = GroupChat.find({ id: req.body.id });
//     if (req.body.name) existedGroup.name = req.body.name;
//     if (req.body.admin) existedGroup.admin = req.body.adminId;
//     if (req.body.membersId) existedGroup.members = req.body.membersId;
//     res.json({
//       message: ' updated group Chat',
//     });
//   }),
// ];
// export const groupChatMessageUpdate = [
//   body('message').escape(),
//   // call this route  when user upload a text inside a group chat
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({
//         errors,
//         ErrorMessage: 'validating error',
//       });
//     }
//     const group = await GroupChat.find({ id: req.body.id });

//     group.messages.push(req.body.messageId);
//     await group.save();

//     res.json({
//       message: ' storing message sent by user ',
//     });
//   }),
// ];

// export const userUpdate = [
//   body('username')
//     .isLength({ min: 3 })
//     .withMessage('name cannot be less than 3 character')
//     .escape(),
//   body('displayName')
//     .isLength({ min: 3 })
//     .withMessage('displayName cannot be less than 3 character')
//     .escape(),
//   asyncHandler(async (req, res, next) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({
//         errors,
//         ErrorMessage: 'validating error',
//       });
//     }

//     const duplicatedUser = await User.find({ username: req.body.username });
//     const secondDuplicatedUser = await User.find({
//       displayName: req.body.displayName,
//     });
//     if (duplicatedUser) {
//       return res.json({
//         ErrorMessage: 'already existed username',
//       });
//     }
//     if (secondDuplicatedUser) {
//       return res.json({
//         ErrorMessage: 'already existed display name',
//       });
//     }
//     // success
//     const existedUser = User.find({ id: req.body.id });

//     if (req.body.displayName) existedUser.displayName = req.body.displayName;
//     if (req.body.username) existedUser.username = req.body.username;
//     await existedUser.save();
//     res.json({
//       message: `successfully updated the user with id ${req.body.id}`,
//     });
//   }),
// ];
// export const userMessageUpdate = [
//   body('message').escape(),
//   // call this route everytime a user is successfully sign up
//   asyncHandler(async (req, res) => {
//     const errors = validationResult(req);
//     if (!errors.isEmpty()) {
//       return res.json({
//         errors,
//         ErrorMessage: 'validating error',
//       });
//     }
//     const user = await User.find({ id: req.body.id });

//     user.messages.push(req.body.messageId);
//     await user.save();

//     res.json({
//       message: ' storing message sent by user ',
//     });
//   }),
// ];
