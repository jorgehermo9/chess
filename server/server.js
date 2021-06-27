const express = require("express");
const app = express();
const http = require("http")
const server = http.createServer(app);
const io = require("socket.io")(server,{
	cors:{
		origin: "*",
	}
});
function searchGame(socketId){
	let filtered = games.filter(item=> item.white.id === socketId || 
		item.black.id === socketId);
	if(filtered.length===0) return null;
	let game = filtered[0];
	return game;
}
function searchRival(socketId){
	let game = searchGame(socketId);
	let rival = socketId === game.white.id?game.black:game.white;
	return rival;
}
function clearSocket(socket){
	if(queue.indexOf(socket)>-1){
		queue.splice(queue.indexOf(socket),1);
	}else if(games.indexOf(searchGame(socket.id))>-1){
		games.splice(games.indexOf(searchGame(socket.id)),1)
	}
}

const PORT = process.env.PORT || 3001;
const queue= [];
const games=[];
app.use(express.static(__dirname+ "/../client/build"));

io.on("connection", socket => {
	if(queue.length>0){
		let rival1 = queue.pop();
		let rival2 = socket
		let rivalColor1 = Math.random() <0.5?"white":"black";
		let rivalColor2 = rivalColor1 === "white"?"black":"white";
		let game = {};
		game[rivalColor1] = rival1;
		game[rivalColor2] = rival2;

		games.push(game);
		rival1.emit("found",rivalColor1);
		rival2.emit("found",rivalColor2);
		console.log(`match between ${rival1.id} and ${rival2.id}`);


	}else{
		console.log("pushed socket: "+socket.id);
		queue.push(socket);
	}
	console.log(`waiting: ${queue}`);
	console.log(`games: ${games}`);

	socket.on("move",board => {
		let rival = searchRival(socket.id);
		console.log("received move from"+socket.id);
		console.log("send move to"+rival.id);
		rival.emit("move",board);
	})
	socket.on("won",who => {
		let rival = searchRival(socket.id);
		rival.emit("won",who);
	})
	socket.on("disconnect", () =>{
		console.log("Disconnected socket: "+socket.id);
		if(searchGame(socket.id)!==null){//If socket is already in a game
			searchRival(socket.id).emit("rival dc");
		}
		clearSocket(socket);

	});
})
server.listen(PORT,() => console.log(`Server listening on port:${PORT}`));