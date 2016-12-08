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

//mongoose.Schema 함수를 사용해서 schema(data구조를 미리 정의해 놓는 것) object를 생성합니다

var contactSchema = mongoose.Schema({
  user_key: {type: String},
  type: {type: String},
  content: {type: String}
});

//mongoose.model함수를 사용하여 contact schema의 model을 생성합니다
var Contact = mongoose.model("contact", contactSchema); //5


app.set('port', (process.env.PORT || 5000));

//Other setttings
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/"));

// bodyParser로 stream의 form data를 req.body에 옮겨 담습니다. 2번은 json data를, 3번은 urlencoded data를 분석해서 req.body를 생성합니다.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method")); // 2



app.get("/", function(req, res){
 res.redirect("/contacts");
});

//INDEX //1
//views/partials/nav.ejs 에서 href로 접근 (href로 접근하는 것은 get만 호출 가능하다.)
app.get("/contacts",function(req, res){
  Contact.find({},function(err,contacts){
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});

// NEW //2
//views/partials/nav.ejs 에서 href로 접근 (href로 접근하는 것은 get만 호출 가능하다.)
app.get("/contacts/new", function(req, res){
 res.render("contacts/new");
});

// CREATE //3
//views/contacts/new.ejs 에서 post로 접근 create는 post로만 가능하다. submit 버튼 누르면 날아옴
app.post("/contacts", function(req, res){
 Contact.create(req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});

// Contacts - show // 4
//req.params.id는 MONGO_DB에서 사용하는 ROWID 같은 개념이다.
// views/contacts/index.ejs 에서 herf로 접근 이름을 클릭하면 MONGO_DB _id를 return으로 날려준다.
app.get("/contacts/:id", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/show", {contact:contact});
  console.log('id' + req.params.id);
 });
});

// Contacts - edit // 5
// views/contacts/show.ejs  에서 herf로 접근. 한 개의 Data만 표출 되므로 따로 선택은 필요 없음
app.get("/contacts/:id/edit", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/edit", {contact:contact});
 });
});

// Contacts - update // 6
// views/contacts/edit.ejs 에서
app.put("/contacts/:id", function(req, res){
 Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts/"+req.params.id);
 });
});

// Contacts - destroy // 7
app.delete("/contacts/:id", function(req, res){
 Contact.remove({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});


//KAKAO TALK

// 카카오톡 연결 1
app.get('/keyboard', function(req, res) {
  res.send({
      "type": "text",
      "buttons": ["시작", "닉네임설정", "내정보변경"]
  });

    res.send({
        "type": "buttons",
        "buttons": ["시작", "닉네임설정", "내정보변경"]
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
