
var http = require('http'),
    fs = require('fs'),
    index = fs.readFileSync(__dirname + '/index.html');

// Send index.html to all requests
var app = http.createServer(function(req, res) {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(index);
});

var io = require('socket.io').listen(app);

// // Send current number of connected clients to all everyone
function checkUsers() {
	var connectedUsers = io.sockets.clients().length;
	io.sockets.emit('check', { users: connectedUsers + ' Connected user(s)' });
	if (connectedUsers === 2) {
		io.sockets.emit('play', { result: toss })
	}
	else if (connectedUsers > 2) {
		io.sockets.emit('waiting', { reason: 'Too many players' });
	}
	else {
		io.sockets.emit('waiting', { reason: 'Waiting on 1 player' });
	}
	
}

// check connected users every 3 secs

setInterval(checkUsers, 3000);

// Emit welcome message on connection


io.sockets.on('connection', function(socket) {
	var connectedUsers = io.sockets.clients().length;
	toss = Math.floor((Math.random()*10)+1);
});

app.listen(3000), function() {
	console.log('listening on port 3000');
};

