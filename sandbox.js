function Board() {
  this.grid = new Array(1).fill(null).map(function(item, row) {
    return new Array(5).fill(null).map(function(item, col) {
      return new Pawn(row, col, 'white')
    });
  });
  this.grid.push([null, null, null, null, null])
  this.grid.push([null, null, null, null, null])
  this.grid.push([null, null, null, null, null])
  this.grid.push((new Array(1).fill(null).map(function(item, row) {
    return new Array(5).fill(null).map(function(item, col) {
      return new Pawn(row + 3, col, 'black')
    });
  }))[0])
  this.grid[0].splice(0, 1, new Rook(0, 0, 'white'))
  this.grid[4].splice(0, 1, new Rook(4, 0, 'black'))
}

var PiecePrototype = {
  checkLegal: function(x,y) {
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === x && moveset[1] === y
    })
    if (legal) {
      return true
    }
    return false
  }
}


function Pawn(row, col, color) { // can only move forward : 1 case (TO DO: 2 case if firstmove)
  this.class = 'pawn'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.moved = false
  this.legalMoves = []
  this.range = 1
}

function Rook(row, col, color) { // can only move forward : 1 case (TO DO: 2 case if firstmove)
  this.class = 'rook'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.range = 7
}

Board.prototype.render = function() {
  this.grid.forEach(function(row) {
    console.log(row)
  })
}

///////////////////////////////////////////////
//                  ROOK                     //
///////////////////////////////////////////////

Rook.prototype = Object.create(PiecePrototype)

Rook.prototype._canMove = function(x, y) {
  for (i = this.pos.y + 1; i < board.grid.length; i++) { //MOVE DOWN
    if (board.grid[i][this.pos.x]) {
      if (this.color !== board.grid[i][this.pos.x].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([this.pos.x, i])
      }
      i = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([this.pos.x, i])
    }
  }
  for (j = this.pos.y - 1; j > 0; j--) { //MOVE UP
    if (board.grid[j][this.pos.x]) {
      if (this.color !== board.grid[j][this.pos.x].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([this.pos.x, j])
      }
      j = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([this.pos.x, j])
    }
  }
  for (k = this.pos.x + 1; k < board.grid.length; k++) { //MOVE RIGHT
    if (board.grid[this.pos.y][k]) {
      if (this.color !== board.grid[this.pos.y][k].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([k, this.pos.y])
      }
      k = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([k, this.pos.y])
    }
  }
  for (l = this.pos.x - 1; l > 0; l--) { //MOVE LEFT
    if (board.grid[this.pos.y][l]) {
      if (this.color !== board.grid[this.pos.y][l].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([l, this.pos.y])
      }
      l = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([l, this.pos.y])
    }
  }
  console.log(this.legalMoves)
  return this.checkLegal(x,y)
}

Rook.prototype.move = function(x, y) {
  this.legalMoves = []
  if (this._canMove(x, y)) {
    var temp = board.grid[this.pos.y][this.pos.x]
    board.grid[y][x] = temp
    board.grid[this.pos.y].splice(this.pos.x, 1, null)
    this.pos.y = y
    this.pos.x = x
    board.render()
  }
}

///////////////////////////////////////////////
//                 KNIGHT                    //
///////////////////////////////////////////////


///////////////////////////////////////////////
//                 BISHOP                    //
///////////////////////////////////////////////


///////////////////////////////////////////////
//                  QUEEN                    //
///////////////////////////////////////////////




var board = new Board()

board.render()