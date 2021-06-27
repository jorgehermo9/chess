import React,{useState} from "react";
import io from "socket.io-client"
import Board from "./Board/Board"


function App(){
	const reset = ()=>{
		setWon("none");
		setSocket(null);
		setColor(null);
	}
	//const api = "https://chess-io-mp.herokuapp.com/"
	const api = "localhost:3001"

	const [turn,setTurn] = useState("white");
	const [won,setWon] = useState("none");
	const [myColor,setColor] = useState(null);
	const [socket,setSocket] = useState(null);
	const [errMsg,setMsg] = useState(null);
	if(socket===null){
		const clientSocket =io(api);
		clientSocket.on("found",color => {
			setColor(color);
			setMsg(null);//Reset error message
		});
		clientSocket.on("rival dc",()=>{
			setMsg("Rival disconnected")
			reset();
		})
		setSocket(clientSocket);
	}
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
				<h1>{errMsg!==null && `${errMsg}. `}Looking for a match...</h1>
			}
			</div>
			:
			<div>
					<h1>{won} won! you were {myColor}</h1>
					<button onClick={reset}>Play again</button>
			</div>
	);
}


export default App;