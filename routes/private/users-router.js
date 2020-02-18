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

// DELETE	/profile/:id/delete
router.get("/delete/:id", (req, res, next) => {
  // console.log('ID TO DELETE', req.params);

  User.findOne({
    _id: req.params.id
  })
    .then(user => {
      const pr1 = Message.deleteMany({ author: req.params.id });
      const pr2 = user.remove();

      Promise.all([pr1, pr2])
        .then(() => req.session.destroy())
        .then(() => res.redirect("/signup"))
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
});

// ---------------------------------------------------------

// EDIT PROFILE
router.post("/edit", (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { firstName, lastName, username, password, gender, course } = req.body;

  User.updateOne(
    { _id: userId },
    { firstName, lastName, username, password, gender, course },
    { new: true }
  )
    .then(user => {
      req.session.currentUser = user;
      res.redirect("/profile");
    })
    .catch(err => console.log(err));
});

// ---------------------------------------------------------

// ????
router.get("/edit", (req, res, next) => {
  res.render("private/edit-user", {
    user: req.session.currentUser
  });
});

// GET	/profile/:id --> Renders the profile page
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
    .populate("messages favourites")
    .then(user => {
      req.session.current = user; // user logs in
      console.log("user.favourites :", user.favourites);
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
