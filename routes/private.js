const express = require("express");
const privateRouter = express.Router();

privateRouter.use((req, res, next) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});
