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
  favourites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }],
  messages: [{ type: mongoose.Schema.Types.ObjectId, ref: "Message" }]
});

const User = mongoose.model("User", userSchema);
module.exports = User;
