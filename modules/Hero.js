// ./modules/Hero.js

var express = require('express');
var app = express();


function creatHero(req,res){
        res.send({
          "message": {
            "text": "원하는 캐릭터를 선택해 주세요",
          },
          "keyboard": {
            "type": "buttons",
            "buttons": [
              "뚜벅이전사",
              "간지러운궁수",
              "몸빵약한법사",
              "마스터",
              "처음으로"
            ]
          }
        });
            console.log(Math.floor(Math.random()*10));
            console.log(Math.floor(Math.random()*10));
            console.log(Math.floor(Math.random()*10));
            console.log(Math.floor(Math.random()*10));
        if (req.body.content === '뚜벅이전사'||req.body.content === '간지러운궁수'||req.body.content === '몸빵약한법사'||req.body.content === '마스터') {
          res.send({
            "message": {
              "text": "2017-01-31.. 구현 중 입니다.",
            },
            "keyboard": {
              "type": "buttons",
              "buttons": [
                "처음으로"
              ]
            }
          });
        }
}

exports.creatHero = creatHero;
