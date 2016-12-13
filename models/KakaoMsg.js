// models/KakaoMsg.js

var mongoose = require("mongoose");

var kakaoMsgschema = mongoose.Schema({
  user_key: {type: String},
  type: {type: String},
  content: {type: String}
});

var KakaoMsg = mongoose.model("KakaoMsg", kakaoMsgschema);

module.exports = KakaoMsg;
