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
}

exports.creatHero = creatHero;
