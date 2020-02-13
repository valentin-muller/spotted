const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  gender: { type: String, required: true },
  course: { type: String, required: true },
  favourites: [],
  messages: []
});

const User = mongoose.model("User", userSchema);
module.exports = User;
