# Gameboy Tetris

This was a weekend project from early 2012, written mostly in jQuery. Not the best code I've written, here's an example:

```javascript
  if(game.curPiece.num == 0) {
    game.grid[game.curPiece.rVars[game.curPiece.vtn][0][0] + game.curPiece.offsetX][game.curPiece.rVars[game.curPiece.vtn][0][1]].changeState('active').changeType('shape' + (game.curPiece.num + 1) + 'a');
  } else {
    game.grid[game.curPiece.rVars[game.curPiece.vtn][0][0] + game.curPiece.offsetX][game.curPiece.rVars[game.curPiece.vtn][0][1]].changeState('active').changeType('shape' + (game.curPiece.num + 1));
  }

  game.grid[game.curPiece.rVars[game.curPiece.vtn][1][0] + game.curPiece.offsetX][game.curPiece.rVars[game.curPiece.vtn][1][1]].changeState('active').changeType('shape' + (game.curPiece.num + 1));
  game.grid[game.curPiece.rVars[game.curPiece.vtn][2][0] + game.curPiece.offsetX][game.curPiece.rVars[game.curPiece.vtn][2][1]].changeState('active').changeType('shape' + (game.curPiece.num + 1));

  if(game.curPiece.num == 0) {
    game.grid[game.curPiece.rVars[game.curPiece.vtn][3][0] + game.curPiece.offsetX][game.curPiece.rVars[game.curPiece.vtn][3][1]].changeState('active').changeType('shape' + (game.curPiece.num + 1) + 'b');
  } else {
    game.grid[game.curPiece.rVars[game.curPiece.vtn][3][0] + game.curPiece.offsetX][game.curPiece.rVars[game.curPiece.vtn][3][1]].changeState('active').changeType('shape' + (game.curPiece.num + 1));
  }
  
  if(game.nextPiece.num == 0) {
    game.nextGrid[game.nextPiece.rVars[0][0][0]][game.nextPiece.rVars[0][0][1]].changeState('active').changeType('shape' + (game.nextPiece.num + 1) + 'a');
  } else {
    game.nextGrid[game.nextPiece.rVars[0][0][0]][game.nextPiece.rVars[0][0][1]].changeState('active').changeType('shape' + (game.nextPiece.num + 1));
  }

  game.nextGrid[game.nextPiece.rVars[0][1][0]][game.nextPiece.rVars[0][1][1]].changeState('active').changeType('shape' + (game.nextPiece.num + 1));
  game.nextGrid[game.nextPiece.rVars[0][2][0]][game.nextPiece.rVars[0][2][1]].changeState('active').changeType('shape' + (game.nextPiece.num + 1));

  if(game.nextPiece.num == 0) {
    game.nextGrid[game.nextPiece.rVars[0][3][0]][game.nextPiece.rVars[0][3][1]].changeState('active').changeType('shape' + (game.nextPiece.num + 1) + 'b');
  } else {
    game.nextGrid[game.nextPiece.rVars[0][3][0]][game.nextPiece.rVars[0][3][1]].changeState('active').changeType('shape' + (game.nextPiece.num + 1));
  }
 ```