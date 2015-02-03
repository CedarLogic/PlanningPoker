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
		$("#pointsInByPlayer").text("");
	});
	socket.on('command', function(data) {
		if(data['type']=='selected-card') {
			var points = data['points'];
			$('#pointsIn').append("<div class=\"card\">" + points + "</div>");
			received.push(points);

			$("#pointsInByPlayer").append("<li>"+data['name']+"</li>");

		} else if(data['type']=='player-joined') {
			var joinedName=data['name'];
			$("#connected-parties-list").append("<li>"+joinedName+"</li>");
			$("#connected-parties").stop().animate({left:"0px"},500);
			$("#connected-parties").removeClass("sidebar-unslid");
			$("#connected-parties").addClass("sidebar-slid");
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

