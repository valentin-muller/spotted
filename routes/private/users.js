const express = require("express");
const router = express.Router();
const User = require("./../../models/User");
const Message = require("./../../models/Message");

/* GET users listing. */
router.get("/", function(req, res, next) {
  res.send("respond with a resource");
});

module.exports = router;
