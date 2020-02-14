const express = require('express')
const messageRouter = express.Router()



messageRouter.get('/', (req, res) => {})

messageRouter.post('/', (req, res) => {
    const userID = req.session.currentUser._id;
    
})
  

module.exports = messageRouter;
