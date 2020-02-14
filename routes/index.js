const express = require("express");
const router = express.Router();
//ROUTERS
const loginRouter = require("./auth/login");
const logoutRouter = require("./auth/logout");
const authRouter = require("./auth/auth");
const privateRouter = require("./private/private");
//AUTH
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/signup", authRouter);
router.use("/", privateRouter);

//GET home page
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
