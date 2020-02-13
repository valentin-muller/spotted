const express = require("express");
const router = express.Router();
const loginRouter = require("./login");
const authRouter = req("./auth");
const privateRouter = req("./private");

router.use("/login", loginRouter);
router.use("/signup", authRouter);
router.use("/", privateRouter);

/* GET home page. */
router.get("/", (req, res) => {
  res.render("index");
});

module.exports = router;
