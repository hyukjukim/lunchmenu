
// 카카오톡 기록 사이트
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require("body-parser");
var methodOverride = require("method-override");
var app = express();
var menu = require("./menu");
var keuser = require("./keuser");
var Kakaomsg = require("./Kakaomsg");
var keusers = '';
var d = new Date();


function message_f(){

keuser.findOne({
      'user_key': req.body.user_key
  }, function(err, users) {
      if (err) return res.json(err);
      obj = JSON.stringify(users); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
      keusers = JSON.parse(obj); //json 파싱하기 위해 변수에 배정
            if(keusers.temp1 === '1'){
              if (req.body.content === '시작'){
                //findOneAndUpdate
                          keuser.findOneAndUpdate({
                              'user_key': req.body.user_key
                          }, {
                              'temp1': '0',
                          }, {
                              new: true
                          }, function(err, users) {
                          console.log('20');
                              if (err) {
                                  console.log("Something wrong when updating data!");
                              }
                              obj = JSON.stringify(users); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
                              keusers = JSON.parse(obj); //json 파싱하기 위해 변수에 배정
                              res.send({
                                "message": {
                                  "text": "마스터님께서 비정상 종료 하여 로그아웃 처리 되었습니다."
                                },
                                "keyboard": {
                                  "type": "buttons",
                                  "buttons": ["시작"]
                                }
                              });
                          });
                //findOneAndUpdate
              }

              else if (req.body.content === '전체 식단보기'){
                res.send({
                  "message": {
                    "text": "주인님. 환영합니다. \n전체 식단보기 기능은 구현 중 입니다."
                  },
                  "keyboard": {
                    "type": "buttons",
                    "buttons": ["전체 식단보기","신규 식단 입력하기","로그아웃"]
                  }
                });
              }
              else if (req.body.content === '신규 식단 입력하기'){
                res.send({
                  "message": {
                    "text": "주인님. 환영합니다. \n신규 식단 입력하기 기능은 구현 중 입니다."
                  },
                  "keyboard": {
                    "type": "buttons",
                    "buttons": ["전체 식단보기","신규 식단 입력하기","로그아웃"]
                  }
                });
              }
              else if (req.body.content === '로그아웃'){
                //findOneAndUpdate
                          keuser.findOneAndUpdate({
                              'user_key': req.body.user_key
                          }, {
                              'temp1': '0',
                          }, {
                              new: true
                          }, function(err, users) {
                          console.log('20');
                              if (err) {
                                  console.log("Something wrong when updating data!");
                              }
                              obj = JSON.stringify(users); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
                              keusers = JSON.parse(obj); //json 파싱하기 위해 변수에 배정
                              res.send({
                                "message": {
                                  "text": "로그아웃 되었습니다."
                                },
                                "keyboard": {
                                  "type": "buttons",
                                  "buttons": ["시작"]
                                }
                              });
                          });
                //findOneAndUpdate
              }
            }
            else{
//시작
    if (req.body.content === '시작'){
      keuser.create({
          user_key: req.body.user_key,
          name_flag: '1',
          company_name: '0',
          score: '0',
          name: '',
          date: '7',
          date2: '7',
          password: '0',
          email: '0',
          temp1: '0',
          temp2: '0'
      },{
          new: true
      }, function(err, users) {
console.log('2');
      res.send({
        "message": {
          "text": "안녕하세요.\n회사 식단 관리 프로그램에 오신 것을 환영합니다."
        },
        "keyboard": {
          "type": "buttons",
          "buttons": ["오늘의 메뉴","관리자 암호입력","☞☞옆으로넘기기","닉네임설정","처음으로","개발자소개"]
        }
      });
      });
    }

    else if(req.body.content === '☞☞옆으로넘기기'){
      res.send({
        "message": {
          "text": "☞☞옆으로넘기기는 버튼이 아니라 손가락을 사용하여 옆으로 넘겨보라는 뜻이예요.",
        },
        "keyboard": {
          "type": "buttons",
          "buttons": ["오늘의 메뉴","관리자 암호입력","☞☞옆으로넘기기","닉네임설정","처음으로","개발자소개"]
        }
      });
    }
    else if(req.body.content === '처음으로'){
console.log('4');
      keuser.findOne({
          'user_key': req.body.user_key
      }, function(err, users) {
console.log('5');
          if (err) return res.json(err);
          obj = JSON.stringify(users); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
          keusers = JSON.parse(obj); //json 파싱하기 위해 변수에 배정
          console.log('6');
                if(keusers.name_flag === '3'){
          console.log('7');
                  res.send({
                    "message": {
                      "text": keusers.name+"님!!! 반갑습니다. \n회사 식단 관리 프로그램에 오신 것을 환영합니다."},
                    "keyboard": {
                      "type": "buttons",
                      "buttons": ["오늘의 메뉴","관리자 암호입력","☞☞옆으로넘기기","닉네임설정","처음으로","개발자소개"]
                    }
                  });
                }
                else{
          console.log('8');
                        res.send({
                          "message": {
                            "text": "안녕하세요. 닉네임이 없으시군요. \n닉네임이 있어야 식단 점수에 참여하실 수 있습니다.",
                          },
                          "keyboard": {
                            "type": "buttons",
                            "buttons": ["오늘의 메뉴","관리자 암호입력","☞☞옆으로넘기기","닉네임설정","처음으로","개발자소개"]
                          }
                        });
                      }

      });

    }

    else if (req.body.content === '개발자소개') {
console.log('9');
      res.send({
        "message": {
          "text": "안녕하세요.\n 저는 Programmer 입니다. \n컴퓨터과학 전공을 하였으며, \nAI 와 Chatbot을 개발 중입니다. \n개발 관련 궁금한 사항 및 \n건의 or 사업 제안사항 있으시면 \nnode-js@naver.com으로 메일 주세요",
          "photo": {
            "url": "http://khj.heroku.com/images/master.jpg",
            "width": 640,
            "height": 480
          }
        },
        "keyboard": {
          "type": "buttons",
          "buttons": [
            "처음으로"
          ]
        }
      });
    }

    else if (req.body.content === '닉네임설정') {
          //hero.creatHero(req,res);
          res.send({
              "message": {
                  "text": "안녕하세요 \n사용하실 닉네임을 말씀 해 주세요."
              }
          });

    }

    else if (req.body.content === '관리자 암호입력') {
          //hero.creatHero(req,res);
          res.send({
              "message": {
                  "text": "당신은 저의 마스터 이십니까..?"
              }
          });

    }

    else if (req.body.content === '오늘의 메뉴'||req.body.content === '이전으로') {
      res.send({
        "message": {
          "text": "안녕하세요.\n [한식] or [양식/일품] or [샐러드]\n중에서 선택하세요.",
        },
        "keyboard": {
          "type": "buttons",
          "buttons": [
            "한식","양식/일품","샐러드"
          ]
        }
      });
    }


    else if (req.body.content === "한식"||req.body.content === "양식/일품"||req.body.content === "샐러드"){

        console.log(d.getFullYear()+'0'+(d.getMonth()+1)+d.getDate());
        console.log(d.getMonth()+1); //number타입
        console.log('0'+(d.getMonth()+1)); //String 타입

          //findOne
              menu.findOne({
                  'year' :d.getFullYear(),
                  'month': '0'+(d.getMonth()+1),
                  'date': d.getDate(),
                  'condition' : req.body.content
              }, function(err, menus) {
                  if (err) return res.json(err);
                  obj = JSON.stringify(menus); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
                  menus = JSON.parse(obj); //json 파싱하기 위해 변수에 배정
                          res.send({
                            "message": {
                              "text": "오늘의 ["+req.body.content+"] 메뉴는\n\n"+menus.menu1+"\n"+menus.menu2+"\n"+menus.menu3+"\n"+menus.menu4+"\n"+menus.menu5+"\n"+menus.menu6+"\n"+menus.menu7+"\n입니다."},
                            "keyboard": {
                              "type": "buttons",
                              "buttons": ["처음으로","이전으로","메뉴 점수 주기"]
                            }
                          });

              });
          //findOne
        }



      else if (req.body.content === '생성완료'){
console.log('16');
        res.send({
          "message": {
            "text": "닉네임 생성을 축하드립니다. \n 앞으로 방을 나갔다가 다시 들어오셔도, 님의 이름을 항상 기억할 것 입니다. 해당 기능을 사용하여 추후 많은 컨텐츠를 제작 할 예정이니, 기대하셔도 좋습니다. ^^"
          },
          "keyboard": {
            "type": "buttons",
            "buttons": [
              "처음으로"
            ]
          }
        });
      }
      else if (req.body.content === '생성취소'){
console.log('17');
        res.send({
          "message": {
            "text": "앗 맘에 안드신다구요? 난 "+ keusers.name +"좋은데.. 얼른 다시 생성해봐요.. "
          },
          "keyboard": {
            "type": "buttons",
            "buttons": [
              "닉네임설정",
              "처음으로"
            ]
          }
        });

        keuser.findOneAndUpdate({
            'user_key': req.body.user_key
        }, {
            'name': '',
            'name_flag': '1'
        }, {
            new: true
        }, function(err, users) {
console.log('18');
            if (err) {
                console.log("Something wrong when updating data!");
            }
            obj = JSON.stringify(users); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
            keusers = JSON.parse(obj); //json 파싱하기 위해 변수에 배정
        });

      }
      else if (req.body.content === '메뉴 점수 주기'){
console.log('16');
        res.send({
          "message": {
            "text": "아직 구현 중 입니다."
          },
          "keyboard": {
            "type": "buttons",
            "buttons": [
              "이전으로","처음으로"
            ]
          }
        });
      }

//필살 초기화키

      else if (req.body.content === '1200312'){

//findOneAndUpdate
          keuser.findOneAndUpdate({
              'user_key': req.body.user_key
          }, {
              'temp1': '1',
          }, {
              new: true
          }, function(err, users) {
          console.log('20');
              if (err) {
                  console.log("Something wrong when updating data!");
              }
              obj = JSON.stringify(users); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
              keusers = JSON.parse(obj); //json 파싱하기 위해 변수에 배정
              res.send({
                "message": {
                  "text": "주인님. 환영합니다. \n원하시는 마스터 권한을 입력해 주세요."
                },
                "keyboard": {
                  "type": "buttons",
                  "buttons": ["전체 식단보기","신규 식단 입력하기","로그아웃"]
                }
              });
          });
//findOneAndUpdate
      }
      else {

console.log('19');
        keuser.findOneAndUpdate({
            'user_key': req.body.user_key
        }, {
            'name': req.body.content,
            'name_flag': '3'
        }, {
            new: true
        }, function(err, users) {
console.log('20');
            if (err) {
                console.log("Something wrong when updating data!");
            }
            obj = JSON.stringify(users); //객체 또는 배열을 인자로 받아 string을 json 형식으로 변경
            keusers = JSON.parse(obj); //json 파싱하기 위해 변수에 배정

        });


        res.send({
          "message": {
            "text": "입력하신 닉네임은 " +req.body.content +"입니다. 맘에 드십니까? \n(하하)맘에 드시면 [생성완료]\n(흑흑)재 생성은   [생성취소]\n 버튼을 눌러주세요",
          },
          "keyboard": {
            "type": "buttons",
            "buttons": [
              "생성완료",
              "생성취소"
            ]
          }
        });

      }

                        }
//else
          });
//findOne

}

module.exports = message_f;
