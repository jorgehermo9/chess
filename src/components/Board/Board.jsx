import React, { useState } from "react";
import Cell from "./Cells/Cell";
import styles from "./Board.module.css"
import {createBoard,getMoves} from "./boardUtils"


function Board(){
	function handleClick(target){

		if(selected === null){
			if(target.piece !==null){
				const moves = getMoves(board,target);
				if(moves.length >0){
					setSelected(target);
					setMoves(getMoves(board,target));
					console.log(getMoves(board,target));
				}
			}
		}else{
			if(validMoves.some(move => move.i === target.pos.i && move.j === target.pos.j)){

				setBoard(prev =>{
					const newBoard = prev;
					const selectedCell = selected.pos.j+selected.pos.i*prev.n;
					const targetCell = target.pos.j+target.pos.i*prev.n;
					newBoard.cells[targetCell].piece = prev.cells[selectedCell].piece;
					newBoard.cells[selectedCell].piece = null;
					return newBoard;
				});
			}
			setSelected(null);
			setMoves([]);
		}
	}
	const n =8;
	const [board,setBoard] = useState(createBoard(n));
	const [selected,setSelected] = useState(null);
	const [validMoves,setMoves] = useState([]);
	return (
		<div className={styles.board}>
			{board.cells.map((cell,index) =>
			<Cell 
			key ={index}
			n={board.n}
			pos={cell.pos} 
			piece={cell.piece}
			validMove={validMoves.some((move) => 
								move.i === cell.pos.i && move.j===cell.pos.j )}
			onSelected={handleClick}
			/>)}
		</div>
	)
}


export default Board;