function Board() {
  this.grid = new Array(2).fill(null).map(function(item, row) {
    return new Array(8).fill(null).map(function(item, col) {
      return new Pawn(row, col)
    })
  })
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push((new Array(1).fill(null).map(function(item, row) {
    return new Array(8).fill(null).map(function(item, col) {
      return new Pawn(row + 3, col, 'black')
    });
  }))[0])
    this.grid.push((new Array(1).fill(null).map(function(item, row) {
    return new Array(8).fill(null).map(function(item, col) {
      return new Pawn(row + 3, col, 'black')
    });
  }))[0])

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

Pawn.prototype.move = function(x, y) {
  console.log(this)
  console.log(this._canMove(x, y))
  if (this._canMove(x, y)) {
    var temp = board.grid[this.pos.y][this.pos.x]
    board.grid[y][x] = temp
    board.grid[this.pos.y].splice(this.pos.x, 1, null)
    this.pos.y = y
    this.pos.x = x
    board.render()
  }

}


Pawn.prototype._canMove = function(x, y) {
  if (this.color === 'white') {
    this.legalMoves = [this.pos.x, this.pos.y + 1]
    if (this.legalMoves[0] === x && this.legalMoves[1] === y) {
      return true
    }
  }
  else {
    this.legalMoves = [this.pos.x, this.pos.y - 1]
    if (this.legalMoves[0] === x && this.legalMoves[1] === y) {
      return true
    }
  }
  return false
}



var board = new Board()

board.render()