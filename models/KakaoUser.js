// models/KakaoMsg.js

var mongoose = require("mongoose");

var kakaoUserschema = mongoose.Schema({
  user_key: {type: String, unique:true},
  name: {type: String},
  password: {type: String},
  email : {type: String},
  name_flag: {type: String},
  password_flag: {type: String},
  email_flag: {type: String}
});

var kakaoUser = mongoose.model("kakaoUser", kakaoUserschema);

module.exports = kakaoUser;
