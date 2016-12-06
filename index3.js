'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var mongoose = require("mongoose")


// DB setting
mongoose.connect(process.env.MONGO_DB); // 1
var db = mongoose.connection; // 2
// 3﻿
db.once("open", function() {
    console.log("DB connected");
});
// 4
db.on("error", function(err) {
    console.log("DB ERROR : ", err);
});
// DB schema // 4
var contactSchema = mongoose.Schema({
    user_key: {
        type: String, required:true
    }, //name:{type:String, required:true, unique:true},
    type: {
        type: String
    },
    content: {
        type: String
    }
});
var Contact = mongoose.model("contact", contactSchema); //5



app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
    extended: false
}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function(req, res) {
    res.send('Hello world, I am a KAKAO chat bot')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


// 카카오톡 연결 1
app.get('/keyboard', function(req, res) {
    res.send({
        "type": "buttons",
        "buttons": ["선택 1", "선택 2", "선택 3"]
    })
})

app.post('/message', function(req, res) {
    res.send(
{
    "message":{
        "text" : "테스트 페이지 입니다!"
    }
}
);


    console.log(req.body);
    Contact.create({
        user_key : req.body.user_key,
        type    : req.body.type,
        content: req.body.content
    }, function(error, doc) {
        // doc.children[0]._id will be undefined
    });
   res.sendStatus(200)
})

app.post('/friend', function(req, res) {
    res.sendStatus(200)
})

app.delete('/friend/:user_key', function(req, res) {
    res.sendStatus(200)
})

app.delete('/chat_room/:user_key', function(req, res) {
    res.sendStatus(200)
})