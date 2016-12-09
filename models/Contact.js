// models/Contact.js

var mongoose = require("mongoose");

var contactSchema = mongoose.Schema({
  user_key: {type: String},
  type: {type: String},
  content: {type: String}
});

var Contact = mongoose.model("contact", contactSchema);

module.exports = Contact;
