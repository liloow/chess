function Board() {


  //TO DO : OPTIMIZE THIS CRAP



  //BOARD CREATION

  this.grid = new Array(2).fill(null).map(function(item, row) {
    return new Array(8).fill(null).map(function(item, col) {
      return new Pawn(row, col, 'white')
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
  this.grid[0].splice(4, 1, new King(0, 4, 'white'))
  this.grid[7].splice(4, 1, new King(7, 4, 'black'))
  this.grid[0].splice(0, 1, new Rook(0, 0, 'white'))
  this.grid[7].splice(0, 1, new Rook(7, 0, 'black'))
  this.grid[0].splice(7, 1, new Rook(0, 7, 'white'))
  this.grid[7].splice(7, 1, new Rook(7, 7, 'black'))
  this.grid[0].splice(1, 1, new Knight(0, 1, 'white'))
  this.grid[7].splice(1, 1, new Knight(7, 1, 'black'))
  this.grid[0].splice(6, 1, new Knight(0, 6, 'white'))
  this.grid[7].splice(6, 1, new Knight(7, 6, 'black'))
  this.grid[0].splice(2, 1, new Bishop(0, 2, 'white'))
  this.grid[7].splice(2, 1, new Bishop(7, 2, 'black'))
  this.grid[0].splice(5, 1, new Bishop(0, 5, 'white'))
  this.grid[7].splice(5, 1, new Bishop(7, 5, 'black'))
  this.grid[0].splice(3, 1, new Queen(0, 3, 'white'))
  this.grid[7].splice(3, 1, new Queen(7, 3, 'black'))


  // PLAYER RELATED

  this.currentPlayer = 0

  this.whiteKingPosition = {
    x: 4,
    y: 0,
  }
  this.blackKingPosition = {
    x: 4,
    y: 7,
  }
  this.whiteAssets = this.grid[0].concat(this.grid[1])
  this.blackAssets = this.grid[7].concat(this.grid[6])
  this.whiteWin = false
  this.blackWin = false

}

Board.prototype.render = function() {
  this.grid.forEach(function(row) {
    console.log(row)
  })
}

var PiecePrototype = {
  checkLegal: function(x, y) {
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === y && moveset[1] === x
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
      if (this.class = 'king') {
        if (this.color = 'white') {
          board.whiteKingPosition = this.pos
        } else {
          board.blackKingPosition = this.pos
        }
      }
    }
  },
  checkCheckLastPlayed: function(x, y) {
    if (this.color === 'white') {
      if (this._canMove(board.blackKingPosition.x, board.blackKingPosition.y))
        alert('!!CHECK!!')
      return true
    }
    if (this.color === 'black') {
      if (this._canMove(board.whiteKingPosition.x, board.whiteKingPosition.y))
        alert('!!CHECK!!')
      return true
    }
    return false
  },
  checkCheck: function() {
 //   debugger
    if (!board.currentPlayer) {
      a = board.blackKingPosition.x
      b = board.blackKingPosition.y
      return board.whiteAssets.map((el, i) => { return el._canMove(a, b) }).some((el, i) => { return el })
    }
    if (board.currentPlayer) {
      a = board.whiteKingPosition.x
      b = board.whiteKingPosition.y
      return board.blackAssets.map((el, i) => { return el._canMove(a, b) }).some((el, i) => { return el })
    }
  }
}

///////////////////////////////////////////////
//          PIECES CONSTRUCTORS              //
///////////////////////////////////////////////


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

function King(row, col, color) {
  this.class = 'king'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.range = 1
}
King.prototype = Object.create(PiecePrototype)

function Rook(row, col, color) {
  this.class = 'rook'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.range = 7
}
Rook.prototype = Object.create(PiecePrototype)

function Knight(row, col, color) {
  this.class = 'knight'
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.range = 3
}
Knight.prototype = Object.create(PiecePrototype)

function Bishop(row, col, color) {
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

function Queen(row, col, color) {
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
//                  PAWN                     //
///////////////////////////////////////////////


Pawn.prototype.move = function(x, y) {
  this.legalMoves = []
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

///////////////////////////////////////////////
//                  KING                     //
///////////////////////////////////////////////

King.prototype._canMove = function(x, y) {
  var that = this
  if (this.color === 'white') {
    for (i = (that.pos.x - 1); i <= (that.pos.x + 1); i++) { //scope of legal moves
      for (j = (that.pos.y - 1); j <= (that.pos.y + 1); j++) {
        this.legalMoves.push([j, i])
      }
    }
  } else {
    for (i = this.pos.y - 1; i <= this.pos.y + 1; i++) { //scope of legal moves
      for (j = this.pos.x - 1; j <= this.pos.x + 1; j++) {
        this.legalMoves.push([j, i])
      }
    }
  }
  this.legalMoves.splice(4, 1)
 // debugger
  let inbound = this.legalMoves.filter((el, i) => {
    return (el[0] >= 0 && el[1] >= 0) && (el[0] < board.grid.length && el[1] < board.grid.length) // UGLY TRICK TO REMOVE OUT OF BOUNDS MOVES
  }).filter((el,i)=>{return board.grid[el[0]][el[1]] === null || board.grid[el[0]][el[1]].color !== that.color})
  this.legalMoves = inbound
  console.log(this.legalMoves)
  return this.checkLegal(x, y)
}

///////////////////////////////////////////////
//                  ROOK                     //
///////////////////////////////////////////////

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
  return this.checkLegal(x, y)
}

///////////////////////////////////////////////
//                 KNIGHT                    //
///////////////////////////////////////////////

Knight.prototype._canMove = function(x, y) {
  var that = this
  for (i = (this.pos.y - 2); i <= (this.pos.y + 2); i += 4) {
    this.legalMoves.push([i, this.pos.x + 1])
    this.legalMoves.push([i, this.pos.x - 1])
  }
  for (j = (this.pos.x - 2); j <= (this.pos.x + 2); j += 4) {
    this.legalMoves.push([this.pos.y + 1, j])
    this.legalMoves.push([this.pos.y - 1, j])
  }
  var caseExist = this.legalMoves.filter(function(item) {
    return (item[0] >= 0 && item[1] >= 0) && (item[0] < board.grid.length && item[1] < board.grid.length)
  }).filter(function(item) {
    if (!board.grid[item[0]][item[1]]) return true
    return that.color !== board.grid[item[0]][item[1]].color
  })
  this.legalMoves = caseExist
  console.log(this.legalMoves)
  return this.checkLegal(x, y)
}

///////////////////////////////////////////////
//                 BISHOP                    //
///////////////////////////////////////////////

Bishop.prototype._canMove = function(x, y) {
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
  var caseExist = this.legalMoves.filter(function(item) {
    return (item[0] >= 0 && item[1] >= 0) && (item[0] < board.grid.length && item[1] < board.grid.length) // UGLY TRICK TO REMOVE OUT OF BOUNDS MOVES
  })
  this.legalMoves = caseExist
  console.log(this.legalMoves)
  return this.checkLegal(x, y)
}

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
  for (i = Y + 1; i < board.grid.length; i++) { //MOVE DOWN
    if (board.grid[i][X]) {
      if (this.color !== board.grid[i][X].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([X, i])
      }
      i = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([X, i])
    }
  }
  for (j = Y - 1; j > 0; j--) { //MOVE UP
    if (board.grid[j][X]) {
      if (this.color !== board.grid[j][X].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([X, j])
      }
      j = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([X, j])
    }
  }
  for (k = X + 1; k < board.grid.length; k++) { //MOVE RIGHT
    if (board.grid[Y][k]) {
      if (this.color !== board.grid[Y][k].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([k, Y])
      }
      k = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([k, Y])
    }
  }
  for (l = X - 1; l > 0; l--) { //MOVE LEFT
    if (board.grid[Y][l]) {
      if (this.color !== board.grid[Y][l].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([l, Y])
      }
      l = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([l, Y])
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