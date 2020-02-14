const express = require("express");
const router = express.Router();

//need to add profile/user, message routers

//PRE ROUTE MIDDLEWARE - used to check if user has an autenticated cookie

router.use("/", (req, res) => {
  if (req.session.currentUser) {
    next();
  } else {
    res.redirect("/login");
  }
});

module.exports = router;
