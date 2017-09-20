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
  this.grid[0].splice(2, 1, new Queen(0, 2, 'white'))
  this.grid[4].splice(2, 1, new Queen(4, 2, 'black'))
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

function Queen(row, col, color) { // can only move forward : 1 case (TO DO: 2 case if firstmove)
  this.class = 'queen'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.range = 3
}

Queen.prototype = Object.create(PiecePrototype)

///////////////////////////////////////////////
//                  QUEEN                    //
///////////////////////////////////////////////

Queen.prototype._canMove = function(x, y) {
  var X = this.pos.x
  var Y = this.pos.y
  for (i = 1; i < board.grid.length; i++) { //MOVE UP LEFT
    if (board.grid[Y - i]) {
      if (board.grid[Y - i][X - i]) {
        if (this.color !== board.grid[Y - i][X - i].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([X - i, Y - i])
        }
        i = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([X - i, Y - i])
      }
    }
  }
  for (j = 1; j < board.grid.length; j++) { // MOVE DOWN RIGHT
    if (board.grid[Y + j]) {
      if (board.grid[Y + j][X + j]) {
        if (this.color !== board.grid[Y + j][X + j].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([X + j, Y + j])
        }
        j = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([X + j, Y + j])
      }
    }
  }
  for (k = 1; k < board.grid.length; k++) { //MOVE DOWN LEFT 
    if (board.grid[Y + k]) {
      if (board.grid[Y + k][X - k]) {
        if (this.color !== board.grid[Y + k][X - k].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([X - k, Y + k])
        }
        k = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([X - k, Y + k])
      }
    }
  }
  for (l = 1; l < board.grid.length; l++) { // MOVE UP RIGHT
    if (board.grid[Y - l]) {
      if (board.grid[Y - l][X + 1]) {
        if (this.color !== board.grid[Y - l][X + l].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([X + l, Y - l])
        }
        l = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([X + l, Y - l])
      }
    }
  }
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
  var caseExist = this.legalMoves.filter(function(item) {
    return (item[0] >= 0 && item[1] >= 0) && (item[0] < board.grid.length && item[1] < board.grid.length) // UGLY TRICK TO REMOVE OUT OF BOUNDS MOVES
  })
  this.legalMoves = caseExist
  console.log(this.legalMoves)
  return this.checkLegal(x, y)
}


var board = new Board()

board.render()