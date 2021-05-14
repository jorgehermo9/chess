import React from "react";
import Cell from "./Cells/Cell";
import styles from "./Board.module.css"

function createCell(n,i,j){
	return {n:n,i:i,j:j};
}
function setupBoard()
function createBoard(n){
	const board=[];
	for(let i=0;i<n;i++){
		for(let j =0;j<n;j++){
			board.push(createCell(n,i,j));
		}
	}
	return board;
}

function Board(){
	const n =8;
	const tableStyle = {};
	const board = createTable(n);
	return (
		<div 
		className={styles.table}
		style={tableStyle}>
			{board.map(cell =>
			 (<Cell
			 n={cell.n}
			 i={cell.i}
			 j={cell.j}
			 />))}
		</div>
	)
}


export default Table;