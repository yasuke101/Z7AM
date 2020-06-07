var express = require('express');
var app = express();
var http = require('http').createServer(app);
var io = require('socket.io')(http);


app.use(express.static(__dirname + '/public'));
app.get('/', (req, res) => {
	res.sendFile(__dirname + '/index.html');
});


//----------------------------------------------------------------

// records of socket id and thier position 
var users_pos = {};

//----------------------------------------------------------------

io.on('connection', (socket) => {
	var socketid = socket.id;
	
	// give initialisation of local data if connected 
	io.to(socketid).emit('initialisation', users_pos);

	socket.on('send_data',(json) => { 
		
		if(typeof users_pos[socketid] === 'undefined'){
			
			// add the id + location to the server record 
				users_pos[socketid]=json;

			// give order for current users to add these infos to thier local record 
				socket.broadcast.emit('add_circle',{'id':socketid,'pos':json});	

			// give the current stat of server record 
				console.log(users_pos);						
		}
		
	});

	socket.on('disconnect', () => {
		if(typeof users_pos[socketid] !== 'undefined'){
			
			// give order for current users to drop these infos from thier local record 
			socket.broadcast.emit('drop_circle',socketid);

			// delete corespondent record server side
			delete users_pos[socketid];

			// give the current stat of server record 
			console.log(users_pos); 
		}			
	}); 
});

http.listen(process.env.PORT || 3000, () => {
	console.log('listening on *:3000');
});
