// models/Kuser.js

var mongoose = require("mongoose");

var kuserSchema = mongoose.Schema({
  user_key: {type: String, unique:true},
  name: {type: String},
  password: {type: String},
  email : {type: String},
  name_flag: {type: String},
  password_flag: {type: String},
  email_flag: {type: String}
});

var Kuser = mongoose.model("kuser", kuserSchema);

module.exports = Kuser;
