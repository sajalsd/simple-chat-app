// Make connection
var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output');
feedback = document.getElementById('feedback');
disconnect = document.getElementById('disconnect');
connect = document.getElementById('connect');


//listen for keystroke
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Emit events
btn.addEventListener('click', function(){
    checkName();
    socket.emit('chat', {
        message: message.value,
        handle: handle.value
    });
    message.value = "";
});

socket.on('chat', function(data){
    feedback.innerHTML = '';
    output.innerHTML += '<p><strong>' + data.handle + ': </strong>' + data.message + '</p>';
});

socket.on('typing', function(data){
    feedback.innerHTML = '<p><em>' + data + ' is typing a message...</em></p>';
});


socket.on('left', function(data){
    if(data != null)
        output.innerHTML += '<p><italic>' + data+ ' has left the chat </italic></p>';
});


socket.on('add', function(data){
    if(data != null)
        output.innerHTML += '<p><italic>' + data+ ' has joined the chat </italic></p>';
});


disconnect.addEventListener('click', function(){
    socket.disconnect();
});

connect.addEventListener('click', function(){
    socket = io.connect('http://localhost:3000',{'forceNew':true });
    socket.on('connect', function(msg){
        socket.emit('join', prompt('your name?', 'Annonymous'));
    });
})

socket.on('connect', function(msg){
    var name =  prompt('your name?');
    handle.value = name;
    socket.emit('join', name);
});

socket.on("disconnect", function(){
    console.log("client disconnected from server");
});

function checkName()
{
    if(handle.value == '' || handle.value == null)
    {
        var name =  prompt('your name?');
        handle.value = name;
        socket.emit('join', name);
    }
    
}
