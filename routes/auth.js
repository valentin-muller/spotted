const express = require("express");
const authRouter = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const zxcvbn = require("zxcvbn");
const saltRounds = 10;


authRouter.post('/', (req, res, next) => {})
authRouter.get('/', (req, res, next) => {})


module.exports = authRouter;

