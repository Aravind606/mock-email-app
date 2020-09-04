const mongoose = require("mongoose");

const mailSchema = new mongoose.Schema({
  fromAddress: {
    type: String
  },
  toAddress: {
    type: String
  },
  senderName: {
    type: String
  },
  receiverName: {
    type: String
  },
  subject: {
    type: String,
  },
  details: {
    type: String,
  },
  createdOn: {
    type: Date,
    default: Date.now
  }
});

const Mail = mongoose.model("Mail", mailSchema);

exports.Mail = Mail;
