import React,{useState,useEffect} from "react";
import io from "socket.io-client"
import Board from "./Board/Board"


function App(){
	const [turn,setTurn] = useState("white");
	const [won,setWon] = useState("none");
	const [myColor,setColor] = useState(null);
	const [socket,setSocket] = useState(null);
	useEffect(()=>{	
		//const clientSocket =io("http://localhost:3001");

		const clientSocket =io("https://chess-io-mp.herokuapp.com/");
		clientSocket.on("found",color => setColor(color));
		setSocket(clientSocket);
	},[])
	return(
		won==="none"?
			<div>
				{myColor!==null?
				<div>
					<Board 
						turn={turn} setTurn={setTurn}
						won ={won} setWon={setWon}
						socket={socket}
						myColor={myColor}
						/>
					<h1>Turn: {turn} myColor: {myColor}</h1>
				</div>
				:
				<h1>Looking for a match...</h1>
			}
			</div>
			:
			<div>
					<h1>{won} won! you were {myColor}</h1>
					<button onClick={()=> setWon("none")}>Play again</button>
			</div>
	);
}


export default App;