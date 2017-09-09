var express = require('express');
var app = express();
var port = 3700;
var connections = [];

app.set('views', __dirname + '/tpl');
app.set('view engine', "jade");
app.engine('jade', require('jade').__express);
app.use(express.static(__dirname + '/public'));

app.get("/", function(req, res) {
  res.render("page");
});

//app.listen(port);
var io = require('socket.io').listen(app.listen(port));

var connCount = 0;
io.sockets.on('connection', function(socket) {

  connections.push(socket);
  console.log('Total socket connection: ' + connections.length)

  socket.emit('message', {
    message: 'welcome to the chat'
  });
  socket.on('send', function(data) {
    io.sockets.emit('message', data);
  });

  socket.on('disconnect', function() {
    connections.splice(connections.indexOf(socket), 1);
    console.log('Total socket connection: ' + connections.length);
  });
});



console.log('server listening on ', port);