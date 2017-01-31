var events = require('events');
var net = require('net');

var channel = new events.EventEmitter();
channel.clients = {};
channel.subscriptions = {};

process.on('uncaughtException', function (err) {
    console.error(err.stack);
    process.exit(1);
});
// channel.on('error', function (err) {
//     console.log('ERROR: ' + err.message);
// });

channel.on('join', function (id, client) {
    this.clients[id] = client;
    this.subscriptions[id] = function (senderId, message) {
        if (id != senderId) {
            this.clients[id].write(message);
        }
    }

    this.on('broadcast', this.subscriptions[id]);

    var welcome = "welcome!\n" + ' Guest online: ' + this.listeners('broadcast').length;
    client.write(welcome + "\n");
});

channel.on('leave', function (id) {
    channel.removeListener('broadcast', this.subscriptions[id]);
    channel.emit('broadcast', id, id + ' has left the chat.\n');
});

channel.on('shutdown', function () {
    channel.emit('broadcast', '', "Chat has shut down.\n");
    channel.removeAllListeners();
});

var server = net.createServer(function (client) {
    var id = client.remoteAddress + ':' + client.remotePort;
    client.on('connect', function () {
        channel.emit('join', id, client);
    });

    client.on('close', function () {
        channel.emit('leave', id);
    });

    client.on('data', function (data) {
        data = data.toString();
        if (data == "shutdown\r\n") {
            channel.emit('shutdown');
        }
        //my test codes, not follow ebook -begin
        // channel.emit('error', new Error('Something is wrong.'));
        channel.emit('error');
        //my test codes, not follow ebook -end
        channel.emit('broadcast', id, data);
    });
});

server.listen(8000);