import React,{useState} from "react";
import io from "socket.io-client"
import Board from "./Board/Board"


function App(){
	const reset = ()=>{
		setWon("none");
		socket.close();
		setSocket(null);
		setColor(null);
		setMsg(null);//Reset error message
	}


	const api = "https://chess-io-mp.herokuapp.com/"
	//const api = "localhost:3001"

	const [turn,setTurn] = useState("white");
	const [won,setWon] = useState("none");
	const [myColor,setColor] = useState(null);
	const [socket,setSocket] = useState(null);
	const [errMsg,setMsg] = useState(null);
	if(socket===null){
		const clientSocket =io(api);
		clientSocket.on("found",color => {
			setColor(color);
		});
		clientSocket.on("rival dc",winner=>{//If someone won, both socket are close in Board component
			setMsg("Rival disconnected")
			setWon(winner);
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
				<h1>Looking for a match...</h1>
			}
			</div>
		:
			<div>
					<h1>{errMsg!==null && `${errMsg}. `}You {won === myColor?"won":"lost"}</h1>
					<button onClick={reset}>Play again</button>
			</div>
	);
}


export default App;