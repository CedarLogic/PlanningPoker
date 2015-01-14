var received=[];

function postLoad() {
	$("#play").click(function() {
		alert("Let the game begin");
		socket.emit('command', 
                    {
                        type:'new-game',
                        story:$('#storyCaption').text()
                    });
		received = [];
		$("#pointsIn").text("");
	});
	socket.on('command', function(data) {
		if(data['type']=='selected-card') {
			var points = data['points'];
			$('#pointsIn').append("<div class=\"card\">" + points + "</div>");
			received.push(points);
		}
	});

	$('#showCards').click(function(){
		if(received.length == 0){
			alert("No cards received yet.");
		}else {
			socket.emit('command', 
                        {
                            type : 'show-cards',
                            cards : received
                        });
		}
	});
}
