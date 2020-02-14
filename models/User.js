const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ["male", "female", "other"] },
  course: {
    type: String,
    required: true,
    enum: ["web", "uxui", "data"]
  },
  favourites: [],
  messages: [],
  isAdmin: { type: Boolean, required: true, default: false }
});


const User = mongoose.model("User", userSchema);
module.exports = User;
