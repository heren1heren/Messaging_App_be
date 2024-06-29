import mongoose, { Schema } from 'mongoose';
import 'dotenv/config';
import User from './models/users.js';
import Message from './models/message.js';
import GroupChat from './models/groupChat.js';
const uri = process.env.mongoDB;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(uri);
}
const db = mongoose.connection;
mongoose.connection.once('open', () => {
  console.log(`MongoDB successfully connected to ${uri}`);
});

db.on('error', console.error.bind(console, 'mongo connection error'));
