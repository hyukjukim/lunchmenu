// models/Contact.js

var mongoose = require("mongoose");

var contactaSchema = mongoose.Schema({
  user_keya: {type: String},
  type: {type: String},
  content: {type: String}
});

var Contact = mongoose.model("contacta", contactaSchema);

module.exports = Contact;
