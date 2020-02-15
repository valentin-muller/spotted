// const express = require("express");
// const privateRouter = express.Router();

// privateRouter.use((req, res, next) => {
//   if (req.session.currentUser) {
//     next();
//   } else {
//     res.redirect("/login");
//   }
// });

// privateRouter.get("NEWSFEED", (req, res) => {
//   res.render("NEWSFEED", { username: req.session.currentUser.username });
// });

// privateRouter.get("PROFILE", (req, res) => {
//   res.render("PROFILE + MY MESSAGES", {
//     username: req.session.currentUser.username,
//     messages: req.session.currentUser.messages
//   });
// });

// privateRouter.get("PROFILE/BOOKMARKS", (req, res) => {
//   res.render("/PROFILE/BOOKMARKS", { bookmarks: req.session.currentUser.favourites });
// });

// module.exports = privateRouter;
