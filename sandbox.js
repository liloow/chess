function Board() {
  this.grid = new Array(1).fill(null).map(function(item, row) {
    return new Array(4).fill(null).map(function(item, col) {
      return new Pawn(row, col, 'white')
    });
  });
  this.grid.push([null, null, null, null])
  this.grid.push([null, null, null, null])
  this.grid.push((new Array(1).fill(null).map(function(item, row) {
    return new Array(4).fill(null).map(function(item, col) {
      return new Pawn(row + 3, col, 'black')
    });
  }))[0])
  this.grid[0].splice(1, 1, new King(0, 1, 'white'))
  this.grid[3].splice(2, 1, new King(3, 2, 'black'))
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

function King(row, col, color) { // can only move forward : 1 case (TO DO: 2 case if firstmove)
  this.class = 'king'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.range = 1
}

Board.prototype.render = function() {
  this.grid.forEach(function(row) {
    console.log(row)
  })
}

///////////////////////////////////////////////
//                  PAWN                     //
///////////////////////////////////////////////


Pawn.prototype._canAttack = function(x, y) {
  var target = board.grid[y][x]
  console.log(target)
  if (target === null) return false // If empty, stop function

  if (target.color === 'white') {
    if (
      this.color === 'black' && (
        (this.pos.x === x - 1 && this.pos.y === y + 1) ||
        (this.pos.x === x + 1 && this.pos.y === y + 1)
      )) {
      this.legalMoves.push([y, x])
      return true
    }

  } else if (target.color === 'black') {
    if (
      this.color === 'white' && (
        (this.pos.x === x - 1 && this.pos.y === y - 1) ||
        (this.pos.x === x + 1 && this.pos.y === y - 1)
      )) {
      this.legalMoves.push([y, x])
      return true
    }
  }
  return false
}


///////////////////////////////////////////////
//                  KING                     //
///////////////////////////////////////////////


King.prototype.move = function(x, y) {
  this.legalMoves = [] // reset legal moves
  if (this._canMove(x, y)) {
    var temp = board.grid[this.pos.y][this.pos.x]
    board.grid[y][x] = temp
    board.grid[this.pos.y].splice(this.pos.x, 1, null)
    this.pos.y = y
    this.pos.x = x
    board.render()
  }
}

King.prototype._canMove = function(x, y) {
  var that = this
  if (this.color === 'white') {
    for (i = (that.pos.x - 1); i <= (that.pos.x + 1); i++) { //scope of legal moves
      for (j = (that.pos.y - 1); j <= (that.pos.y + 1); j++) {
        this.legalMoves.push([i, j])
      }
    }
    this.legalMoves.splice(4, 1)
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === x && moveset[1] === y
    })
    if (legal) return true
  } else {
    for (i = this.pos.y - 1; i <= this.pos.y + 1; i++) { //scope of legal moves
      for (j = this.pos.x - 1; j <= this.pos.x + 1; j++) {
        this.legalMoves.push([j, i])
      }
    }
    this.legalMoves.splice(4, 1)
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === x && moveset[1] === y
    })
    if (legal) return true
  }
  return false
}


///////////////////////////////////////////////
//                  ROOK                     //
///////////////////////////////////////////////


///////////////////////////////////////////////
//                 KNIGHT                    //
///////////////////////////////////////////////

///////////////////////////////////////////////
//                  PAWN                     //
///////////////////////////////////////////////




var board = new Board()

board.render()