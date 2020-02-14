const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  headerMessage: String,
  mainMessage: { type: String, required: true },
  isFavourite: Boolean,
  userID: Number
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
