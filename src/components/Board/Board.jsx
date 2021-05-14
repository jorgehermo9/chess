import React, { useState } from "react";
import Cell from "./Cells/Cell";
import styles from "./Board.module.css"
import {createBoard} from "./boardUtils"



function Board(){
	function handleClick(target){

		if(selected === null){
			if(target.piece !==null){
				setSelected(target);
			}
		}else{
			setBoard(prev =>{
				const newBoard = prev;
				const selectedCell = selected.j+selected.i*prev.n;
				const targetCell = target.j+target.i*prev.n;
				newBoard.cells[targetCell].piece = prev.cells[selectedCell].piece;
				newBoard.cells[selectedCell].piece = null;
				return newBoard;
			})
			setSelected(null);
		}
	}
	const n =8;
	const [board,setBoard] = useState(createBoard(n));
	const [selected,setSelected] = useState(null);
	return (
		<div className={styles.board}>
			{board.cells.map((cell,index) =>
			<Cell 
			key ={index}
			n={board.n} 
			i={cell.i} 
			j={cell.j} 
			piece={cell.piece}
			onSelected={handleClick}
			/>)}
		</div>
	)
}


export default Board;