const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require('mongoose-unique-validator');
var jwt = require("jsonwebtoken");

const User = new Schema(
  {
    username: {
      type: String,
      unique: true
    },
    password: {
      type: String
    },
  },
  {
    collection: "users"
  }
);
User.plugin(uniqueValidator, { message: 'Username already in use.' });
module.exports = mongoose.model("User", User);
