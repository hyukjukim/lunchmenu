// models/KakaoMsg.js

var mongoose = require("mongoose");

var KakaoMsgschema = mongoose.Schema({
  user_key: {type: String},
  type: {type: String},
  content: {type: String}
});

var KakaoMsg = mongoose.model("kakaoMsg", KakaoMsgSchema);

module.exports = KakaoMsg;
