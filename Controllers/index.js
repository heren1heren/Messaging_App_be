import { body, validationResult } from 'express-validator';
import asyncHandler from 'express-async-handler';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Message from '../DataBase/models/message.js';
import GroupChat from '../DataBase/models/groupChat.js';
import User from '../DataBase/models/users.js';
//*Get
export const indexGet = asyncHandler(async (req, res, netx) => {
  res.json({ text: 'main page' });
});
export const usersGet = asyncHandler(async (req, res, netx) => {
  /** Step by step guide:
   *Fetch users
   *then pass it through res.json
  
   */

  const users = await User.find({}, { _id: 0 });
  res.json({ text: 'successful fetch', data: users }).exec();
});
export const userDetailGet = asyncHandler(async (req, res, netx) => {
  /** Step by step guide:
   * fetch userDetail by id
   * then pass it through res.json
   */
  const user = await User.find({ id: req.body.id }, { _id: 0 })
    .populate('messages')
    .exec();
  res.json({ text: 'successful fetch', data: user });
});
export const messagesGet = asyncHandler(async (req, res, netx) => {
  /** Step by step guide:
   * fetch messages
   * then pass it through res.json
   */
  const messages = await Message.find({}, { _id: 0 }).sort({ date: 1 }).exec();
  res.json({ text: 'successful fetch', data: messages });
});

export const groupChatsGet = asyncHandler(async (req, res, netx) => {
  /** Step by step guide:
   *fetch groupChats
   then pass it through res.json
   */
  const groupChats = await GroupChat.find({}, { _id: 0 }).sort({ date: 1 });

  res.json({ text: 'successful fetch', data: groupChats });
});

//*post
export const messagePost = asyncHandler(async (req, res, next) => {
  /** Step by step guide:
   * validating inputs
   * fetch an existed user instance
   * create a message instance
   * link two instances
   * done
   * handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */
  const user = new User({ username: 'heren', password: 'eaoueoa' });
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
export const userPost = asyncHandler(async (req, res, next) => {
  /** Step by step guide:
   * validating two inputs: username and password.
   * handle username existed already: if yes -> passing errors ;return;
   * else -> Create an user by the inputs and an id.
   *
   *handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */

  res.json({});
});
export const groupChatPost = asyncHandler(async (req, res, next) => {
  /** Step by step guide:
   * validating inputs: group chat name, members(other users)
   * handle existence group chat name
   * create a group chat instance based on inputs and an id
   *
   * handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */

  res.json({});
});

// export const logoutPost = asyncHandler(async (req, res, next) => {
//   /** Step by step guide:
//    * stop sending token or delete the token?
//    */
//   res.json({
//     token: '',
//   });
// });

//*Delete

export const messageDelete = asyncHandler(async (req, res, next) => {
  /** Step by step guide:
   * extract req.body
   * call delete based on the id
   *
   * handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */
  res.json({
    token: '',
  });
});
export const userDelete = asyncHandler(async (req, res, next) => {
  /** Step by step guide:
   * extract req.body
   * call delete based on the id
   *
   *
   * handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */
  res.json({
    token: '',
  });
});
export const groupChatDelete = asyncHandler(async (req, res, next) => {
  /** Step by step guide:
   * extract req.body
   * call delete based on the id
   *
   *
   * handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */
  res.json({
    token: '',
  });
});

//*Update
export const groupChatUpdate = asyncHandler(async (req, res, next) => {
  // groupChat update can : kick users, change groupChat's name, ...
  /** Step by step guide:
   *
   * extract req.body
   * call an update operation by req.body.id
   *handle existed groupChat's name
   *
   *
   * handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */

  res.json({
    token: '',
  });
});
export const userUpdate = asyncHandler(async (req, res, next) => {
  //update username or password or displayUsername or delete account
  /** Step by step guide:
   *extract req.body and req.body.id
   *
   * call an update operation by req.body.id
   * handle existed username
   *
   *
   *
   * handle successful post : push message to front end to display or redirect
   *handle errors: push errors to front end to display...
   */
  res.json({
    token: '',
  });
});
