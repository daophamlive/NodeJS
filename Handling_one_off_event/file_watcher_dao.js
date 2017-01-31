var events = require('events');
var util = require('util');

//create a watcherfile class
function Watcher(srcDir, desDir){
    this.srcDir = srcDir;
    this.desDir = desDir;
}

//util.inherits(Watcher, events.EventEmitter);
Watcher.prototype = new events.EventEmitter();


var fs = require('fs');
Watcher.prototype.watch = function(){
    var watcher = this;

    fs.readdir(this.srcDir, function(err, files){
        if(err) throw err;

        files.forEach(function(element) {
            watcher.emit('process',element);
        }, this);
    })
}


Watcher.prototype.start = function(){
    var watcher = this;
    fs.watchFile(this.srcDir, function(){
        watcher.watch();
    });
}


var srcDir = './watch';
var desDir = './done';

var watcherFile = new Watcher(srcDir, desDir);

watcherFile.on('process', function(file){
    var srcFile = this.srcDir + '/' + file;
    var desFile = this.desDir + '/' + file.toLowerCase();

    fs.rename(srcFile, desFile, function(err){
        if(err) throw err;
    });
});


watcherFile.start();