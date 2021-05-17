import React,{useState} from "react";
import Board from "./Board/Board"

function App(){
	const [turn,setTurn] = useState("white");
	const [won,setWon] = useState("none");
	return(
		won==="none"?
			<div>
					<Board 
						turn={turn} setTurn={setTurn}
						won ={won} setWon={setWon}/>
					<h1>Turn: {turn}</h1>
			</div>
			:
			<div>
					<h1>{won} won!</h1>
					<button onClick={()=> setWon("none")}>Play again</button>
			</div>
	);
}


export default App;