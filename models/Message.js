const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema({
  headerMessage: String,
  mainMessage: String,
  isFavourite: Boolean
});
