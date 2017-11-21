var express = require('express');
var socket = require('socket.io');

//setup app
var app = express();


//setup server
var server = app.listen(3000, function(){
    console.log('app started, listening to port 3000');
});

//use static files
app.use(express.static('public'));


//setup socket
var io = socket(server);

io.on('connection', socket => {
    console.log('connected through socket');

    socket.on('chat', function(data){
        console.log('emmiting data to sockets');
        io.sockets.emit('chat', data);
    });

     // Handle typing event
     socket.on('typing', function(data){
        console.log('broadcasting typing signal');
        socket.broadcast.emit('typing', data);
    });

    socket.on('disconnect', function(){
        console.log(socket.name + ' has disconnected from the chat.' + socket.id);
        socket.broadcast.emit('left', socket.name);
    });

    socket.on('join', function (name) {
        console.log(name + ' joined the chat.');
        socket.name = name
        socket.broadcast.emit('add', name);
    });

});
