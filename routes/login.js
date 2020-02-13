const express = require('express');
const loginRouter = express.Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');
const zxcvbn = require('zxcvbn');
const saltRound = 10;

loginRouter.get("/", (req, res) => {});

loginRouter.post("/", (req, res) => {});

module.exports = loginRouter;

