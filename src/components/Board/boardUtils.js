function createCell(i,j){
	return {i:i,j:j,piece: null };
}

export function createBoard(n){
	const board={n:n,cells:[]};
	for(let i=0;i<n;i++){
		for(let j =0;j<n;j++){
			board.cells.push(createCell(i,j));
		}
	}
	const settedBoard = setupBoard(board);
	return settedBoard;
}
function setPiece(board,type,color,i,j){
	const cell= board.cells[j + i*board.n]
	cell.piece = {color:color,type:type}
}
function setupBoard(board){
	const newBoard = board;
	setPiece(newBoard,"R","black",0,0);
	setPiece(newBoard,"N","black",0,1);
	setPiece(newBoard,"B","black",0,2);
	setPiece(newBoard,"Q","black",0,3);
	setPiece(newBoard,"K","black",0,4);
	setPiece(newBoard,"B","black",0,5);
	setPiece(newBoard,"N","black",0,6);
	setPiece(newBoard,"R","black",0,7);
	setPiece(newBoard,"P","black",1,0);
	setPiece(newBoard,"P","black",1,1);
	setPiece(newBoard,"P","black",1,2);
	setPiece(newBoard,"P","black",1,3);
	setPiece(newBoard,"P","black",1,4);
	setPiece(newBoard,"P","black",1,5);
	setPiece(newBoard,"P","black",1,6);
	setPiece(newBoard,"P","black",1,7);	
	
	setPiece(newBoard,"R","white",7,0);
	setPiece(newBoard,"N","white",7,1);
	setPiece(newBoard,"B","white",7,2);
	setPiece(newBoard,"Q","white",7,3);
	setPiece(newBoard,"K","white",7,4);
	setPiece(newBoard,"B","white",7,5);
	setPiece(newBoard,"N","white",7,6);
	setPiece(newBoard,"R","white",7,7);
	setPiece(newBoard,"P","white",6,0);
	setPiece(newBoard,"P","white",6,1);
	setPiece(newBoard,"P","white",6,2);
	setPiece(newBoard,"P","white",6,3);
	setPiece(newBoard,"P","white",6,4);
	setPiece(newBoard,"P","white",6,5);
	setPiece(newBoard,"P","white",6,6);
	setPiece(newBoard,"P","white",6,7);

	return newBoard;
}
