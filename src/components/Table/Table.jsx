import React from "react";
import Cell from "./Cells/Cell";
import styles from "./Table.module.css"


function createTable(n){
	const table=[];
	const size = n*n;
	for(let i=0;i<size;i++){
		table.push(<Cell rowsize ={n}/>);
	}
	return table;
}

function Table(){
	const n =8;
	const tableStyle = {width: "600px",height: "600px"};
	return (
		<div style={tableStyle}>
			{createTable(n)}
		</div>
	)
}


export default Table;