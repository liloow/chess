function Board() {


  //TO DO : OPTIMIZE THIS CRAP



  //BOARD CREATION

  let id = 0

  this.grid = new Array(1).fill(null).map(function(item, row) {
    return new Array(8).fill(null)
  })

  this.grid.push((new Array(1).fill(null).map(function(item, row) {
    return new Array(8).fill(null).map(function(item, col) {
      id++
      return new Pawn(row + 1, col, 'white', id)
    })
  }))[0])
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push([null, null, null, null, null, null, null, null])
  this.grid.push((new Array(1).fill(null).map(function(item, row) {
    return new Array(8).fill(null).map(function(item, col) {
      id++
      return new Pawn(row + 6, col, 'black', id)
    });
  }))[0])
  this.grid.push((new Array(1).fill(null).map(function(item, row) {
    return new Array(8).fill(null)
  }))[0])
  this.grid[0].splice(4, 1, new King(0, 4, 'white', 1))
  this.grid[7].splice(4, 1, new King(7, 4, 'black', 2))
  this.grid[0].splice(0, 1, new Rook(0, 0, 'white', 1))
  this.grid[7].splice(0, 1, new Rook(7, 0, 'black', 3))
  this.grid[0].splice(7, 1, new Rook(0, 7, 'white', 2))
  this.grid[7].splice(7, 1, new Rook(7, 7, 'black', 4))
  this.grid[0].splice(1, 1, new Knight(0, 1, 'white', 1))
  this.grid[7].splice(1, 1, new Knight(7, 1, 'black', 3))
  this.grid[0].splice(6, 1, new Knight(0, 6, 'white', 2))
  this.grid[7].splice(6, 1, new Knight(7, 6, 'black', 4))
  this.grid[0].splice(2, 1, new Bishop(0, 2, 'white', 1))
  this.grid[7].splice(2, 1, new Bishop(7, 2, 'black', 3))
  this.grid[0].splice(5, 1, new Bishop(0, 5, 'white', 2))
  this.grid[7].splice(5, 1, new Bishop(7, 5, 'black', 4))
  this.grid[0].splice(3, 1, new Queen(0, 3, 'white', 1))
  this.grid[7].splice(3, 1, new Queen(7, 3, 'black', 2))


  // PLAYER RELATED

  this.currentPlayer = true
  this.players = {
    true: 'white',
    false: 'black',
  }

  this.whiteKingPosition = {
    x: 4,
    y: 0,
    isCheck: false,
  }
  this.blackKingPosition = {
    x: 4,
    y: 7,
    isCheck: false,
  }
  this.whiteAssets = this.grid[0].concat(this.grid[1])
  this.blackAssets = this.grid[7].concat(this.grid[6])
  this.whiteWin = false
  this.blackWin = false
  this.graveyard = []

}

Board.prototype.render = function() {
  this.grid.forEach(function(row) {
    console.log(row)
  })
}

var PiecePrototype = {
  checkLegal: function(y, x) {
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === y && moveset[1] === x
    })
    if (legal) {
      return true
    }
    return false
  },
  move: function(y, x) {
    this.legalMoves = []
    if (this._canMove(y, x)) {
      var temp = board.grid[this.pos.y][this.pos.x]
      board.grid[y][x] = temp
      board.grid[this.pos.y].splice(this.pos.x, 1, null)
      this.pos.y = y
      this.pos.x = x
      board.render()
      if (this.class = 'king') {
        if (this.color = 'white') {
          board.whiteKingPosition.x = this.pos.x
          board.whiteKingPosition.y = this.pos.y
        } else {
          board.blackKingPosition.x = this.pos.x
          board.blackKingPosition.y = this.pos.y
        }
      }
      board.currentPlayer = !board.currentPlayer
      died()
      render()
      if (this.checkCheck()) {
        if (!board.currentPlayer) {
          board.blackKingPosition.isCheck = true

        } else {
          board.whiteKingPosition.isCheck = true
        }
        check()
        console.log('!!CHECK!!')
        console.log('!!CHECK!!')
        console.log('!!CHECK!!')
        console.log('!!CHECK!!')
        console.log('!!CHECK!!')
        console.log('!!CHECK!!')
        return;
      }
      board.blackKingPosition.isCheck = false
      board.whiteKingPosition.isCheck = false
    }
  },
  checkCheck: function() {
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


function Pawn(row, col, color, id) { // can only move forward : 1 case 
  this.class = 'Pawn'
  this.id = this.class + '-' + id
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.moved = false
  this.legalMoves = []
  this.dead = false
}
Pawn.prototype = Object.create(PiecePrototype)

function King(row, col, color, id) {
  this.class = 'King'
  this.id = this.class + '-' + id
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.dead = false
}
King.prototype = Object.create(PiecePrototype)

function Rook(row, col, color, id) {
  this.class = 'Rook'
  this.id = this.class + '-' + id
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.dead = false
}
Rook.prototype = Object.create(PiecePrototype)

function Knight(row, col, color, id) {
  this.class = 'Knight'
  this.id = this.class + '-' + id
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.dead = false
}
Knight.prototype = Object.create(PiecePrototype)

function Bishop(row, col, color, id) {
  this.class = 'Bishop'
  this.id = this.class + '-' + id
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.dead = false
}
Bishop.prototype = Object.create(PiecePrototype)

function Queen(row, col, color, id) {
  this.class = 'Queen'
  this.id = this.class + '-' + id
  this.color = color
  this.pos = {
    x: col,
    y: row,
  }
  this.legalMoves = []
  this.dead = false
}
Queen.prototype = Object.create(PiecePrototype)

///////////////////////////////////////////////
//                  PAWN                     //
///////////////////////////////////////////////


Pawn.prototype.move = function(y, x) {
  this.legalMoves = []
  if (this._canMove(y, x) || this._canAttack(y, x)) {
    var temp = board.grid[this.pos.y][this.pos.x]
    board.grid[y][x] = temp
    board.grid[this.pos.y].splice(this.pos.x, 1, null)
    this.pos.y = y
    this.pos.x = x
    this.moved = true
    board.render()
    board.currentPlayer = !board.currentPlayer
    render()
    if (this.checkCheck()) {
      if (!board.currentPlayer) {
        board.blackKingPosition.isCheck = true

      } else {
        board.whiteKingPosition.isCheck = true
      }
      check()
      console.log('!!CHECK!!')
      console.log('!!CHECK!!')
      console.log('!!CHECK!!')
      console.log('!!CHECK!!')
      console.log('!!CHECK!!')
      console.log('!!CHECK!!')
      return;
    }
    board.blackKingPosition.isCheck = false
    board.whiteKingPosition.isCheck = false
  }
}

Pawn.prototype._canMove = function(y, x) {
  if (this.color === 'white') {
    if (!this.moved) {
      this.legalMoves.push([this.pos.y + 2, this.pos.x])
    }
    this.legalMoves.push([this.pos.y + 1, this.pos.x])
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === y && moveset[1] === x
    })
    if (legal) {
      return true
    }
  } else {
    if (!this.moved) {
      this.legalMoves.push([this.pos.y - 2, this.pos.x])
    }
    this.legalMoves.push([this.pos.y - 1, this.pos.x])
    var legal = this.legalMoves.some(function(moveset) {
      return moveset[0] === y && moveset[1] === x
    })
    if (legal) {
      return true
    }

    return false
  }
}

Pawn.prototype._canAttack = function(y, x) {
  var target = board.grid[y][x]
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

King.prototype._canMove = function(y, x) {
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
  }).filter((el, i) => { return board.grid[el[0]][el[1]] === null || board.grid[el[0]][el[1]].color !== that.color })
  this.legalMoves = inbound
  return this.checkLegal(y, x)
}

///////////////////////////////////////////////
//                  ROOK                     //
///////////////////////////////////////////////

Rook.prototype._canMove = function(y, x) {
  var X = this.pos.x
  var Y = this.pos.y
  for (i = this.pos.y + 1; i < board.grid.length; i++) { //MOVE DOWN
    if (board.grid[i][this.pos.x]) {
      if (this.color !== board.grid[i][this.pos.x].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([i, X])
      }
      i = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([i, X])
    }
  }
  for (j = this.pos.y - 1; j > 0; j--) { //MOVE UP
    if (board.grid[j][this.pos.x]) {
      if (this.color !== board.grid[j][this.pos.x].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([j, X])
      }
      j = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([j, X])
    }
  }
  for (k = this.pos.x + 1; k < board.grid.length; k++) { //MOVE RIGHT
    if (board.grid[this.pos.y][k]) {
      if (this.color !== board.grid[this.pos.y][k].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([Y, k])
      }
      k = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([Y, k])
    }
  }
  for (l = this.pos.x - 1; l > 0; l--) { //MOVE LEFT
    if (board.grid[this.pos.y][l]) {
      if (this.color !== board.grid[this.pos.y][l].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([Y, l])
      }
      l = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([Y, l])
    }
  }
  var caseExist = this.legalMoves.filter(function(item) {
    return (item[0] >= 0 && item[1] >= 0) && (item[0] < board.grid.length && item[1] < board.grid.length) // UGLY TRICK TO REMOVE OUT OF BOUNDS MOVES
  })
  this.legalMoves = caseExist
  return this.checkLegal(y, x)
}

///////////////////////////////////////////////
//                 KNIGHT                    //
///////////////////////////////////////////////

Knight.prototype._canMove = function(y, x) {
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
  return this.checkLegal(y, x)
}

///////////////////////////////////////////////
//                 BISHOP                    //
///////////////////////////////////////////////

Bishop.prototype._canMove = function(y, x) {
  var X = this.pos.x
  var Y = this.pos.y
  for (i = 1; i < board.grid.length; i++) { //MOVE UP LEFT
    if (board.grid[Y - i]) {
      if (board.grid[Y - i][X - i]) {
        if (this.color !== board.grid[Y - i][X - i].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y - i, X - i])
        }
        i = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y - i, X - i])
      }
    }
  }
  for (j = 1; j < board.grid.length; j++) { // MOVE DOWN RIGHT
    if (board.grid[Y + j]) {
      if (board.grid[Y + j][X + j]) {
        if (this.color !== board.grid[Y + j][X + j].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y + j, X + j])
        }
        j = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y + j, X + j])
      }
    }
  }
  for (k = 1; k < board.grid.length; k++) { //MOVE DOWN LEFT 
    if (board.grid[Y + k]) {
      if (board.grid[Y + k][X - k]) {
        if (this.color !== board.grid[Y + k][X - k].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y + k, X - k])
        }
        k = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y + k, X - k])
      }
    }
  }
  for (l = 1; l < board.grid.length; l++) { // MOVE UP RIGHT
    if (board.grid[Y - l]) {
      if (board.grid[Y - l][X + l]) {
        if (this.color !== board.grid[Y - l][X + l].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y - l, X + l])
        }
        l = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y - l, X + l])
      }
    }
  }
  var caseExist = this.legalMoves.filter(function(item) {
    return (item[0] >= 0 && item[1] >= 0) && (item[0] < board.grid.length && item[1] < board.grid.length) // UGLY TRICK TO REMOVE OUT OF BOUNDS MOVES
  })
  this.legalMoves = caseExist
  return this.checkLegal(y, x)
}

///////////////////////////////////////////////
//                  QUEEN                    //
///////////////////////////////////////////////

Queen.prototype._canMove = function(y, x) {
  //	debugger
  var X = this.pos.x
  var Y = this.pos.y
  for (i = 1; i < board.grid.length; i++) { //MOVE UP LEFT
    if (board.grid[Y - i]) {
      if (board.grid[Y - i][X - i]) {
        if (this.color !== board.grid[Y - i][X - i].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y - i, X - i])
        }
        i = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y - i, X - i])
      }
    }
  }
  for (j = 1; j < board.grid.length; j++) { // MOVE DOWN RIGHT
    if (board.grid[Y + j]) {
      if (board.grid[Y + j][X + j]) {
        if (this.color !== board.grid[Y + j][X + j].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y + j, X + j])
        }
        j = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y + j, X + j])
      }
    }
  }
  for (k = 1; k < board.grid.length; k++) { //MOVE DOWN LEFT 
    if (board.grid[Y + k]) {
      if (board.grid[Y + k][X - k]) {
        if (this.color !== board.grid[Y + k][X - k].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y - k, X + k])
        }
        k = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y - k, X + k])
      }
    }
  }
  for (l = 1; l < board.grid.length; l++) { // MOVE UP RIGHT
    if (board.grid[Y - l]) {
      if (board.grid[Y - l][X + l]) {
        if (this.color !== board.grid[Y - l][X + l].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
          this.legalMoves.push([Y + l, X - l])
        }
        l = board.grid.length // STOP LOOP ON BLOCKER
      } else {
        this.legalMoves.push([Y + l, X - l])
      }
    }
  }
  for (i = this.pos.y + 1; i < board.grid.length; i++) { //MOVE DOWN
    if (board.grid[i][this.pos.x]) {
      if (this.color !== board.grid[i][this.pos.x].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([i, X])
      }
      i = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([i, X])
    }
  }
  for (j = this.pos.y - 1; j > 0; j--) { //MOVE UP
    if (board.grid[j][this.pos.x]) {
      if (this.color !== board.grid[j][this.pos.x].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([j, X])
      }
      j = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([j, X])
    }
  }
  for (k = this.pos.x + 1; k < board.grid.length; k++) { //MOVE RIGHT
    if (board.grid[this.pos.y][k]) {
      if (this.color !== board.grid[this.pos.y][k].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([Y, k])
      }
      k = board.grid.length // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([Y, k])
    }
  }
  for (l = this.pos.x - 1; l > 0; l--) { //MOVE LEFT
    if (board.grid[this.pos.y][l]) {
      if (this.color !== board.grid[this.pos.y][l].color) { //MAKE BLOCKER POSITION LEGAL IF ENEMY
        this.legalMoves.push([Y, l])
      }
      l = 0 // STOP LOOP ON BLOCKER
    } else {
      this.legalMoves.push([Y, l])
    }
  }
  var caseExist = this.legalMoves.filter(function(item) {
    return (item[0] >= 0 && item[1] >= 0) && (item[0] < board.grid.length && item[1] < board.grid.length) // UGLY TRICK TO REMOVE OUT OF BOUNDS MOVES
  })
  this.legalMoves = caseExist
  return this.checkLegal(y, x)
}