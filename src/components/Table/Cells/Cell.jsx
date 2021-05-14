import React from "react";
import styles from "./Cell.module.css"

function Cell(props){
	const perc = (100-props.rowsize*0.7*2)/props.rowsize;
	return(
		<div className={styles.cell} 
		style={{width: `${perc}%`,height: `${perc}%`}}>
		</div>
	)
}


export default Cell;