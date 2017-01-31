// models/Kakaomsg.js

var mongoose = require("mongoose");

var kakaomsgSchema = mongoose.Schema({
    user_key: {
        type: String
    },
    name: {
        type: String
    },
    type: {
        type: String
    },
    content: {
        type: String
    }
});

var Kakaomsg = mongoose.model("kakaomsg", kakaomsgSchema);

module.exports = Kakaomsg;
