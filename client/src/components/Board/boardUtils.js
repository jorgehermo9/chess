function createCell(i,j){
	return {pos:{i:i,j:j}
					,piece: null };
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
	const cell= board.cells[j + i*board.n];
	cell.piece = {color:color,type:type};
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

function isValidMove(board,move){
	return move.i >=0 && move.i < board.n && move.j >=0 && move.j<board.n;
}
function validMoves(board,color,moves){
	return moves.filter(move =>{
		const target = move.j+move.i*board.n;
		return (
			isValidMove(board,move) &&
			(board.cells[target].piece ===null || board.cells[target].piece.color !== color)
		);
	})
}
function pawnMoves(board,{i,j},color){
	const facing = color === "black"?1:-1;
	const startVertical = color==="black"?1:6;
	const moves =[];
	const enemies = [{i:i+facing,j:j-1},{i:i+facing,j:j+1}];
	let move = {i:i+facing,j:j};
	let doublemove = {i:i+2*facing,j:j};

	enemies.forEach( enemy => {
		if(isValidMove(board,enemy) && 
		(board.cells[enemy.j + enemy.i*board.n].piece&&board.cells[enemy.j + enemy.i*board.n].piece.color!==color )){
			moves.push(enemy);
		}
	})

	if(isValidMove(board,move)&&(board.cells[move.j + move.i*board.n].piece===null)){
			moves.push(move);
			if(i ===startVertical && 
				isValidMove(board,doublemove)&&(board.cells[doublemove.j + doublemove.i*board.n].piece===null)){
				moves.push(doublemove);
			}
		}
	return validMoves(board,color,moves);
}
function knightMoves(board,{i,j},color){
	const moves =[
		{i:i+2,j:j-1},
		{i:i+2,j:j+1},
		{i:i-2,j:j-1},
		{i:i-2,j:j+1},
		{i:i+1,j:j-2},
		{i:i-1,j:j-2},
		{i:i+1,j:j+2},
		{i:i-1,j:j+2}
	];
	return validMoves(board,color,moves);
}
function kingMoves(board,{i,j},color){
	const moves = [
		{i:i+1,j:j},
		{i:i-1,j:j},
		{i:i,j:j+1},
		{i:i,j:j-1},
		{i:i-1,j:j-1},
		{i:i-1,j:j+1},
		{i:i+1,j:j-1},
		{i:i+1,j:j+1},
	];
	return validMoves(board,color,moves);
}
function expand(board,direction,starting){
	let moves=[];
	let count =1;
	let cell = {i:starting.i + direction.i,j:starting.j+direction.j};
	while(isValidMove(board,cell) && board.cells[cell.j+cell.i*board.n].piece ===null){
		moves.push(cell);
		count++;
		cell = {i:starting.i+direction.i*count,j:starting.j+direction.j*count};
	}
	moves.push(cell)//Add last cell as target cell
	return moves;
}
function queenMoves(board,starting,color){
	let moves=[];
	moves = [...moves,...expand(board,{i:1,j:0},starting)];
	moves = [...moves,...expand(board,{i:-1,j:0},starting)];
	moves = [...moves,...expand(board,{i:0,j:1},starting)];
	moves = [...moves,...expand(board,{i:0,j:-1},starting)];

	moves = [...moves,...expand(board,{i:-1,j:-1},starting)];
	moves = [...moves,...expand(board,{i:-1,j:1},starting)];
	moves = [...moves,...expand(board,{i:1,j:1},starting)];
	moves = [...moves,...expand(board,{i:1,j:-1},starting)];
	return validMoves(board,color,moves);
}
function bishopMoves(board,starting,color){
	let moves = [];

	moves = [...moves,...expand(board,{i:-1,j:-1},starting)];
	moves = [...moves,...expand(board,{i:-1,j:1},starting)];
	moves = [...moves,...expand(board,{i:1,j:1},starting)];
	moves = [...moves,...expand(board,{i:1,j:-1},starting)];
	return validMoves(board,color,moves);
}

function rookMoves(board,starting,color){
	let moves =[];
	moves = [...moves,...expand(board,{i:1,j:0},starting)];
	moves = [...moves,...expand(board,{i:-1,j:0},starting)];
	moves = [...moves,...expand(board,{i:0,j:1},starting)];
	moves = [...moves,...expand(board,{i:0,j:-1},starting)];
	return validMoves(board,color,moves);
}
export function getMoves(board,{pos,piece}){
	let moves= [];
	switch (piece.type) {
		case "P":
			moves = pawnMoves(board,pos,piece.color);
			break;
		case "N":
			moves = knightMoves(board,pos,piece.color);
			break;
		case "K":
			moves = kingMoves(board,pos,piece.color);
			break;
		case "Q":
			moves = queenMoves(board,pos,piece.color);
			break;
		case "B":
			moves = bishopMoves(board,pos,piece.color);
			break;
		case "R":
			moves = rookMoves(board,pos,piece.color);
			break;
			
		default:
			break;
	}
	return moves;
}

export function getImage(piece){
	let type;
	switch(piece.type){
		case "P":
			type = "pawn";
			break;
		case "N":
			type = "knight";
			break;
		case "K":
			type = "king";
			break;
		case "Q":
			type = "queen";
			break;
		case "B":
			type = "bishop";
			break;
		case "R":
			type = "rook";
			break;
			
		default:
			break;
	}
	let url = `/assets/chess/${piece.color}_${type}.png`;
	return url
}

