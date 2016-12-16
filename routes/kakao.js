// routes/kakao.js
var express = require("express");
var router = express.Router();
var KakaoMsg = require("../models/KakaoMsg");
var KakaoUser = require("../models/KakaoUser"); //유저 ID 매칭을 위한 작업
var name_flag_array = new Array("");
var name_array = new Array("");

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


//닉네임설정 버튼을 누르면
if (req.body.content === '닉네임설정') {
      //닉네임 변경 스타트,
      KakaoUser.findOneAndUpdate({'user_key': req.body.user_key},{'name_flag':'1'}, {new: true}, function(err, users) {
          if (err) {console.log("Something wrong when updating data!");}
          //이름 바꿨다는 뜻으로 name_flag
          name_flag_array.push("name_make");
      });

      //이름 바꿀 것인지 질문
      res.send({
                  "message": {
                        "text": "닉네임설정 버튼을 누르셨습니다. 사용하실 닉네임을 입력해 주세요."
                  }
              });
  }

if(name_flag_array.pop()==='name_make'){
    KakaoUser.findOneAndUpdate({'user_key': req.body.user_key}, {'name': req.body.content}, {new: true}, function(err, users) {
      if (err) {console.log("Something wrong when updating data!");}
    });
    //생성된 이름 표출
    res.send({
                "message": {
                      "text": "닉네임생성이 완료 되었습니다. \n앞으로 님은 " + req.body.content +" 님으로 불리게 될 것입니다."
                }
            });
}

if (req.body.content === '시작') {
      KakaoUser.findOne({'user_key':req.body.user_key}, function (err, users) {
            if (err) return res.json(err);
            console.log("gggggggggggggggggggg"+{users}.users.name);
            name_array.push({users}.users.name);
            });

}
            var name = name_array.pop();
            res.send({
                        "message": {
                              "text": "안녕하세요. " + name +"님. 혹시 아직 닉네임이 없으시다면 가입 부탁 드립니다."
                        }
              });
/*
    //닉네임설정 버튼을 누른 경우
    if (req.body.content === '닉네임설정') {
      if(name_flag_cnt === 0){
            res.send({
                "message": {
                    "text": "닉네임설정 버튼을 누르셨습니다. 닉네임을 입력해 주세요."
                }
            });
            KakaoUser.findOne({'user_key':req.body.user_key}, function (err, users) {
        if (err) return res.json(err);
        if({users}.users.name_flag ==='0'){
          console.log('111111111', {users}) ; //전체 객체
          KakaoUser.findOneAndUpdate({'user_key': req.body.user_key}, {'name_flag': '1'}, {new: true}, function(err, doc) {
              if (err) {console.log("Something wrong when updating data!");}

          });
        }
      });
      }
}
*/

/*          KakaoUser.findOne({'user_key':req.body.user_key}, function (err, users) {
          if (err) return res.json(err);
          console.log("gggggggggggggggggggg"+{users}.users.name_flag);
          array_cnt.push({users}.users.name_flag);
          });

          if(array_cnt.pop()==='1'){
            res.send({
                "message": {
                    "text": "닉네임설정 버튼을 누르셨습니다. 닉네임을 입력해 주세요."
                }
            });
          }*/

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
