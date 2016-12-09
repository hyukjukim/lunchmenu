/*

// routes/contacts.js

var express = require("express");
var router = express.Router();
var Contact = require("../models/Contact");


//INDEX //1
//views/partials/nav.ejs 에서 href로 접근 (href로 접근하는 것은 get만 호출 가능하다.)
router.get("/",function(req, res){
  Contact.find({},function(err,contacts){
    if(err) return res.json(err);
    res.render("contacts/index", {contacts:contacts});
  });
});

// NEW //2
//views/partials/nav.ejs 에서 href로 접근 (href로 접근하는 것은 get만 호출 가능하다.)
router.get("/new", function(req, res){
 res.render("contacts/new");
});

// CREATE //3
//views/contacts/new.ejs 에서 post로 접근 create는 post로만 가능하다. submit 버튼 누르면 날아옴
router.post("/", function(req, res){
 Contact.create(req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});

// Contacts - show // 4
//req.params.id는 MONGO_DB에서 사용하는 ROWID 같은 개념이다.
// views/contacts/index.ejs 에서 herf로 접근 이름을 클릭하면 MONGO_DB _id를 return으로 날려준다.
router.get("/:id", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/show", {contact:contact});
  console.log('id' + req.params.id);
 });
});

// Contacts - edit // 5
// views/contacts/show.ejs  에서 herf로 접근. 한 개의 Data만 표출 되므로 따로 선택은 필요 없음
router.get("/:id/edit", function(req, res){
 Contact.findOne({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.render("contacts/edit", {contact:contact});
 });
});

// Contacts - update // 6
// views/contacts/edit.ejs 에서
router.put("/:id", function(req, res){
 Contact.findOneAndUpdate({_id:req.params.id}, req.body, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts/"+req.params.id);
 });
});

// Contacts - destroy // 7
router.delete("/:id", function(req, res){
 Contact.remove({_id:req.params.id}, function(err, contact){
  if(err) return res.json(err);
  res.redirect("/contacts");
 });
});





module.exports = router;

*/
