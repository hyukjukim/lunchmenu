// models/Post.js

var mongoose = require("mongoose");

// schema
var postSchema = mongoose.Schema({ // 1
 title:{type:String, required:true},
 body:{type:String},
 createdAt:{type:Date, default:Date.now}, // 2
 updatedAt:{type:Date},
},{
 toObject:{virtuals:true} // 4
});

// model & export
var Post = mongoose.model("post", postSchema);
module.exports = Post;
