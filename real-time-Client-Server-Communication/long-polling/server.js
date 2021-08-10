const http = require('http');
const fs = require('fs');


const events = require('events');

const emitter = new events.EventEmitter();


const server = http.createServer((req, res) => {

	if(req.url === '/get-messages' && req.method === 'GET'){
		emitter.once('newMessage', (message) => {
			res.statusCode = 200;
			res.setHeader('Content-Type', 'application/json');
			res.end(JSON.stringify(message));
		});
	}
	else if(req.url === '/send-messages' && req.method === 'POST'){
		let body = '';
		req.on('data', chunk => {
			body += chunk.toString();
		});
		req.on('end', () => {
			let params = JSON.parse(body);
			emitter.emit('newMessage', params);
			res.end('ok');
		});
	}
	else{
		console.log(__dirname + '/static/' + req.url)
		fs.readFile(__dirname + '/static/' + req.url, function (err, data) {
    			if (err) {
      				res.writeHead(404);
      				res.end(JSON.stringify(err));
      				return;
    			}
    			res.writeHead(200);
    			res.end(data);
  		});
	}


});




server.listen( 5000, () => console.log('Server started on 5000 port'))
