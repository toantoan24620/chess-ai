var board,
    game = new Chess();

// Actions after any move
var onMoveEnd = function(oldPos, newPos) {
  // Thông báo kết thúc game
  if (game.game_over() === true) {
    alert('Game Over');
    console.log('Game Over');
  }

  // in ra trạng thái hiện tại của bàn cờ
  console.log(game.fen());
};

// Check before pick pieces that it is white and game is not over
var onDragStart = function(source, piece, position, orientation) {
  if (game.game_over() === true || piece.search(/^b/) !== -1) {
    return false;
  }
};

// Update the board position after the piece snap
// for castling, en passant, pawn promotion
var onSnapEnd = function() {
  board.position(game.fen());
};

// Configure board
var cfg = {
  draggable: true,
  position: 'start',
  // Handlers for user actions
  onMoveEnd: onMoveEnd,
  onDragStart: onDragStart,
  onDrop: onDrop,
  onSnapEnd: onSnapEnd
}
board = ChessBoard('board', cfg);
