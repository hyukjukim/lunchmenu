'use strict';

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

const accessToken = '7EBPFDK3IBMX3ISHKONR2F4ZN2GP2OWS'
/*
const accessToken = (() => {
  if (process.argv.length !== 3) {
    console.log('usage: node examples/quickstart.js <wit-access-token>');
    process.exit(1);
  }
  return process.argv[2];
})();
*/


// Quickstart example
// See https://wit.ai/ar7hur/quickstart

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

const actions = {
  send(request, response) {
    console.log('3');
    const {sessionId, context, entities} = 'request';
    const {text, quickreplies} = response;
    console.log('sending...', JSON.stringify(response));
  },
  getForecast({context, entities}) {

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
};

/*
const client = new Wit({accessToken});
client.message('what is the weather in London?', {})
.then((data) => {
  var obj = JSON.stringify(data);
  var result = JSON.parse(obj);
  console.log('Yay, got Wit.ai response: ' + result.entities.intent[0].value);
})
.catch(console.error);
console.log(client);
console.log('5');
*/
const client = new Wit({accessToken, actions});
//console.log(client);
console.log('5');
interactive(client);
