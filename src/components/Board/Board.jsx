import React, { useState } from "react";
import Cell from "./Cells/Cell";
import styles from "./Board.module.css"
import {createBoard} from "./boardUtils"


function Board(){
	const n =8;
	const [board,setBoard] = useState(createBoard(n));
	return (
		<div className={styles.board}>
			{board.cells.map((cell,index) =>
			<Cell 
			key ={index}
			n={board.n} 
			i={cell.i} 
			j={cell.j} 
			piece={cell.piece}
			/>)}
		</div>
	)
}


export default Board;