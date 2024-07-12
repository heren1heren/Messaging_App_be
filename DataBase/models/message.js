import mongoose, { Schema, SchemaType } from 'mongoose';

const MessageSchema = new Schema({
  id: { type: String, required: true },
  text: { type: String, required: true },
  sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  date: { type: Schema.Types.Date, required: true },
  imageLinks: [{ type: String }],
  receiver: {
    type: Schema.Types.ObjectId,
    refPath: 'receiverModel',
    required: true,
  },
  receiverModel: {
    type: String,

    enum: ['User', 'GroupChat'],
  },
});
MessageSchema.virtual('formatted_date').get(function () {
  return this.date.toLocaleDateString('en-US');
});
const Message = mongoose.model('UserMessages', MessageSchema);
export default Message;
