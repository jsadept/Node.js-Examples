// WebSocket server
const ws = require('ws');

const wsServer = new ws.Server({
	port: 3000,
}, () => console.log('WebSocket Server started on 3000 port'))

wsServer.on('connection', (ws) => {
	ws.on('message', (message) => {
		message = JSON.parse(message);
		broadcastMessage(message);
	})
})

function broadcastMessage(message) {
	wsServer.clients.forEach((curr) => {
		curr.send(JSON.stringify(message));
	})
}

// http server
const http = require('http');
const fs = require('fs');
const events = require('events');
const emitter = new events.EventEmitter();

const server = http.createServer((req, res) => {
	fs.readFile(__dirname + '/static/' + req.url, function (err, data) {
	if (err) {
		res.writeHead(404);
		res.end(JSON.stringify(err));
		return;
	}
	res.writeHead(200);
	res.end(data);
	});
});

server.listen( 5000, () => console.log('HTTP Server started on 5000 port'))
