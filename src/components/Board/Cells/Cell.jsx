import React from "react";
import Board from "../Board";
import styles from "./Cell.module.css"

function Cell(props){
	const white = (props.pos.i+props.pos.j) % 2 === 0;
	const cellStyle={
		backgroundColor: white?"#787878":"#2b2b2b",
	}

	const type = props.piece? props.piece.type:"";
	const pieceStyle = props.piece?{
		borderColor: `${props.piece.color==="white"?"white":"black"}`,
		borderWidth: "0.2vmax",
		borderStyle: "solid",
		color: props.piece.color==="white"?"white":"black"}
		:null
	return(
		<div 
			key={props.pos.j+props.pos.i*props.n}
			className={styles.cell}
			style={cellStyle}
			id={`cell${props.pos.i}${props.pos.j}`}
			onClick={
				()=>props.onSelected({pos:props.pos,piece:props.piece})}
		>
			<div className={`${styles.pieceContainer} ${props.validMove?styles.validMove:styles.notValidMove}`}>
				<span className={styles.piece} style={pieceStyle}>
					{type}
				</span>
				</div>
		</div>
	)
}


export default Cell;