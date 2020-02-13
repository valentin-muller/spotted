const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  headerMessage: String,
  mainMessage: String,
  isFavourite: Boolean
});


const Message = mongoose.model("Message", messageSchema);
module.exports = Message;

