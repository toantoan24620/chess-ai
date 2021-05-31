var reverseArray = function(array) {    // tạo bản sao của mảng rồi đảo
  return array.slice().reverse();
};
// tốt trắng
var pawnEvalWhite = 
  [
    [0,  0,  0,  0,  0,  0,  0,  0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5,  5, 10, 25, 25, 10,  5,  5],
    [0,  0,  0, 20, 20,  0,  0,  0],
    [5, -5,-10,  0,  0,-10, -5,  5],
    [5, 10, 10,-20,-20, 10, 10,  5],
    [0,  0,  0,  0,  0,  0,  0,  0]    
  ];
// tốt đen
var pawnEvalBlack = reverseArray(pawnEvalWhite);
// mã 
var knightEval =
  [
    [-50,-40,-30,-30,-30,-30,-40,-50],
    [-40,-20,  0,  0,  0,  0,-20,-40],
    [-30,  0, 10, 15, 15, 10,  0,-30],
    [-30,  5, 15, 20, 20, 15,  5,-30],
    [-30,  0, 15, 20, 20, 15,  0,-30],
    [-30,  5, 10, 15, 15, 10,  5,-30],
    [-40,-20,  0,  5,  5,  0,-20,-40],
    [-50,-40,-30,-30,-30,-30,-40,-50]  
  ];

// tịnh trắng
var bishopEvalWhite = [
  [-20,-10,-10,-10,-10,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5, 10, 10,  5,  0,-10],
  [-10,  5,  5, 10, 10,  5,  5,-10],
  [-10,  0, 10, 10, 10, 10,  0,-10],
  [-10, 10, 10, 10, 10, 10, 10,-10],
  [-10,  5,  0,  0,  0,  0,  5,-10],
  [-20,-10,-10,-10,-10,-10,-10,-20]
];
// tịnh đen
var bishopEvalBlack = reverseArray(bishopEvalWhite);

// xe trắng
var rookEvalWhite = [
  [ 0,  0,  0,  0,  0,  0,  0,  0],
  [ 5, 10, 10, 10, 10, 10, 10,  5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [ -5,  0,  0,  0,  0,  0,  0, -5],
  [  0,  0,  0,  5,  5,  0,  0,  0]
];
// xe đen
var rookEvalBlack = reverseArray(rookEvalWhite);

// hậu 
var evalQueen = [
  [-20,-10,-10, -5, -5,-10,-10,-20],
  [-10,  0,  0,  0,  0,  0,  0,-10],
  [-10,  0,  5,  5,  5,  5,  0,-10],
  [-5,  0,  5,  5,  5,  5,  0, -5],
  [0,  0,  5,  5,  5,  5,  0, -5],
  [-10,  5,  5,  5,  5,  5,  0,-10],
  [-10,  0,  5,  0,  0,  0,  0,-10],
  [-20,-10,-10, -5, -5,-10,-10,-20]
];

// vua trắng
var kingEvalWhite = [
  [ -30,-40,-40,-50,-50,-40,-40,-30],
  [ -30,-40,-40,-50,-50,-40,-40,-30],
  [ -30,-40,-40,-50,-50,-40,-40,-30],
  [ -30,-40,-40,-50,-50,-40,-40,-30],
  [ -20,-30,-30,-40,-40,-30,-30,-20],
  [ -10,-20,-20,-20,-20,-20,-20,-10],
  [  20, 20,  0,  0,  0,  0, 20, 20],
  [  20, 30, 10,  0,  0, 10, 30, 20]
];

// vua đen
var kingEvalBlack = reverseArray(kingEvalWhite);


/*
 * @param {string} color - - b , w (trắng hoặc đen)
 */
var evaluateBoard = function(board, color) {
  // b
  // Set giá trị cho các quân cờ
  var pieceValue = {
    'p': 100, // pawn (tốt)
    'n': 320, // knight (mã)
    'b': 330, // bishop(tịnh)
    'r': 500, // rook(xe)
    'q': 900, // queen (hậu)
    'k': 20000 //
  };

  // Lặp qua tất cả các quân cờ ở trên bàn cờ và tính tổng giá trị bàn cờ
  var value = 0;
  board.forEach(function(row,idxr) {
    row.forEach(function(piece,idxc) {
      // idxr là chỉ số hàng, idxc là chỉ số cột
      if (piece) {
        // màu là color thì + ko thì -
        value += pieceValue[piece['type']]
                 * (piece['color'] === color ? 1 : -1);
        if(piece['type'] === 'p'){
          value += (piece['color'] === color ? pawnEvalBlack[idxr][idxc] : pawnEvalWhite[idxr][idxc]);
        }else if(piece['type'] === 'n'){
          value += (piece['color'] === color ? knightEval[idxr][idxc] : knightEval[idxr][idxc]);
        }else if(piece['type'] === 'b'){
          value += (piece['color'] === color ? bishopEvalBlack[idxr][idxc] : bishopEvalWhite[idxr][idxc]);
        }else if(piece['type'] === 'r'){
          value += (piece['color'] === color ? rookEvalBlack[idxr][idxc] : rookEvalWhite[idxr][idxc]);
        }else if(piece['type'] === 'q'){
          value += evalQueen[idxr][idxc];
        }else if(piece['type'] === 'k'){
          value += (piece['color'] === color ? kingEvalBlack[idxr][idxc] : kingEvalWhite[idxr][idxc]);
        }
      }
    });
  });

  return value;
};


/**
 * Calculates the best move using Minimax with Alpha Beta Pruning.
 * @param {Number} depth - Độ sâu tính toán
 * @param {Object} game - The game to evaluate
 * @param {string} playerColor - b , w (trắng hoặc đen)
 * @param {Number} alpha
 * @param {Number} beta
 * @param {Boolean} isMaximizingPlayer - lượt chơi của maximizing hoặc minimizing
 * @return {Array} kết quả trả về nước đi tốt nhất và giá trị tốt nhất
 */
var calcBestMove = function(depth, game, playerColor,
                            alpha=Number.NEGATIVE_INFINITY,
                            beta=Number.POSITIVE_INFINITY,
                            isMaximizingPlayer=true) {
  //Base case
  if (depth === 0) {
    value = evaluateBoard(game.board(), playerColor);
    return [value, null]
  }

  // Recursive case: search possible moves
  var bestMove = null;
  var possibleMoves = game.moves();

  // Trộn lại các quân cờ để không bị bệt ở quân mã
  possibleMoves.sort(function(a, b){return 0.5 - Math.random()});

  // Khởi tạo giá trị nước đi tốt nhất cho từng người chơi
  var bestMoveValue = isMaximizingPlayer ? Number.NEGATIVE_INFINITY
                                         : Number.POSITIVE_INFINITY;

  // Lặp qua các nước đi có thể
  for (var i = 0; i < possibleMoves.length; i++) {
    var move = possibleMoves[i];
    
    // di chuyển 
    game.move(move);

    // đệ quy độ sâu giảm dần để đánh giá nước đi 
    value = calcBestMove(depth-1, game, playerColor, alpha, beta, !isMaximizingPlayer)[0];

    if (isMaximizingPlayer) {

       // nếu là Maximizer và thu được giá trị lớn hơn 
      if (value > bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      // lưu lại giá trị tốt nhất của nút
      alpha = Math.max(alpha, value);
    } else {
      // nếu là Minimizer và thu được giá trị nhỏ hơn 
      if (value < bestMoveValue) {
        bestMoveValue = value;
        bestMove = move;
      }
      beta = Math.min(beta, value);
    }
    
    // quay ngược 1 nước đi
    game.undo();

    // Kiểm tra cắt nhánh
    if (beta <= alpha) {
      break;
    }
  }

  // trả về nước đi mang lại giá trị tốt nhất và giá trị đó
  return [bestMoveValue, bestMove || possibleMoves[0]];
}
