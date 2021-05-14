import React from "react";
import Cell from "./Cells/Cell";
import styles from "./Table.module.css"


function createTable(cells){
	const table=[];
	const size = cells*cells;
	for(let i=0;i<size;i++){
		table.push(<Cell/>);
	}
	return table;
}

function Table(){
	const n =8;
	const tableStyle = {width: `${n * 70}px`,height: `${n*70}px`};
	return (
		<div style={tableStyle}>
			{createTable(n)}
		</div>
	)
}


export default Table;