import React, { useEffect, useState } from "react";
import Cell from "./Cells/Cell";
import styles from "./Board.module.css"
import {createBoard,getMoves} from "./boardUtils"


function Board(props){
	function inverse(color){
		return color ==="white"?"black":"white";
	}
	function handleClick(target){

		if(selected === null){
			if(target.piece !==null && target.piece.color === turn && turn ===props.myColor){
				const moves = getMoves(board,target);
				if(moves.length >0){
					setSelected(target);
					setMoves(getMoves(board,target));
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
					props.socket.emit("move",newBoard);
					return newBoard;
				});
				if(target.piece && target.piece.type==="K"){
					props.socket.emit("won",turn)
					props.socket.close();
					props.setWon(turn);
				}
				setTurn(inverse(turn));
			}
			setSelected(null);
			setMoves([]);
		}
	}
	const n =8;
	const [board,setBoard] = useState(createBoard(n));
	const [selected,setSelected] = useState(null);
	const [validMoves,setMoves] = useState([]);
	const turn =props.turn;
	const setTurn = props.setTurn;

	useEffect(()=>{
		props.socket.on("move", board => {
			setBoard(board);
			setTurn(props.myColor);
		})
		props.socket.on("won", who => {
			props.socket.close();
			props.setWon(who)}
		);
	})
	let auxCells = props.myColor==="black"?board.cells.slice().reverse():board.cells;
	return (
		<div className={styles.board}>
			{auxCells.map((cell,index) =>
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