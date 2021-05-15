import React from "react";
import styles from "./Cell.module.css"

function Cell(props){
	const perc = 100/props.n;
	const white = (props.pos.i+props.pos.j) % 2 === 0;
	const cellStyle={
		width: `${perc}%`,
		height: `${perc}%`,
		backgroundColor: white?"#787878":"#2b2b2b",
	}
	if(props.validMove){
		cellStyle.backgroundColor = "#1c9c25";
	}
	const type = props.piece? props.piece.type:"";
	const pieceStyle = props.piece?{
		border:`medium solid ${props.piece.color==="white"?"white":"black"}`, 
		color: props.piece.color==="white"?"white":"black"}
		:null

	return(
		<div className={`${styles.cell}`}
		style={cellStyle}
		id={`cell${props.pos.i}${props.pos.j}`}
		onClick={
			()=>props.onSelected({pos:props.pos,piece:props.piece})}
			>
				<p style={pieceStyle}>
					{type}
				</p>
		</div>
	)
}


export default Cell;