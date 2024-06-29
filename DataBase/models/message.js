import mongoose, { Schema, SchemaType } from 'mongoose';
const MessageSchema = new Schema({
  text: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Schema.Types.Date, required: true },
  imageLinks: [{ type: String }],
});
const Message = mongoose.model('UserMessages', MessageSchema);
export default Message;
