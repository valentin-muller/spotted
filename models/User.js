const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: String,
  lastName: String,
  username: String,
  gender: String,
  course: String,
  favourites: [],
  personalGossips: []
});

const User = mongoose.model("User", userSchema);
module.exports = User;
