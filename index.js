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
var bodyParser = require("body-parser");
var methodOverride = require("method-override"); // 1
var app = express();


//DB Setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
//Connection Succeed
db.once("open", function(){
  console.log("****************** MONGO_DB CONNECTED ******************");
});
//Connection Failed
db.on('error', function(err){
  console.log("****************** DB CONNECTION ERR : ******************" ,err);
});


app.set('port', (process.env.PORT || 5000));

//Other setttings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/"));
// bodyParser로 stream의 form data를 req.body에 옮겨 담습니다. 2번은 json data를, 3번은 urlencoded data를 분석해서 req.body를 생성합니다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));

//Routes
app.use("/", require("./routes/home"));
app.use("/contacts", require("./routes/contacts"));
app.use("/kakao", require("./routes/kakao"));

/******************************************************************************

//{nameQuery:'value'}를 뽑아주는 구문. 주소 끝에 ?nameQuery='value'써줘야 한다.
app.get("/hello", function(req,res){
 res.render("hello", {name:req.query.nameQuery});
console.log(req.query);
});

//파라미터에 입력하는 값을 name value로 넣는 구문
app.get("/hello/:nameParam", function(req,res){
 res.render("hello", {name:req.params.nameParam});
 console.log(req.query);
});
******************************************************************************/

/*
//Port Setting
app.listen(5000, function(){
  console.log("Server on!");
});
*/

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
});
