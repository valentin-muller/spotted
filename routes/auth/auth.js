// const express = require("express");
// const authRouter = express.Router();
// const User = require("../../models/User");
// const bcrypt = require("bcrypt");
// const zxcvbn = require("zxcvbn");
// const saltRounds = 10;

// authRouter.post("/", (req, res, next) => {
//   const { firstName, lastName, username, password, gender, course } = req.body;
//   if (firstName === "" || lastName === "" || password === "" || username === "") {
//     // what happens if PW or username is blank?
//     res.render("auth/signup-form", {
//       errorMsg: "Make sure you enter all required fields"
//     });
//     return;
//   }

//   User.findOne({ username })
//     .then(user => {
//       if (user) {
//         // if the username is taken
//         res.render("auth/signup-form", {
//           errorMessage: "Username already taken. Try with a different one"
//         });
//         return;
//       }

//       const salt = bcrypt.genSaltSync(saltRounds);
//       const hasedPW = bcrypt.hashSync(password, salt);

//       User.create({
//         firstName,
//         lastName,
//         username,
//         password: hasedPW,
//         gender,
//         course
//       })
//         .then(createdUser => {
//           req.session.currentUser = createdUser;
//           res.redirect("/messages");
//         })
//         .catch(err =>
//           res.render("auth/signup-form", {
//             errorMessage: "Error while creating new User"
//           })
//         );
//     })
//     .catch(err => console.log(err));
// });

// authRouter.get("/", (req, res, next) => {
//   res.render("auth/signup-form");
// });

// module.exports = authRouter;

const express = require("express");
const authRouter = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;

authRouter.post("/", (req, res, next) => {
  const { firstName, lastName, username, password, gender, course } = req.body;
  if (firstName === "" || lastName === "" || password === "" || username === "") {
    // what happens if PW or username is blank?
    res.render("auth/signup-form", {
      errorMsg: "Make sure you enter all required fields"
    });
    return;
  }

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
        gender,
        course
      })
        .then(createdUser => {
          req.session.currentUser = createdUser;
          res.redirect("/messages");
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
