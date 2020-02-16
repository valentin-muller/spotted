const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema({
  headerMessage: { type: String },
  mainMessage: { type: String, required: true },
  // date: { type: Date },
  // isFavourite: { type: Boolean },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }
  // upvotes: { type: Number },
  // downvotes: { type: Number }
});

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
