import mongoose, { Schema, SchemaType } from 'mongoose';
const UserSchema = new Schema({
  date: { type: Schema.Types.Date, required: true },
  displayName: { type: String },
  username: { type: String, required: true },
  password: { type: String, required: true },
  messages: [{ type: Schema.Types.ObjectId, ref: 'Message' }],
});

UserSchema.virtual('url').get(function () {
  const url = '/users/' + this._id;
  return url;
});
const User = mongoose.model('Users', UserSchema);

export default User;
