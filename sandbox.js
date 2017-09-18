function Board() {
  this.grid = new Array(1).fill(null).map(function(item, row) {
    return new Array(4).fill(null).map(function(item, col) {
      return new Pawn(row, col)
    })
  })
  this.grid.push([null, null, null, null])
  this.grid.push([null, null, null, null])
  this.grid.push([null, null, null, null])
}


function Pawn(row, col) { // can only move forward : 1 case (TO DO: 2 case if firstmove)
  this.class = 'pawn'
  this.pos = {
    x: col,
    y: row,
  }
  this.moved = false
  this.legalMoves = [this.pos.x,this.pos.y+1]
}

Board.prototype.render = function() {
  this.grid.forEach(function(row) {
    console.log(row)
  })
}




Board.prototype.updateboard = function(lastplayed) {

}

Pawn.prototype.move = function(x, y) {
  console.log(this)
  console.log(this._canMove(x,y))
  if (this._canMove(x,y)) {
    var temp = board.grid[0][2]
    board.grid[y][x] = temp
    board.grid[0].splice(2,1,null)
    board.render()
  }

}



Pawn.prototype._canMove = function(x, y) {
  this.legalMoves = [this.pos.x, this.pos.y + 1]
  if (this.legalMoves[0] === x && this.legalMoves[1] === y) {
    return true
  }
  return false
}




var board = new Board()

board.render()