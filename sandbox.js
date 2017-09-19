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
  this.legalMoves = []
  console.log(this)
  console.log(this._canMove(x, y))
  console.log(this._canAttack(x, y))
  if (this._canMove(x, y) || this._canAttack(x, y)) {
    var temp = board.grid[this.pos.y][this.pos.x]
    board.grid[y][x] = temp
    board.grid[this.pos.y].splice(this.pos.x, 1, null)
    this.pos.y = y
    this.pos.x = x
    this.moved = true
    board.render()
  }

}


Pawn.prototype._canMove = function(x, y) {
  if (this.color === 'white') {
    if (!this.moved) {
      this.legalMoves.push([this.pos.x, this.pos.y + 2])
    }
    this.legalMoves.push([this.pos.x, this.pos.y + 1])
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === x && moveset[1] === y
    })
    if (legal) {
      return true
    }
  } else {
    if (!this.moved) {
      this.legalMoves.push([this.pos.x, this.pos.y - 2])
    }
    this.legalMoves.push([this.pos.x, this.pos.y - 1])
    var legal = this.legalMoves.some(function(moveset) {
      console.log(moveset)
      return moveset[0] === x && moveset[1] === y
    })
    if (legal) {
      return true
    }

    return false
  }
}


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




var board = new Board()

board.render()