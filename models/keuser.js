
// models/keuser.js


var mongoose = require('mongoose');

//user 관리를 위한 Schema를 생성합니다.
var keuserSchema = mongoose.Schema({
    user_key: {
        type: String,
        unique: true
    },
    name_flag: {
        type: String,
    },
    company_name: {
        type: String
    },
    score: {
        type: String
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    date2: {
        type: String
    },
    password: {
        type: String
    },
    email: {
        type: String
    },
    temp1: {
        type: String
    },
    temp2: {
        type: String
    }
});
//keuser 변수로 테이블에 접근
var keuser = mongoose.model("keuser", keuserSchema);

module.exports = keuser;
