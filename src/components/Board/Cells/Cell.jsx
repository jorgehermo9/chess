import React from "react";
import styles from "./Cell.module.css"

function Cell(props){
	const perc = 100/props.n;
	const white = (props.i+props.j) % 2 === 0;
	
	const cellStyle={
		width: `${perc}%`,
		height: `${perc}%`,
		backgroundColor: white?"white":"black",
	}
	console.log(cellStyle);
	return(
		<div className={styles.cell} 
		style={cellStyle}>
		</div>
	)
}


export default Cell;