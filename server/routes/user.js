const express = require('express');
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const _ = require('lodash');
const jwt = require('jsonwebtoken')

const {
  User
} = require('../models/user');

const router = express.Router();

router.post('/register', async (req, res) => {

  let user = await User.findOne({
    email: req.body.email
  });

  if (user) {
    return res.send({
      "message": "email already exist"
    })
  }
  const salt = await bcrypt.genSalt(10);
  req.body.password = await bcrypt.hash(req.body.password, salt);

  user = new User(_.pick(req.body, ['firstName', 'lastName', 'email', 'password']));

  await user.save();

  res.status(200).send({
    "message": "registration success"
  })
  // const token = jwt.sign({
  //   id: user._id,
  //   email: user.email,
  //   firstName: user.firstName
  // }, 'abcde');
  // res.send(token);
})

router.post('/login/email', async (req, res) => {
  console.log(req.body)
  const user = await User.findOne({
    email: req.body.email
  });
  if (!user) {
    return res.send({
      "message": "invalid email"
    })
  }
  res.send({
    email: user.email,
    name: user.firstName
  })
})

router.post('/login/password', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email
  });
  const validPassword = await bcrypt.compare(req.body.password, user.password);

  if (!validPassword) {
    return res.send({
      "message": "invalid password"
    })
  }
  const token = jwt.sign({
    id: user._id,
    email: user.email,
    firstName: user.firstName
  }, 'abcde')
  res.send({
    "token": token
  })
})

module.exports = router;
