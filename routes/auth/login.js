const express = require("express");
const loginRouter = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");

loginRouter.get("/", (req, res) => {
  res.render("auth/login-form");
  //render the login-form hbs page
});

loginRouter.post("/", (req, res) => {
  // console.log("HELLO");
  const { username, password } = req.body;
  // console.log("USER", username);
  // console.log("PW", password);

  if (password === "" || username === "") {
    res.render("auth/login-form", { errorMsg: "Username/Password required" });
    // check for Username/PW , if blank send error
    return;
  }

  User.findOne({ username })
    .then(user => {
      if (!user) {
        res.render("auth/login-form", { errorMsg: "Username does not exist" });
        return;
      }

      const databasePW = user.password;
      // console.log("DB PW", databasePW);
      // console.log("FORM PW", password);

      const correctPW = bcrypt.compareSync(password, databasePW); // compares the data to be encrypted to the data in the DB

      if (correctPW) {
        req.session.current = user; // user logs in
        res.render("private/create");

        // res.render("private/profile", {
        //   user,
        //   userInfo: req.session.currentUser
        // });

        console.log("User", user);

        //redirects to NEWSFEED
      } else {
        res.render("auth/login-form", { errorMsg: "Wrong password" });
      }
    })
    .catch(err => console.log(err));
});

module.exports = loginRouter;
