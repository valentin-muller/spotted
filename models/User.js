const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "memale", "0ther"] },
  course: {
    type: String,
    required: true,
    enum: ["web", "data", "uxui"]
  },
  favourites: [],
  messages: [],
  isAdmin: { type: Boolean, required: true, default: false }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
