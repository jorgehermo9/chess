import React,{useState,useEffect} from "react";
import io from "socket.io-client"
import Board from "./Board/Board"


function App(){
	const [turn,setTurn] = useState("white");
	const [won,setWon] = useState("none");
	const [myColor,setColor] = useState(null);
	const [socket,setSocket]= useState(null);
	useEffect(()=>{
		async function setConnection(){
			let s = await io("http://localhost:3001");
			setSocket(s);
			await s.on("found",color => setColor(color));
		}
		setConnection();
	},[])
	return(
		won==="none"?
			<div>
					<Board 
						turn={turn} setTurn={setTurn}
						won ={won} setWon={setWon}/>
					<h1>Turn: {turn} myColor: {myColor}</h1>
			</div>
			:
			<div>
					<h1>{won} won!</h1>
					<button onClick={()=> setWon("none")}>Play again</button>
			</div>
	);
}


export default App;