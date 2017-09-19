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
  this.grid[0].splice(1, 1, new Knight(0, 1, 'white'))
  this.grid[4].splice(1, 1, new Knight(4, 1, 'black'))
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

function Knight(row, col, color) { // can only move forward : 1 case (TO DO: 2 case if firstmove)
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


///////////////////////////////////////////////
//                 KNIGHT                    //
///////////////////////////////////////////////

Knight.prototype._canMove = function(x, y) {
  var that = this
//  debugger
  for(i=(this.pos.y-2);i<=(this.pos.y+2);i+=4) {
    this.legalMoves.push([i,this.pos.x+1])
    this.legalMoves.push([i,this.pos.x-1])
  }
    for(j=(this.pos.x-2);j<=(this.pos.x+2);j+=4) {
    this.legalMoves.push([this.pos.y+1,j])
    this.legalMoves.push([this.pos.y-1,j])
  }
  var caseExist = this.legalMoves.filter(function (item) {
    return item[0] >= 0 && item[1] >= 0
  }).filter(function(item) {
    if (!board.grid[item[0]][item[1]]) return true
    return that.color !== board.grid[item[0]][item[1]].color
  })
  this.legalMoves = caseExist
  console.log(this.legalMoves)
  return this.checkLegal(x,y)
}


///////////////////////////////////////////////
//                 BISHOP                    //
///////////////////////////////////////////////


///////////////////////////////////////////////
//                  QUEEN                    //
///////////////////////////////////////////////




var board = new Board()

board.render()