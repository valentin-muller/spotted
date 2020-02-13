const express = require("express");
const logoutRouter = express.Router();

logoutRouter.get("/", (req, res, next) => {
  if (req.session) {
    // delete session object
    req.session.destroy(err => {
      if (err) {
        return next(err);
      } else {
        return res.redirect("LOGIN/SIGNUP");
      }
    });
  }
});

module.exports = logoutRouter;
