const express = require("express");
const messageRouter = express.Router();

const User = require("../../models/User");
const Message = require("../../models/Message");

messageRouter.get("/", (req, res) => {
  Message.find()
    .populate("author")
    .then(messageArr => {
      messageArr.forEach(message => {
        message["userId"] = req.session.currentUser._id;
      });

      res.render("private/message", { messageArr, userInfo: req.session.currentUser });
    })
    .catch(err => {
      console.log(err);
    });
});

messageRouter.get("/create", (req, res) => {
  res.render("private/create", {
    userInfo: req.session.currentUser
  });
});

// this route allows the logged user to create a message

messageRouter.post("/create", (req, res) => {
  //   const userID = req.session.currentUser._id;
  // //this is what we are creating as a message
  // const { mainMessage } = req.body;
  // // this is the properties the object will have once created
  // Message.create({ mainMessage, author: userID })
  //   .then(result => {
  //     res.render("/message");
  //   })
  //   .catch(err => res.render("/"));

  const newMessage = new Message({
    headerMessage: req.body.headerMessage,
    mainMessage: req.body.mainMessage,
    // isFavourite: req.body.isFavourite,
    // author: req.session.currentUser._id
    // upvotes: req.body.upvotes,
    // downvotes: req.body.downvotes
  });

  newMessage
    .save()
    .then(message => {
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
    .then(() => res.redirect("/message"))
    .catch(err => {
      console.log(err);
      res.render("private/create");
    });
});

module.exports = messageRouter;
