
// models/menu.js
var mongoose = require('mongoose');

//menu 관리를 위한 Schema를 생성합니다.
var menuSchema = mongoose.Schema({
    name: {
        type: String,
    },
    week: {
        type: String,
    },
    condition: {
        type: String,
    },
    menu: {
        type: String,
    },
    score: {
        type: String
    }
});

//menu 변수로 테이블에 접근
var menu = mongoose.model("menu", menuSchema);

module.exports = menu;
