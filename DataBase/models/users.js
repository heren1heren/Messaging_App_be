import mongoose, { Schema, SchemaType } from 'mongoose';

const UserSchema = new Schema({
  date: { type: Schema.Types.Date, required: true },
  displayName: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  id: { type: String, required: true },
  sentMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  incomeMessages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
  onlineLog: { type: Number },
});

UserSchema.virtual('formatted_date').get(function () {
  return this.date.getSeconds();
});
const User = mongoose.model('Users', UserSchema);

export default User;
