var stateSelected = false
var board = new Board()

function init () {
	 $('img[color="black"]').addClass('disabled')
}

$(document).ready(function() {

  var initX
  var initY
  var selected

  board.render()

  render()
init()


  $('img').click(function() {
    if (!stateSelected) {
      initY = $(this).attr("pos-y")
      initX = $(this).attr("pos-x")
      stateSelected = !stateSelected
      selected = $(this)
      $(this).addClass('selected')
      console.log(stateSelected)
    }
  })

  $('.square').click(function() {
    if (stateSelected) {
      var targetY = $(this).parent().index()
      var targetX = $(this).index() % 8
      var obliterant = board.grid[initY][initX]
      var obliterated = board.grid[targetY][targetX]
      if (obliterated) {
        if (obliterated.color !== obliterant.color)
          board.graveyard.push(obliterated)
        console.log(board.graveyard)
      }
      $(selected).removeClass('selected')
      board.grid[initY][initX].move(targetY, targetX)
      $('img').toggleClass('disabled')
      stateSelected = !stateSelected
      console.log(stateSelected)
    }
  })
})

function render() {
  board.grid.forEach((row, j) => {
    row.forEach((piece, i) => {
      var x = j * 5
      var y = i * 5
      if (piece) {
        $('#' + piece.id).css('top', x + "vw")
        $('#' + piece.id).css('left', y + "vw")
        $('#' + piece.id).attr('pos-x', y / 5)
        $('#' + piece.id).attr('pos-y', x / 5)
        $('#' + piece.id).attr('color', piece.color)
      }
    })
  })
}


