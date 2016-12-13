// models/KakaoMsg.js

var mongoose = require("mongoose");

var kakaomsgSchema = mongoose.Schema({
  user_key: {type: String},
  type: {type: String},
  content: {type: String}
});

var KakaoMsg = mongoose.model("kakaomsg", kakaomsgSchema);

module.exports = KakaoMsg;
