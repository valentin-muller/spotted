const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const Message = require("../../models/Message");

/* GET users listing. */

// GET	/profile --> Redirects to the profile page
router.get("/", (req, res, next) => {
  const id = req.session.currentUser._id;
  res.redirect(`/profile/${id}`);
});

// GET	/profile/:id --> Renders the profile page
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate("messages")
    .then(user => {
      console.log(req.session.currentUser);
      req.session.current = user; // user logs in
      console.log("oneUser.messages :", user.messages);
      res.render("private/profile", {
        user,
        userInfo: req.session.currentUser
      });
    })
    .catch(err => console.log(err));
});

// GET	/profile/:id/edit --> Renders the edit form to edit user profile
// POST	/profile/:id/ --> updates the user info in DB. Redirects to the profile page

// DELETE	/profile/:id/delete
router.get("/:id/delete", (req, res, next) => {
  // console.log('ID TO DELETE', req.params);

  User.findOne({
    _id: req.params.id
  })
    .then(user => user.remove())
    .then(() => req.session.destroy())
    .then(() => res.redirect("/"))
    .catch(err => console.log(err));
});

module.exports = router;
