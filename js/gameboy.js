var aKey        = 83,
    bKey        = 65,
    selectKey   = 75,
    startKey    = 76,
    upKey       = 38,
    rightKey    = 39,
    downKey     = 40,
    leftKey     = 37,
    tetris,
    tempCurrent,
    current,
    interval,
    pause       = false,
    moveLock    = false,
    over        = false,
    keyCodes    = {};

keyCodes[8]   = 'Backspace',
keyCodes[9]   = 'Tab', //  tab
keyCodes[13]  = 'Enter', //  enter
keyCodes[16]  = 'Shift', //  shift
keyCodes[17]  = 'Ctrl', //  ctrl
keyCodes[18]  = 'Alt', //  alt
keyCodes[19]  = 'Pause/Break', //  pause/break
keyCodes[20]  = 'Caps Lock', //  caps lock
keyCodes[27]  = 'Escape', //  escape
keyCodes[33]  = 'Page Up', // page up, to avoid displaying alternate character and confusing people           
keyCodes[34]  = 'Page Down', // page down
keyCodes[35]  = 'End', // end
keyCodes[36]  = 'Home', // home
keyCodes[37]  = 'Left', // left arrow
keyCodes[38]  = 'Up', // up arrow
keyCodes[39]  = 'Right', // right arrow
keyCodes[40]  = 'Down', // down arrow
keyCodes[45]  = 'Insert', // insert
keyCodes[46]  = 'Delete', // delete
keyCodes[91]  = 'Left Window', // left window
keyCodes[92]  = 'Right Window', // right window
keyCodes[93]  = 'Select Key', // select key
keyCodes[96]  = 'Numpad 0', // numpad 0
keyCodes[97]  = 'Numpad 1', // numpad 1
keyCodes[98]  = 'Numpad 2', // numpad 2
keyCodes[99]  = 'Numpad 3', // numpad 3
keyCodes[100] = 'numpad 4', // numpad 4
keyCodes[101] = 'Numpad 5', // numpad 5
keyCodes[102] = 'Numpad 6', // numpad 6
keyCodes[103] = 'Numpad 7', // numpad 7
keyCodes[104] = 'Numpad 8', // numpad 8
keyCodes[105] = 'Numpad 9', // numpad 9
keyCodes[106] = '*', // multiply
keyCodes[107] = '+', // add
keyCodes[109] = '-', // subtract
keyCodes[110] = '.', // decimal point
keyCodes[111] = '/', // divide
keyCodes[112] = 'F1', // F1
keyCodes[113] = 'F2', // F2
keyCodes[114] = 'F3', // F3
keyCodes[115] = 'F4', // F4
keyCodes[116] = 'F5', // F5
keyCodes[117] = 'F6', // F6
keyCodes[118] = 'F7', // F7
keyCodes[119] = 'F8', // F8
keyCodes[120] = 'F9', // F9
keyCodes[121] = 'F10', // F10
keyCodes[122] = 'F11', // F11
keyCodes[123] = 'F12', // F12
keyCodes[144] = 'Num Lock', // num lock
keyCodes[145] = 'Scroll Lock', // scroll lock
keyCodes[186] = ';', // semi-colon
keyCodes[187] = '=', // equal-sign
keyCodes[188] = ',', // comma
keyCodes[189] = '-', // dash
keyCodes[190] = '.', // period
keyCodes[191] = '/', // forward slash
keyCodes[192] = '`', // grave accent
keyCodes[219] = '[', // open bracket
keyCodes[220] = '\\', // back slash
keyCodes[221] = ']', // close bracket
keyCodes[222] = '\''; // single quote
  
function tetrisPiece() {
  var piece = this;
  piece.num = Math.floor(Math.random()*7);
  piece.startBox = 5;
  piece.blocks = Array(4);
  piece.dropping = false;
  piece.vtn = 0;
  piece.offsetX = 5;
  piece.offsetY = 0;
//  piece.rVars = Array();
  if(piece.num == 0) {
    piece.rVars = [[[1,0],[1,1],[1,2],[1,3]],
                   [[0,1],[1,1],[2,1],[3,1]]];
  } else if(piece.num == 1) {
    piece.rVars = [[[0,2],[1,2],[0,3],[1,3]]];
  } else if(piece.num == 2) {
    piece.rVars = [[[1,1],[0,2],[1,2],[1,3]],
                   [[1,1],[0,2],[1,2],[2,2]],
                   [[1,3],[2,2],[1,2],[1,1]],
                   [[0,2],[1,2],[2,2],[1,3]]];
  } else if(piece.num == 3) {
    piece.rVars = [[[0,3],[1,3],[1,2],[2,2]],
                   [[1,1],[2,3],[1,2],[2,2]]];
  } else if(piece.num == 4) {
    piece.rVars = [[[0,2],[1,2],[1,3],[2,3]],
                   [[0,2],[1,2],[1,1],[0,3]]];
  } else if(piece.num == 5) {
    piece.rVars = [[[0,1],[1,1],[1,2],[1,3]],
                   [[0,2],[1,2],[2,2],[2,1]],
                   [[2,3],[1,1],[1,2],[1,3]],
                   [[0,3],[0,2],[1,2],[2,2]]];
  } else if(piece.num == 6) {
    piece.rVars = [[[1,1],[2,1],[1,2],[1,3]],
                   [[0,2],[1,2],[2,2],[2,3]],
                   [[1,1],[1,2],[1,3],[0,3]],
                   [[0,1],[0,2],[1,2],[2,2]]];
  }
}
  
function dropPiece() {
  if(!pause) {
  for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++) {
    if(tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]  + tetris.curPiece.offsetY + 1 >= 23 || tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1] + tetris.curPiece.offsetY + 1].state == 'occupied') {
      endPiece();
      return false;
    }
  }
  for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++) {
    tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]+tetris.curPiece.offsetY].changeState().changeType();
    //tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]++;
  }
  tetris.curPiece.offsetY++;
  for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
    var extra = '';
      if(tetris.curPiece.vtn == 1 && tetris.curPiece.num == 0) {
        extra = 'r';
      }
      if(tetris.curPiece.num == 0 && i == 0) {
        extra += 'a';
      } else if(tetris.curPiece.num == 0 && i == 3) {
        extra += 'b';
      }
    tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0]+tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]+tetris.curPiece.offsetY].changeState('active').changeType('shape' + (tetris.curPiece.num + 1) + extra);
  }
  interval = setTimeout(dropPiece, 750);
  }
}

function endPiece() {
  var gameOver = false;
  for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
    if(tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0]+tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]+tetris.curPiece.offsetY].changeState('occupied').selector.hasClass('row4')) gameOver = true;
  }
  if(gameOver){
    for(var x= 0; x < 10; x++){
      for(var y = 0; y< 23; y++){
        tetris.grid[x][y].changeType('shape2');
      }
    }
  }
  else { 
    var numChanged = Array();
    for(var y = 22; y > 0; y--){
      var numOccupied = 0;
      for(var x = 0; x < 10; x++) {
        if(tetris.grid[x][y].state != 'blank') numOccupied++;
      }
      if(numOccupied == 10){
        numChanged.push(y);
        for(var x = 0; x < 10; x++) {
          tetris.grid[x][y].changeState('blank').changeType();
        } 
      }
    }
    if(numChanged.length){
      for(var i = 0; i < numChanged.length; i++){
        console.log(numChanged[i]);
        for(var y = numChanged[i]; y > 0; y--){
          for(var x = 0; x < 10; x++) {
            var newY = y - 1;
            while(numChanged.indexOf(newY) > -1) {
              newY--;
            }
            tetris.grid[x][y].changeState(tetris.grid[x][newY].state).changeType(tetris.grid[x][newY].type);
          }
        }
      }
      if(numChanged.length == 1) var points = 40;
      if(numChanged.length == 2) var points = 100;
      if(numChanged.length == 3) var points = 300;
      if(numChanged.length == 4) var points = 1200;
      tetris.score += points * (tetris.level + 1  );
      $('#score').text(tetris.score);
      tetris.lines += numChanged.length;
      $('#lines .number').text(tetris.lines);
    }
    tetris.curPiece = tetris.nextPiece;
    tetris.nextPiece = tetris.createPiece();
    for(var x = 0; x < 4; x++){
      for(var y = 0; y < 4; y++){
        tetris.nextGrid[x][y].changeState().changeType();
      }
    }
    for(var i = 0; i < 4; i++){
      var extra = '';
      if(tetris.nextPiece.vtn == 1 && tetris.nextPiece.num == 0) extra = 'r';
      if(tetris.nextPiece.num == 0 && i == 0) extra += 'a';
      else if(tetris.nextPiece.num == 0 && i == 3) extra += 'b';
      tetris.nextGrid[tetris.nextPiece.rVars[0][i][0]][tetris.nextPiece.rVars[0][i][1]].changeState('active').changeType('shape' + (tetris.nextPiece.num + 1) + extra);
    }
    
    
    for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
      var extra = '';
      if(tetris.curPiece.vtn == 1 && tetris.curPiece.num == 0) extra = 'r';
      if(tetris.curPiece.num == 0 && i == 0) extra += 'a';
      else if(tetris.curPiece.num == 0 && i == 3) extra += 'b';
      tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0]+tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]+tetris.curPiece.offsetY].changeState('active').changeType('shape' + (tetris.curPiece.num + 1) + extra);
    }
    clearInterval(interval);
    dropPiece();
  }
}
function movePiece(dir){
  if(!pause){
  var abort = false;
  if(dir == 'r'){
    for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
      if(tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX + 1 > 9 || tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX+ 1][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1] + tetris.curPiece.offsetY].state == 'occupied') {
        abort = true;
      }
    }
  }
  else if(dir == 'd'){
    for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
      if(tetris.curPiece.rVars[tetris.curPiece.vtn][i][1] + tetris.curPiece.offsetY + 1 >= 23 || tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1] + tetris.curPiece.offsetY + 1].state == 'occupied') {
        endPiece();
        return false;
      }
    }
  }
  else if(dir == 'l'){
    for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
      if(tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX - 1 < 0 || tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX - 1][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1] + tetris.curPiece.offsetY].state == 'occupied') {
        abort = true;
      }
    }
  }
  if(!abort){
    for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
      tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1] + tetris.curPiece.offsetY].changeState().changeType();
    
    }
    if(dir =='l') tetris.curPiece.offsetX--;
    if(dir =='r') tetris.curPiece.offsetX++;
    if(dir =='d') tetris.curPiece.offsetY++;
    for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++){
      var extra = '';
      if(tetris.curPiece.vtn == 1 && tetris.curPiece.num == 0) {
        extra = 'r';
      }
      if(tetris.curPiece.num == 0 && i == 0) {
        extra += 'a';
      } else if(tetris.curPiece.num == 0 && i == 3) {
        extra += 'b';
      }
      tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]+tetris.curPiece.offsetY].changeState('active').changeType('shape' + (tetris.curPiece.num + 1) + extra);
    }
  }
  }
}

function rotatePiece(dir){
  if(!pause) {
    var tempVar;
    var abort = false;
    if(dir == 'l') tempVar = (tetris.curPiece.vtn - 1 < 0) ? tetris.curPiece.rVars.length -1 : tetris.curPiece.vtn - 1 ;
    else if(dir == 'r') tempVar = (tetris.curPiece.vtn +1 >= tetris.curPiece.rVars.length) ? 0 : tetris.curPiece.vtn + 1 ;
    for(var i = 0; i < tetris.curPiece.rVars[tempVar].length; i++){
      if(tetris.curPiece.rVars[tempVar][i][0] + tetris.curPiece.offsetX > 9 || tetris.curPiece.rVars[tempVar][i][0] + tetris.curPiece.offsetX < 0 || tetris.curPiece.rVars[tempVar][i][1] + tetris.curPiece.offsetX >= 23 || tetris.grid[tetris.curPiece.rVars[tempVar][i][0] + tetris.curPiece.offsetX ][tetris.curPiece.rVars[tempVar][i][1] + tetris.curPiece.offsetY].state == 'occupied') {
        abort = true;
      }
    }
    if(!abort){
      for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++) {
        tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1] + tetris.curPiece.offsetY].changeState().changeType();
      }
      tetris.curPiece.vtn = tempVar;
      for(var i = 0; i < tetris.curPiece.rVars[tetris.curPiece.vtn].length; i++) {
        var extra = '';
        if(tetris.curPiece.vtn == 1 && tetris.curPiece.num == 0) {
          extra = 'r';
        }
        if(tetris.curPiece.num == 0 && i == 0) {
          extra += 'a';
        } else if(tetris.curPiece.num == 0 && i == 3) {
          extra += 'b';
        }
        tetris.grid[tetris.curPiece.rVars[tetris.curPiece.vtn][i][0] + tetris.curPiece.offsetX][tetris.curPiece.rVars[tetris.curPiece.vtn][i][1]+tetris.curPiece.offsetY].changeState('active').changeType('shape' + (tetris.curPiece.num + 1) + extra);
      }
    }
  }
}

function tetrisBlock(id, x, y){
  var block = this;
  block.state = 'blank';
  block.selector = $('#'+ id +' .col'+ x + '.row' + y);
  block.type = '';
  block.changeState = function(newState){
    if (undefined != newState) {
      block.selector.removeClass(block.state).addClass(newState);
      block.state = newState;
    }
    else {
      block.selector.removeClass(block.state).addClass('blank');
      block.state = 'blank';
    }
    return block;
  };
  block.changeType = function(newType){
    if (undefined != newType) {
      block.selector.removeClass(block.type).addClass(newType);
      block.type = newType;
    }
    else {
      block.selector.removeClass(block.type);
      block.type = '';
    }
    return block;
  };
  block.updateGrid = function(){
  };
}
function tetrisGame(){
  var game = this;
  game.score = 0;
  game.lines = 0;
  game.level = 0;
  game.grid = new Array();
  game.nextGrid = new Array();
  game.createPiece = function(){
    //var tempPiece  = new tetrisPiece();
    /*for(var i = 0; i < tempPiece.rVars[0].length; i++){
      tempPiece.rVars[0][i][0] += tempPiece.startBox;
    }*/
    return new tetrisPiece();
  };

  game.nextPiece = game.createPiece();
  game.curPiece = game.createPiece();

  for(var x= 0; x < 10; x++){
    game.grid[x] = new Array(23);
    for(var y = 0; y< 23; y++){
      game.grid[x][y] = new tetrisBlock('grid', x,y);
    }
  }

  for(var x= 0; x < 4; x++){
    game.nextGrid[x] = new Array(4);
    for(var y = 0; y< 4; y++){
      game.nextGrid[x][y] = new tetrisBlock('nextPiece', x,y);
    }
  }

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
  
}

function intro(){
  $('#intro').delay(800).animate({'top':'80px'},2000, function(){
      $('body').append('<audio  preload="auto" autoplay="autoplay" style="display:none;"><source src="start.mp3" /></audio>');
  }).delay(1000).fadeOut(0);
}
function pauseGame(){
  if(!pause){
    pause = true;
    clearTimeout(interval);
    $('#screen').append('<div id="pause"><span>HIT</span><br/><span>START</span><br/><span>TO</span><br/><span>CONTINUE</span><br/><span>GAME</span></div>');
  }
  else {
    pause = false;
    interval =  setTimeout(dropPiece, 750);
    $('#pause').remove(); 
  }
}

function keyHandler(e){
  
  if(!$(e.srcElement).is('.txtChar')){
    if (e.keyCode == selectKey) { 
      $('#select').trigger('mousedown');
       return false;
    } else if (e.keyCode == startKey) { 
    $(this).unbind('keydown');
      $('#start').trigger('mousedown');
       return false;
    } else if (e.keyCode == bKey) { 
     $(this).unbind('keydown');
      $('#b_button').trigger('mousedown');
       return false;
    } else if (e.keyCode == aKey) { 
     $(this).unbind('keydown');
      $('#a_button').trigger('mousedown');
       return false;
    } else if (e.keyCode == upKey) { 
      $('#top').trigger('mousedown');
       return false;
    } else if (e.keyCode == rightKey) { 
      $('#right').trigger('mousedown');
       return false;
    } else if (e.keyCode == downKey) { 
      $('#bottom').trigger('mousedown');
       return false;
    } else if (e.keyCode == leftKey) { 
      $('#left').trigger('mousedown');
       return false;
    }
  }
}

$(document).ready(function(){
  tetris = new tetrisGame();
  // intro();
  interval =  setTimeout(dropPiece, 750);

  $('#screen').css('background','url(img/tetris.png) top left no-repeat');
    $('.info').show(0);
  $('#top').bind('mousedown',function(){
     $('#d_pad').css('background-position','-90px 0');
   });
  $('#right').bind('mousedown', function(){
     movePiece('r');
     $('#d_pad').css('background-position','-180px 0');
   });
  $('#bottom').bind('mousedown', function(){
    movePiece('d');
     $('#d_pad').css('background-position','-270px 0');
   });
  $('#left').bind('mousedown', function(){
    movePiece('l');
     $('#d_pad').css('background-position','-360px 0');
   });
  $('.arrow').bind('mouseup', function(){
     $('#d_pad').css('background-position','0 0');
   });
  $('.button').bind('mouseup', function(){
     $(this).css('background-position','0 0');
   });
  
  $('#onLight').animate({'opacity':'1'},400);
  
  $('#b_button').bind('mousedown',function(){
    rotatePiece('l');
    $(this).css('background-position','-45px 0');
   });
  $('#a_button').bind('mousedown',function(){
    rotatePiece('r');
    $(this).css('background-position','-45px 0');
   });
  $('#select').bind('mousedown',function(){
     $(this).css('background-position','-43px 0');
   });
  $('#start').bind('mousedown',function(){
    pauseGame();
    $(this).css('background-position','-42px 0');
   });

  $('#gear').click(function(){
    if($('.open').length){
      $('#config').removeClass('open').animate({'bottom':'-110px','right':'-360px'},200);
    }
    else $('#config').addClass('open').animate({'bottom':'0px','right':'0px'},200);
  });

  $(document).keydown(keyHandler);

  $(document).keyup(function(e){
    if (e.keyCode == selectKey) { 
      $('#select').trigger('mouseup');
       return false;
    } else if (e.keyCode == startKey) { 
    $(this).bind('keydown', keyHandler);
      $('#start').trigger('mouseup');
       return false;
    } else if (e.keyCode == bKey) {
      $(this).bind('keydown', keyHandler);
      $('#b_button').trigger('mouseup');
       return false;
    } else if (e.keyCode == aKey) {
      $(this).bind('keydown', keyHandler);
      $('#a_button').trigger('mouseup');
       return false;
    } else if (e.keyCode == upKey || e.keyCode == rightKey || e.keyCode == downKey || e.keyCode == leftKey) { 
      $('#left').trigger('mouseup');
       return false;
    }
  });

  $('.txtChar').keypress(function(){return false});
  $('.txtChar').keydown(function(e){displayKeyCode(e);});
  $('#config .reset').click(function(){
    aKey        = 83,
    bKey        = 65,
    selectKey   = 75,
    startKey    = 76,
    upKey       = 38,
    rightKey    = 39,
    downKey     = 40,
    leftKey     = 37;
    $('#upConfig').val('Up');
    $('#rightConfig').val('Right');
    $('#downConfig').val('Down');
    $('#leftConfig').val('Left');
    $('#bConfig').val('A');
    $('#aConfig').val('S');
    $('#selectConfig').val('K');
    $('#startConfig').val('L');
  });
});

function displayKeyCode(evt) {
  var textBox = $(evt.srcElement),
      charCode = (evt.which) ? evt.which : event.keyCode,
      exit = false;

  $('.txtChar').each(function(index){
    if( ( String.fromCharCode(charCode) == $(this).val() || keyCodes[charCode] == $(this).val() )&& $(this) != textBox) {
      exit = true;
    }
  });

  if(!exit){
    textBox.val(String.fromCharCode(charCode));

    if(keyCodes.hasOwnProperty(charCode)) {
      textBox.val(keyCodes[charCode]);
    }
    
    if(evt.srcElement.name == 'upConfig') {
      upKey = charCode;
    } else if(evt.srcElement.name == 'rightConfig') {
      rightKey = charCode;
    } else if(evt.srcElement.name == 'downConfig') {
      downKey = charCode;
    } else if(evt.srcElement.name == 'leftConfig') {
      leftKey = charCode;
    } else if(evt.srcElement.name == 'bConfig') {
      bKey = charCode;
    } else if(evt.srcElement.name == 'aConfig') {
      aKey = charCode;
    } else if(evt.srcElement.name == 'selectConfig') {
      selectKey = charCode;
    } else if(evt.srcElement.name == 'startConfig') {
      startKey = charCode;
    }
  }
  
  return false;
 }