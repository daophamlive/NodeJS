var http = require('http');
var fs = require('fs');

function formatHtml(titles, tmpl, res) 
{
	var html = tmpl.replace('%', titles.join('</li><li>'));
	res.writeHead(200, {'Content-Type': 'text/html'});
	res.end(html);
}

function hadError(err, res)
{
	console.error(err);
	res.end('Server Error');
}

function getTemplate(title, res)
{
	fs.readFile('./template.html', function(err, data){
					if(err)
					{
						hadError(err, res);
					}
					else
					{
						formatHtml(title, data.toString(), res);
					}
				});
}

function getTitles(res)
{
	fs.readFile('./title.json', function(err, data){
			if(err)
			{
				hadError(err, res);
			}
			else
			{
				var titles = JSON.parse(data.toString());
				getTemplate(titles, res);
			}
		});
}

function response_callback(req, res){

	console.log('Server is listening on port 8000');
	if(req.url == '/')
	{
		getTitles(res);
	}
}

//http.createServer(response_callback).listen(8000,'127.0.0.1');
var net = require('net');
var server = net.createServer(function(socket){
	socket.once('data', function(data){
		console.log('Port 88881 is listened');
		socket.write(data);
	});
});

server.listen(8888);