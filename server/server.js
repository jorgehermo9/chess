const express = require("express");
const app = express();
const http = require("http")
const server = http.createServer(app);
const io = require("socket.io")(server,{
	cors:{
		origin: "*",
	}
});

const PORT = process.env.PORT || 3001;
const queue= [];
const games=[];
app.use(express.static(__dirname+ "/../client/build"));

io.on("connection", socket => {
	if(queue.length>1){
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
		console.log("emitted");
	}else{
		queue.push(socket);
	}
})
server.listen(PORT,() => console.log(`Server listening on port:${PORT}`));