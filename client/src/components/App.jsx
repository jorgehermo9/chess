import React,{useState,useEffect} from "react";
import io from "socket.io-client"
import Board from "./Board/Board"


function App(){
	const [turn,setTurn] = useState("white");
	const [won,setWon] = useState("none");
	const [myColor,setColor] = useState(null);
	useEffect(()=>{	
		const socket =io("http://localhost:3001");
		socket.on("found",color => setColor(color));

	},[])
	console.log(myColor);
	return(
		won==="none"?
			<div>
				{myColor!==null?
				<div>
					<Board 
						turn={turn} setTurn={setTurn}
						won ={won} setWon={setWon}/>
					<h1>Turn: {turn} myColor: {myColor}</h1>
				</div>
				:
				<h1>Looking for match</h1>
			}
			</div>
			:
			<div>
					<h1>{won} won!</h1>
					<button onClick={()=> setWon("none")}>Play again</button>
			</div>
	);
}


export default App;