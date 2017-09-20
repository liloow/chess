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
  this.grid[0].splice(2, 1, new Bishop(0, 2, 'white'))
  this.grid[4].splice(2, 1, new Bishop(4, 2, 'black'))
}

var PiecePrototype = {
  checkLegal: function(x, y) {
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === x && moveset[1] === y
    })
    if (legal) {
      return true
    }
    return false
  },
  move: function(x, y) {
    this.legalMoves = []
    if (this._canMove(x, y)) {
      var temp = board.grid[this.pos.y][this.pos.x]
      board.grid[y][x] = temp
      board.grid[this.pos.y].splice(this.pos.x, 1, null)
      this.pos.y = y
      this.pos.x = x
      board.render()
    }
  },
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



Board.prototype.render = function() {
  this.grid.forEach(function(row) {
    console.log(row)
  })
}

function Bishop(row, col, color) { // can only move forward : 1 case (TO DO: 2 case if firstmove)
  this.class = 'knight'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.range = 3
}

Bishop.prototype = Object.create(PiecePrototype)




///////////////////////////////////////////////
//                 BISHOP                    //
///////////////////////////////////////////////

Bishop.prototype._canMove = function(x, y) {
  for (i = this.pos.y; i < board.grid.length; i++) { //MOVE DOWN
    this.legalMoves.push([this.pos.y - i, this.pos.x - i])
    this.legalMoves.push([this.pos.y + i, this.pos.x + i])
  }
  for (j = this.pos.y; i < board.grid.length; i++) { //MOVE DOWN
    this.legalMoves.push([this.pos.y - i, this.pos.x + i])
    this.legalMoves.push([this.pos.y + i, this.pos.x - i])
  }
/*  var caseExist = this.legalMoves.filter(function(item) {
    return (item[0] >= 0 && item[1] >= 0)
  })
  this.legalMoves = caseExist */
  console.log(this.legalMoves)
}


///////////////////////////////////////////////
//                  QUEEN                    //
///////////////////////////////////////////////




var board = new Board()

board.render()