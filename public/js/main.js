// độ khó của máy 
var makeMove = function(algo, skill=5) { 
  // exit if the game is over
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  // Calculate the best move, using chosen algorithm
  if (algo === 1) {
    var move = randomMove();
  } else if (algo === 2) {
    var move = calcBestMoveOne(game.turn());
  } else if (algo === 3) {
    var move = calcBestMoveNoAB(skill, game, game.turn())[1];
  } else {
    var move = calcBestMove(skill, game, game.turn())[1];
  }
  // Make the calculated move
  game.move(move);
  // Update board positions
  board.position(game.fen());
}

// Computer vs Computer
var playGame = function(algo=4, skillW=2, skillB=2) {
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }
  var skill = game.turn() === 'w' ? skillW : skillB;
  makeMove(algo, skill);
  window.setTimeout(function() {
    playGame(algo, skillW, skillB);
  }, 250);
};

// Handles what to do after human makes move.
// Computer automatically makes next move
var onDrop = function(source, target) {
  // kiểm tra xem việc di chuyển có hợp lệ hay ko 
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q'
  });

  // Nếu đi nước ko thể đi thì qua trở lại 
  if (move === null) return 'snapback';

  // make move for black
  window.setTimeout(function() {
    makeMove(4, 3);
  }, 250);
  // Log the move
  console.log("Move" + move)
};
