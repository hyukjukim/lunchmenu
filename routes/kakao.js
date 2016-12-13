// routes/kakao.js
var express = require("express");
var router = express.Router();
var KakaoMsg = require("../models/KakaoMsg");
var KakaoUser  = require("../models/KakaoUser"); //유저 ID 매칭을 위한 작업

// 카카오톡 연결 1
router.get('/keyboard', function(req, res) {
    res.send({
        "type": "buttons",
        "buttons": ["시작", "닉네임설정", "내정보변경"],
    });

});

router.post('/message', function(req, res) {
/*
  KakaoUser.findOne({'name':'guitar84'}, function (err, users) {
    if (err) return res.json(err);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', {users}) ;
    console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', {users:users.name}) ;
  });

*///req.body.user_key === KakaoUser.findOne({'user_key':'guitar84'}
//메세지를 기록하는 부분

//업데이트 하는 부분
console.log('************************************'+ req.query._id);
KakaoUser.findOneAndUpdate({'user_key': 'O2yX5hJ_6vB5'},{'name_flag':'1'},{new: true}, function(err, doc){
    if(err){
        console.log("Something wrong when updating data!");
    }
});




      KakaoUser.findOne({'name':'김혁주ㅁ'}, function (err, users) {
        if (err) return res.json(err);
        //console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', {users}) ;
        //console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', {users:users.name}) ;
      });

    if(req.body.content == '시작'){
      res.send({
          "message":{
              "text" : "시작 버튼을 누르셨습니다. 아직 기능 구현 중 입니다.(2016.12.9)\n월요일에 추가 구현 할 예정 입니다."
          }
      });
    }

    if(req.body.content === '닉네임설정'){
      res.send({
          "message":{
              "text" : "사용하실 닉네임을 입력해주세요. 아직 기능 구현 중 입니다.(2016.12.9)."
          }
      });
    }

    if(req.body.content === '내정보변경'){
      res.send({
          "message":{
              "text" : "정보 변경을 입력하셨습니다. 아직 기능 구현 중 입니다.(2016.12.9)."
          }
      });
    }
    //console.log(req.body);

    /*
    //유저 이름을 기억하는 부분
    User.create({
        username : req.body.user_key, //이름은 고유값
        name    : req.body.type, //닉네임은 아무거나
        password : req.body.content //비밀번호 설정
    }, function(error, doc) {
    });
    */

    //메세지를 기록하는 부분
    KakaoMsg.create({
        user_key : req.body.user_key,
        type    : req.body.type,
        content: req.body.content
    }, function(error, doc) {
    });


   res.sendStatus(200);
});

router.post('/friend', function(req, res) {
    res.sendStatus(200);
});

router.delete('/friend/:user_key', function(req, res) {
    res.sendStatus(200);
});

router.delete('/chat_room/:user_key', function(req, res) {
    res.sendStatus(200);
});

module.exports = router;
