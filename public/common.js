var socket;
var totalCards = 10;

$(document).ready( function(){
	socket = io();

	socket.on('client connected', function(data){
		alert("Connected to server");
	});
	if(postLoad){
		postLoad();
	}

});
