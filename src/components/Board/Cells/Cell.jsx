import React from "react";
import styles from "./Cell.module.css"

function Cell(props){
	const perc = 100/props.n;
	const white = (props.i+props.j) % 2 === 0;
	const cellStyle={
		width: `${perc}%`,
		height: `${perc}%`,
		backgroundColor: white?"white":"black",
		color:white?"black":"white",
	}

	const type = props.piece? props.piece.type:"";
	console.log(cellStyle);
	return(
		<div className={styles.cell} 
		style={cellStyle}
		id={`cell${props.i}${props.j}`}
		
		><p>{type}</p>
		</div>
	)
}


export default Cell;