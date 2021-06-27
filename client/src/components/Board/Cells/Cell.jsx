import React from "react";
import { getImage } from "../boardUtils";
import styles from "./Cell.module.css"

function Cell(props){
	const white = (props.pos.i+props.pos.j) % 2 === 0;
	const cellStyle={
		backgroundColor: white?"#787878":"#2b2b2b",
	}
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
				{props.piece!==null && <img src={getImage(props.piece)}  alt="piece"
				className={styles.piece}/>}
			</div>
		</div>
	)
}


export default Cell;