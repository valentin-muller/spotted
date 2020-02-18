const express = require("express");
const msgRouter = express.Router();

const User = require("../../models/User");
const Message = require("../../models/Message");

// GET /messages
msgRouter.get("/", (req, res) => {
  Message.find()
    .populate("author")
    .then(messageArr => {
      res.render("private/newsfeed", {
        messageArr
      });
    })
    .catch(err => {
      console.log(err);
    });
});

msgRouter.get("/create", (req, res) => {
  res.render("private/create", {
    userInfo: req.session.currentUser
  });
});

// this route allows the logged user to create a message

msgRouter.post("/create", (req, res) => {
  const newMessage = new Message({
    mainMessage: req.body.mainMessage,
    author: req.session.currentUser._id
  });

  newMessage
    .save()
    .then(message => {
      console.log("message.mainMessage :", message._id);
      User.updateOne(
        { _id: req.session.currentUser._id },
        {
          $addToSet: { messages: message._id }
        },
        {
          new: true
        }
      )
        .then(data => console.log("User updated", data))
        .catch(err => console.log(err));
    })
    // .then(() => res.render("private/newsfeed")) //
    .then(() => res.redirect("/messages"))
    .catch(err => {
      console.log("Big error", err);
      res.render("private/create");
    });
});



// FAVOURITES

msgRouter.post('/fav', (req, res, next) => {

  const userId = req.session.currentUser._id;
  const {_id} = req.query;

  let indexOfPostsId;  
  
  
  User.findOne({ _id: userId})
    .then(user => {
      //get array of favourite posts

      const favArr = user.favourites;
      let isInFav = false;

      favArr.forEach((favId, i) => {
        if(favId == _id) {
          isInFav = true;
          indexOfPostsId = i;
          return;
        }
      });
      //remove post favs
      if (isInFav) {
        favArr.splice(indexOfPostsId, 1);
      } else {
        favArr.push(_id);
      }






  User.updateOne({_id: userId}, {favourites: favArr})
      .then(post => {
        if(isInFav) {
            res.status(200).send({statusText: 'removed from fav'})
        } else {
            res.status(200).send({statusText: 'add to fav'})
        }
      })
      .catch(err => {
            res.status(400).send(err)
      });
    })
  .catch(err => console.log(err));


});















module.exports = msgRouter;
