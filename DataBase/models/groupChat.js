import mongoose, { Schema, SchemaType } from 'mongoose';
const GroupChatSchema = new Schema({
  date: { type: Schema.Types.Date, required: true },
  name: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  users: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message', required: true }],
});
const GroupChat = mongoose.model('GroupChats', GroupChatSchema);
export default GroupChat;
