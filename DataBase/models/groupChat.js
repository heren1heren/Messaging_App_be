import mongoose, { Schema, SchemaType } from 'mongoose';

const GroupChatSchema = new Schema({
  id: { type: String, required: true },
  date: { type: Schema.Types.Date, required: true },
  name: { type: String, required: true },
  admin: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ type: Schema.Types.ObjectId, ref: 'User', required: true }],
  incomeMessages: [
    { type: Schema.Types.ObjectId, ref: 'Message', required: true },
  ],
});
const GroupChat = mongoose.model('GroupChats', GroupChatSchema);
export default GroupChat;
