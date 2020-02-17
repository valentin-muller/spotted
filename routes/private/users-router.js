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

      res.render("private/profile", {
        user,
        userInfo: req.session.currentUser
      });
    })
    .catch(err => console.log(err));
});



// GET	/profile/:id --> Renders the profile page
router.get("/:id", (req, res, next) => {
  User.findById(req.params.id)
  .then(oneUser => {
//.populate('messages')
     console.log(req.session.currentUser);
     console.log(oneUser);
    
     res.render("user/profile", {
       oneUser,
       userInfo: req.session.currentUser // !!!!!!!!!!!
     })

  }).catch((err) => console.log(err));
})


// GET	/profile/:id/edit --> Renders the edit form to edit user profile
// POST	/profile/:id/ --> updates the user info in DB. Redirects to the profile page


// DELETE	/profile/:id/delete


module.exports = router;
