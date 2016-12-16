// routes/kakao.js
var express = require("express");
var router = express.Router();
var KakaoMsg = require("../models/KakaoMsg");
var KakaoUser = require("../models/KakaoUser"); //유저 ID 매칭을 위한 작업
var name_flag_cnt = 0;
// 카카오톡 연결 1
router.get('/keyboard', function(req, res) {
    res.send({
        "type": "buttons",
        "buttons": ["닉네임설정"],
        //"buttons": ["시작", "닉네임설정", "내정보변경"],
    });
});

router.post('/message', function(req, res) {

    //상대가 처음 말을 걸었을 경우 동작. 상대의 USER KEY 값과 FLAG 정보를 입력한다.
    KakaoUser.create({
        user_key: req.body.user_key,
        name_flag: '0',
        password_flag: '0',
        email_flag: '0'
    }, function(error, doc) {});

    if (req.body.content === '닉네임설정') {

res.send({
    "message": {
        "text": "닉네임설정 버튼을 누르셨습니다. 닉네임을 입력해 주세요."
    }
});
    console.log(name_flag_cnt+'ASDFASDFASDFASDFASDF' + req.body.content);
}
    //req.body.user_key === KakaoUser.findOne({'user_key':'guitar84'}
    //메세지를 기록하는 부분

/*
    if (req.body.content == '시작') {
        res.send({
            "message": {
                "text": "시작 버튼을 누르셨습니다. 아직 기능 구현 중 입니다.(2016.12.16)\n월요일에 추가 구현 할 예정 입니다."
            }
        });
    }





    if (req.body.content === '내정보변경') {
        res.send({
            "message": {
                "text": "정보 변경을 입력하셨습니다. 아직 기능 구현 중 입니다.(2016.12.16)."
            }
        });
    }
    */
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
        user_key: req.body.user_key,
        type: req.body.type,
        content: req.body.content
    }, function(error, doc) {});


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
