
// routes/contacts.js

var express = require("express");
var Contact = require("../models/Contact")
var app = express();

//KAKAO TALK

// 카카오톡 연결 1
app.get('/keyboard', function(req, res) {
    res.send({
        "type": "buttons",
        "buttons": ["시작", "닉네임설정", "내정보변경"],
    });
});


app.post('/message', function(req, res) {


    if(req.body.content == '시작'){
      res.send({
          "message":{
              "text" : "시작 버튼을 누르셨습니다. https://khj.herokuapp.com 으로 가서 확인하세요."
          }
      });
    }

    if(req.body.content === '닉네임설정'){
      res.send({
          "message":{
              "text" : "사용하실 닉네임을 입력해주세요. 당신의 대화 내용은 https://khj.herokuapp.com 에 모두 기록 됩니다. 가서 확인하세요."
          }
      });
    }

    if(req.body.content === '내정보변경'){
      res.send({
          "message":{
              "text" : "정보 변경을 입력하셨습니다. 당신의 대화 내용은 https://khj.herokuapp.com 에 모두 기록 됩니다. 가서 확인하세요."
          }
      });
    }

    console.log(req.body);

    Contact.create({
        user_key : req.body.user_key,
        type    : req.body.type,
        content: req.body.content
    }, function(error, doc) {
    });
   res.sendStatus(200);
});

app.post('/friend', function(req, res) {
    res.sendStatus(200);
});

app.delete('/friend/:user_key', function(req, res) {
    res.sendStatus(200);
});

app.delete('/chat_room/:user_key', function(req, res) {
    res.sendStatus(200);
});
