import mongoose, { Schema } from 'mongoose';
const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.virtual('url').get(function () {
  const url = '/users/' + this._id;
  return url;
});
const User = mongoose.model('Users', UserSchema);
export default User;
