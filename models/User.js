const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  gender: { type: String, required: true, enum: ["Male", "Female", "Other"] },
  course: {
    type: String,
    required: true,
    enum: ["Web", "UX-UI", "Data"]
  },
  // favourites: [],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
  // isAdmin: { type: Boolean, required: true, default: false }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
