// routes/kakao.js
var express = require("express");
var router = express.Router();
var KakaoMsg = require("../models/KakaoMsg");
var KakaoUser = require("../models/KakaoUser"); //유저 ID 매칭을 위한 작업
var name_array = new Array("");
var name_flag_array = new Array("");

// 카카오톡 연결 1
router.get('/keyboard', function(req, res) {
    res.send({
        "type": "buttons",
        "buttons": ["시작", "닉네임설정", "내정보변경"],
    });
});

router.post('/message', function(req, res) {

    //상대가 처음 말을 걸었을 경우 동작. 상대의 USER KEY 값과 FLAG 정보를 입력한다.
    KakaoUser.create({
        user_key: req.body.user_key,
        name_flag: '0',
        password_flag: '0',
        email_flag: '0',
        name: '낯선손'
    }, function(error, doc) {});

    KakaoUser.findOne({'user_key':req.body.user_key}, function (err, users) {
          if (err) return res.json(err);
          name_flag_array.push({users}.users.name);
          name_array.push({users}.users.name_flag);
        });

//닉네임설정 버튼을 누르면
if (req.body.content === '닉네임설정') {
      if(name_flag_array.pop()==='0'){
        res.send({
                    "message": {
                          "text": "닉네임 처음 생성하시네요. 뭐 만들고 싶으세요?"
                    }
                });

      //닉네임 변경 스타트,
      KakaoUser.findOneAndUpdate({'user_key': req.body.user_key},{'name_flag':'1', 'name': req.body.content}, {new: true}, function(err, users) {
          if (err) {console.log("Something wrong when updating data!");}
      });
      name_flag_array.push({users}.users.name);
      name_array.push({users}.users.name_flag);

}
}

    //상대가 말하는 메세지를 기록하는 부분
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
