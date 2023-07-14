// độ khó của máy 
var makeMove = function(skill) { 
  // game kết thúc thì thông báo
  if (game.game_over() === true) {
    console.log('game over');
    return;
  }

  // lấy ra nước đi tốt nhất
  var move = calcBestMove(skill, game, game.turn());
  console.log(move[0]);
  game.move(move[1]);
  // update vị trí
  board.position(game.fen());
}


// sau khi ng si chuyển
var onDrop = function(source, target) {
  var move = game.move({
    from: source,
    to: target,
    promotion: 'q' 
  });

  // Nếu di chuyển không hợp lệ
  if (move === null) return 'snapback';
  // make move for black
  window.setTimeout(function() {
    makeMove(5);
  }, 1000);
};

