const express = require("express");
const router = express.Router();

//ROUTERS
const loginRouter = require("./auth/login");
const logoutRouter = require("./auth/logout");
const authRouter = require("./auth/auth");
// const messageRouter = require("./private/message");
// const usersRouter = require("./private/users");

//AUTH

// /login
router.use("/login", loginRouter);
// /logout
router.use("/logout", logoutRouter);
// /signup
router.use("/signup", authRouter);
// /messages
// router.use("/message", messageRouter);
// /users
// router.use("/users", usersRouter);

//GET home page
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
