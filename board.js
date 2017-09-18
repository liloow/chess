function Board() {
  this.grid = [
    [pawn, pawn, pawn, king, pawn, pawn, pawn, pawn],
    [pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [null, null, null, null, null, null, null, null],
    [pawn, pawn, pawn, pawn, pawn, pawn, pawn, pawn],
    [pawn, pawn, pawn, pawn, king, pawn, pawn, pawn]
  ]
  this.currentPlayer = 0
  this.victory = false
}

function Pawn() {
  this.name = 'pawn'
  this.movementMax = 1
}

function King() {
  this.name = 'king'
(  this.movementMax = null)
}






var board = new Board()