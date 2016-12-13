// models/KakaoUser.js

var mongoose = require("mongoose");

var kakaouserSchema = mongoose.Schema({
  user_key: {type: String, unique:true},
  name: {type: String},
  password: {type: String},
  email : {type: String},
  name_flag: {type: String},
  password_flag: {type: String},
  email_flag: {type: String}
});

var KakaoUser = mongoose.model("kakaouser", kakaouserSchema);

module.exports = KakaoUser;
