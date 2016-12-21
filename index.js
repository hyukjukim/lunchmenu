// index.js

var express    = require("express");
var mongoose   = require("mongoose");
var bodyParser  = require("body-parser");
var methodOverride = require("method-override");
var flash     = require("connect-flash");
var session    = require("express-session");
var passport   = require("./config/passport");
var app = express();

//WIT.AI
const {Wit, log} = require('node-wit');

const client = new Wit({
  accessToken: '7EBPFDK3IBMX3ISHKONR2F4ZN2GP2OWS',
  actions: {
    send(request, response) {
      return new Promise(function(resolve, reject) {
        console.log(JSON.stringify(response));
        return resolve();
      });
    },
    myAction({sessionId, context, text, entities}) {
      console.log(`Session ${sessionId} received ${text}`);
      console.log(`The current context is ${JSON.stringify(context)}`);
      console.log(`Wit extracted ${JSON.stringify(entities)}`);
      return Promise.resolve(context);
    }
  },
  logger: new log.Logger(log.DEBUG) // optional
});
//

// DB setting
mongoose.connect(process.env.MONGO_DB);
var db = mongoose.connection;
db.once("open", function(){
 console.log("DB connected");
});
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});

// Other settings
app.set('port', (process.env.PORT||5000));
app.set("view engine", "ejs");
app.use(express.static(__dirname+"/"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride("_method"));
app.use(flash());
app.use(session({secret:"MySecret"}));
// Passport //
app.use(passport.initialize());
app.use(passport.session());
// Custom Middlewares //
app.use(function(req,res,next){
 res.locals.isAuthenticated = req.isAuthenticated();
 res.locals.user = req.user;
 next();
});

// Routes
app.use("/", require("./routes/home"));
app.use("/posts", require("./routes/posts"));
//app.use("/contacts", require("./routes/contacts"));
app.use("/users", require("./routes/users"));
app.use("/kakao", require("./routes/kakao"));
// Port setting
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'));
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
/******************************************************************************
// 기본 로그 보는 구문
  console.log(req.body);
 console.log('********************다음**************');
 console.log(req.query);
 console.log('********************다음**************');
 console.log(req.cookies);
 console.log('********************다음**************');
 console.log(req.url);
******************************************************************************/
