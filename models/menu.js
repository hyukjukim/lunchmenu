
// models/menu.js
var mongoose = require('mongoose');

//menu 관리를 위한 Schema를 생성합니다.
var menuSchema = mongoose.Schema({
    year: {
        type: String,
    },
    momth: {
        type: String,
    },
    date: {
        type: String,
    },
    condition: {
        type: String,
    },
    menu1: {
        type: String
    },
    menu2: {
        type: String
    },
    menu3: {
        type: String
    },
    menu4: {
        type: String
    },
    menu5: {
        type: String
    },
    menu6: {
        type: String
    },
    menu7: {
        type: String
    },
    score: {
        type: String
    },
    edit_flag: {
        type: String
    }
});

//menu 변수로 테이블에 접근
var menu = mongoose.model("menu", menuSchema);

module.exports = menu;
