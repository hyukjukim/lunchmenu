'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()




app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a chat bot')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


// 카카오톡 연결 1
app.get('/keyboard/', function (req, res) {
    res.send({
"type" : "buttons",
"buttons" : ["선택 1", "선택 2", "선택 3"]
})
})

app.post('/message', function (req, res) {
  res.sendStatus(200)
})
