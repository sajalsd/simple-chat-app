// Make connection
var socket = io.connect('http://localhost:3000');

// Query DOM
var message = document.getElementById('message'),
handle = document.getElementById('handle'),
btn = document.getElementById('send'),
output = document.getElementById('output');
feedback = document.getElementById('feedback');


//listen for keystroke
message.addEventListener('keypress', function(){
    socket.emit('typing', handle.value);
})

// Emit events
btn.addEventListener('click', function(){
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