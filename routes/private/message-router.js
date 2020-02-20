const express = require("express");
const msgRouter = express.Router();

const User = require("../../models/User");
const Message = require("../../models/Message");

// GET /messages
msgRouter.get("/", (req, res) => {
  Message.find()
    .populate("author")
    .then(messageArr => {
      messageArr.reverse().map(message => {
        message.isFavourite = false;
        console.log("message", message);
      });

      User.findById(req.session.currentUser._id)
        .then(user => {
          user.favourites.forEach(messageId => {
            messageArr.forEach(message => {
              if (messageId.toString() === message._id.toString()) {
                message.isFavourite = true;
                return;
              }
            });
          });
          res.render("private/newsfeed", {
            messageArr
          });
        })
        .catch(err => console.log(err));
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

msgRouter.get("/fav", (req, res, next) => {
  const userId = req.session.currentUser._id;
  const { _id } = req.query;

  let indexOfPostsId;

  User.findOne({ _id: userId })
    .then(user => {
      //get array of favourite posts

      const favArr = user.favourites;
      let isInFav = false;
      favArr.forEach((favId, i) => {
        if (favId == _id) {
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

      User.updateOne({ _id: userId }, { favourites: favArr })
        .then(user => {
          if (isInFav) {
            res.status(200).send({ statusText: "fav" });
          } else {
            res.status(200).send({ statusText: "unfav" });
          }
        })
        .catch(err => {
          res.status(400).send(err);
        });
    })
    .catch(err => console.log(err));
});

module.exports = msgRouter;

msgRouter.get("/emoji/:type/:messageId", (req, res, next) => {
  const { type, messageId } = req.params;
  Message.findOne({ _id: messageId }, { $inc: { [type]: 1 } })
    .then(message => {})
    .catch(err => console.log(err));
});

// GET /messages/emotion/:type/:messageId
/*
const {type, messageId} = req.params
Message.findOne({ _id: messageId}, { $inc : { [type]: 1  } } )

*/
