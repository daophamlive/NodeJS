var event_emitter = require('events');

var channel = new event_emitter.EventEmitter;
channel.on('join', function(){
console.log('I\'m listening');
});
channel.emit('join');