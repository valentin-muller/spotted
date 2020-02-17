const express = require("express");
const router = express.Router();

const profileRouter = require("./private/users-router");
const msgRouter = require("./private/message-router");
//PRE ROUTE MIDDLEWARE - used to check if user has an autenticated cookie

router.use("/", (req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

// * '/profile'
router.use("/profile", profileRouter);

// * '/messages'
router.use("/messages", msgRouter);

module.exports = router;
