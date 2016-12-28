'use strict'

const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const app = express()
var mongoose = require("mongoose")
const token = process.env.FB_PAGE_TOKEN // 환경변수 갖고 오는 곳.

let Wit = null;
let interactive = null;
try {
  // if running from repo
  Wit = require('../').Wit;
  interactive = require('../').interactive;
} catch (e) {
  Wit = require('node-wit').Wit;
  interactive = require('node-wit').interactive;
}

//2016-12-28 wit.ai

const firstEntityValue = (entities, entity) => {
  console.log('1');
  const val = entities && entities[entity] &&
    Array.isArray(entities[entity]) &&
    entities[entity].length > 0 &&
    entities[entity][0].value
  ;
  if (!val) {
    return null;
  }
  console.log('2');
  return typeof val === 'object' ? val.value : val;
};


// Our bot actions
const actions = {
  send(sessionId, text) {
    console.log("sessionId");
    console.log(sessionId);
    console.log("text");
    console.log(text);
    console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@');
    // Our bot has something to say!
    // Let's retrieve the Facebook user whose session belongs to
    const recipientId = sessionId;
    if (recipientId) {
      // Yay, we found our recipient!
      // Let's forward our bot response to her.
      // We return a promise to let our bot know when we're done sending
      return sendTextMessage(recipientId, text)
      .then(() => null)
      .catch((err) => {
        console.error(
          'Oops! An error occurred while forwarding the response to',
          recipientId,
          ':',
          err.stack || err
        );
      });
    } else {
      console.error('Oops! Couldn\'t find user for session:', sessionId);
      // Giving the wheel back to our bot
      return Promise.resolve()
    }
  },
  // You should implement your custom actions here
  getForecast(context, entities) {

    console.log('4');
    console.log('entities');
    console.log(entities);
    console.log('context');
    console.log(context);


    var location = firstEntityValue(entities, 'location');
    if (location) {
      context.forecast = 'sunny in ' + location; // we should call a weather API here
      delete context.missingLocation;
    } else {
      context.missingLocation = true;
      delete context.forecast;
    }
    return context;
  },
  // See https://wit.ai/docs/quickstart
};

const accessToken = '7EBPFDK3IBMX3ISHKONR2F4ZN2GP2OWS'
const client = new Wit({accessToken,actions});

// DB setting
mongoose.connect(process.env.MONGO_DB); // 1
var db = mongoose.connection; // 2
// 3﻿
db.once("open", function(){
 console.log("DB connected");
});
// 4
db.on("error", function(err){
 console.log("DB ERROR : ", err);
});
// DB schema // 4
var contactSchema = mongoose.Schema({
    user_key: {
        type: String
    }, //name:{type:String, required:true, unique:true},
    type: {
        type: String
    },
    content: {
        type: String
    }
});
var Contact = mongoose.model("contact", contactSchema); //5


app.set('port', (process.env.PORT || 5000))

// Process application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended: false}))

// Process application/json
app.use(bodyParser.json())

// Index route
app.get('/', function (req, res) {
    res.send('Hello world, I am a FaceBook chat bot')
})

// for Facebook verification
app.get('/webhook/', function (req, res) {
    if (req.query['hub.verify_token'] === 'kimhyukju_test_token') {
        res.send(req.query['hub.challenge'])
    }
    res.send('Error, wrong token')
})

// Spin up the server
app.listen(app.get('port'), function() {
    console.log('running on port', app.get('port'))
})


app.post('/webhook/', function (req, res) {
  let messaging_events = req.body.entry[0].messaging
  for (let i = 0; i < messaging_events.length; i++) {
    let event = req.body.entry[0].messaging[i]
    let sender = event.sender.id
    if (event.message && event.message.text) {
      let text = event.message.text
      if (text === 'Generic') {
          sendGenericMessage(sender)
          continue
      }

/*
      client.message(text, {})
      .then((data) => {
        var obj = JSON.stringify(data);
        console.log('********************************************************************************');
        console.log(data);
        var result = JSON.parse(obj);
        console.log('********************************************************************************');
        console.log(obj);
        console.log('********************************************************************************');
        console.log('Yay, got Wit.ai response: ' + JSON.stringify(result.entities.intent[0].value));
        console.log('********************************************************************************');
      })
      .catch(console.error);
*/


client.runActions(sender, text)
.catch((e) => {
  console.log('Oops! Got an error: ' + e);
});

sendTextMessage(sender, "Text received, echo: " + text.substring(0, 200))
/*      Contact.create({ content:  text.substring(0, 200) }, function(error, doc) {
  // doc.children[0]._id will be undefined
});
*/
    }
    if (event.postback) {
      let text = JSON.stringify(event.postback)
      sendTextMessage(sender, "Postback received: "+text.substring(0, 200), token)
      continue
    }
  }
  res.sendStatus(200)
})


function sendTextMessage(sender, text) {
    let messageData = { text:text }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}


function sendGenericMessage(sender) {
    let messageData = {
        "attachment": {
            "type": "template",
            "payload": {
                "template_type": "generic",
                "elements": [{
                    "title": "First card",
                    "subtitle": "Element #1 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/rift.png",
                    "buttons": [{
                        "type": "web_url",
                        "url": "https://www.messenger.com",
                        "title": "web url"
                    }, {
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for first element in a generic bubble",
                    }],
                }, {
                    "title": "Second card",
                    "subtitle": "Element #2 of an hscroll",
                    "image_url": "http://messengerdemo.parseapp.com/img/gearvr.png",
                    "buttons": [{
                        "type": "postback",
                        "title": "Postback",
                        "payload": "Payload for second element in a generic bubble",
                    }],
                }]
            }
        }
    }
    request({
        url: 'https://graph.facebook.com/v2.6/me/messages',
        qs: {access_token:token},
        method: 'POST',
        json: {
            recipient: {id:sender},
            message: messageData,
        }
    }, function(error, response, body) {
        if (error) {
            console.log('Error sending messages: ', error)
        } else if (response.body.error) {
            console.log('Error: ', response.body.error)
        }
    })
}
