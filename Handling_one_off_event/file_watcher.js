var events = require('events');
var util = require('util');

function Watcher(processFolder, destFolder) {
    this.processFolder = processFolder;
    this.destFolder = destFolder;
}

util.inherits(Watcher, events.EventEmitter);

var fs = require('fs');
Watcher.prototype.watch = function () {
    var watcher = this;

    fs.readdir(watcher.processFolder, function (err, files) {
        if (err) throw err;

        files.forEach(function (file) {
            watcher.emit('process', file);
        }, this);
    });
}

Watcher.prototype.start = function () {
    var watcher = this;
    fs.watchFile(this.processFolder, function () {
        watcher.watch();
    });
}

var processFolder = './watch';
var destFolder = './done';

var watcher = new Watcher(processFolder, destFolder);

watcher.on('process', function (file) {
    var fileSrc = this.processFolder + '/' + file;
    var fileDest = this.destFolder + '/' + file.toLowerCase();

    fs.rename(fileSrc, fileDest, function (err) {
        if (err) throw err;
    });
});

watcher.start();
