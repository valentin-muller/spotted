const express = require("express");
const messageRouter = express.Router();

const User = require("../../models/User");
const Message = require("../../models/Message");

// this route allows the logged
messageRouter.post("./create", (req, res) => {
  const userID = req.session.currentUser._id;

  //this is what we are creating as a message
  const { mainMessage } = req.body;
  // this is the properties the object will have once created
  Message.create({ mainMessage, author: userID })

    .then(result => {
      res.render("/messages");
    })
    .catch(err => res.render("/"));
});

messageRouter.get("./create", (req, res) => {
  res.render("private/create", {
    userInfo: req.session.currentUser
  });
});

//this is rendering
messageRouter.get("/", (req, res) => {
  Message.find()
    .then(messageArr => {
      res.render("private/messages", { messageArr });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = messageRouter;

// //this routes allows the logged in user to create a message to post
// messageRouter.post("/create", (res, req, next) => {
//   // userID if logged in
//   const userID = req.session.currentUser._id;
//   //instantiating the object and specifying the properties
//   const oneMessage = new Message({
//     headerMessage: req.body.headerMessage,
//     mainMessage: req.body.mainMessage,
//     date: req.body.date,
//     isFavourite: req.body.isFavourite,
//     author: userID,
//     upvotes: req.body.upvotes,
//     downvotes: req.body.downvotes
//   });

//   oneMessage
//     .save()
//     .then(data => {
//       //push the message into userMessage array
//     })
//     .then(() => {
//       res.redirect("/messages");
//     })
//     .catch(err => {
//       console.log(err);
//     });
// });

// this routes gets all the messages from the db and renders them
// messageRouter.get("/newsfeed", (req, res) => {
//   //looks for the Message Object
//   Message.find() //.find is a mongoose method

//     //populates the page with message
//     // .populate("messages") to check
//     .then(allMessages => {
//       //populates the newsfeed page with allMessages
//       res.render("private/newsfeed", {
//         allMessages //we need to figure out what to put in it because Message model has properties we don't want to show
//       });
//     })
//     .catch(err => console.log(err));
// });
