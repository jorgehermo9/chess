import React from "react";
import styles from "./Cell.module.css"

function Cell(props){
	const perc = 100/props.n;
	const white = (props.i+props.j) % 2 === 0;
	const cellStyle={
		width: `${perc}%`,
		height: `${perc}%`,
		backgroundColor: white?"#787878":"#2b2b2b",
	}

	const type = props.piece? props.piece.type:"";
	const pieceStyle = props.piece?{
		border:`medium solid ${props.piece.color==="white"?"white":"black"}`, 
		color: props.piece.color==="white"?"white":"black"}
		:null
	console.log(cellStyle);
	return(
		<div className={styles.cell} 
		style={cellStyle}
		id={`cell${props.i}${props.j}`}
		onClick={
			()=>props.onSelected({i:props.i,j:props.j,piece:props.piece})
		}
		><p style={pieceStyle}>
			{type}</p>
		</div>
	)
}


export default Cell;