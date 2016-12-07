/* 기본 로그 보는 구문
  console.log(req.body);
 console.log('********************다음**************');
 console.log(req.query);
 console.log('********************다음**************');
 console.log(req.cookies);
 console.log('********************다음**************');
 console.log(req.url);
 */

var express = require('express');
var mongoose = require('mongoose');
var app = express();

//DB Setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;

db.once("open", function(){
  console.log("****************** MONGO_DB CONNECTED ******************");
});

db.on('error', function(err){
  console.log("****************** DB CONNECTION ERR : ******************" ,err);
});


//Other setttings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/public"));

// 2
app.get("/hello", function(req,res){
 res.render("hello", {name:req.query.nameQuery}); //{nameQuery:'value'}를 뽑아주는 구문. 주소 끝에 ?nameQuery='value'써줘야 한다.
console.log(req.query);
});

// 3
app.get("/hello/:nameParam", function(req,res){
 res.render("hello", {name:req.params.nameParam}); //파라미터에 입력하는 값을 name value로 넣는 구문
 console.log(req.query);
});



//Port Setting
app.listen(3000, function(){
  console.log("Server on!");
});
