const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  gender: String,
  course: String,
  favourites: [],
  messages: []
});

const User = mongoose.model("User", userSchema);
module.exports = User;
