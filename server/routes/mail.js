const express = require('express');
const mongoose = require("mongoose");
const _ = require('lodash');


const {
  Mail
} = require('../models/mail');
const {
  User
} = require('../models/user');

const router = express.Router();

router.post('/', async (req, res) => {
  const validEmail = await User.findOne({
    email: req.body.toAddress
  });

  if (!validEmail) {
    return res.send({
      "message": "invalid email address"
    })
  }
  const senderName = await User.findOne({
    email: req.body.fromAddress
  });

  req.body.senderName = senderName.firstName;
  req.body.receiverName = validEmail.firstName;

  const mail = await new Mail(req.body).save();
  res.send(mail);
})

router.get('/inbox/:id', async (req, res) => {
  const userEmail = await User.findOne({
    _id: req.params.id
  });
  const userInbox = await Mail.find({
    toAddress: userEmail.email
  }).sort({
    $natural: -1
  });
  res.send(userInbox)
})

router.get('/sent/:id', async (req, res) => {
  const userEmail = await User.findOne({
    _id: req.params.id
  });
  const userInbox = await Mail.find({
    fromAddress: userEmail.email
  }).sort({
    $natural: -1
  });
  res.send(userInbox)
})

router.get('/view-mail/:id', async (req, res) => {
  const mail = await Mail.findOne({
    _id: req.params.id
  });
  res.send(mail);
})
module.exports = router;
