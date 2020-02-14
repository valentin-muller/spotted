const express = require("express");
const authRouter = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;

authRouter.post("/", (req, res, next) => {
  const { firstName, lastName, username, password, gender, course } = req.body;
  if (password === "" || username === "") {
    // what happens if PW or username is blank?
    res.render("auth/signup-form", {
      errorMsg: "Make sure to enter a Username or a Password"
    });
    return;
  }

  //  if (zxcvbn(password).score < 3) {
  // res.render("auth/signup-form", {
  // errorMessage: "Password is weak . Try adding different characters type or making it longer"
  // });
  // return;
  // }

  User.findOne({ username })
    .then(user => {
      if (user) {
        // if the username is taken
        res.render("auth/signup-form", {
          errorMessage: "Username already taken. Try with a different one"
        });
        return;
      }
      const salt = bcrypt.genSaltSync(saltRounds);
      const hasedPW = bcrypt.hashSync(password, salt);

      User.create({
        firstName,
        lastName,
        username,
        password: hasedPW,
        // gender,
        // course
        // favourites,
        // personalGossips
      })
        .then(createdUser => {
          res.redirect("/");
          console.log(createdUser);
          
        })
        .catch(err =>
          res.render("auth/signup-form", {
            errorMessage: "Error while creating new User"
          })
        );
    })
    .catch(err => console.log(err));
});

authRouter.get("/", (req, res, next) => {
  res.render("auth/signup-form");
});

module.exports = authRouter;
