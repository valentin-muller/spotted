const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    mainMessage: { type: String, required: true },
    date: { type: Date },
    isFavourite: { type: Boolean },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    agree: { type: Number },
    disagree: { type: Number },
    smiley: { type: Number },
    crying: { type: Number },
    angry: { type: Number },
    sad: { type: Number },
    heart: { type: Number }
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Message = mongoose.model("Message", messageSchema);
module.exports = Message;
