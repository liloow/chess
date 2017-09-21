var stateSelected = false
var board = new Board()


$(document).ready(function() {

  var initX
  var initY

  board.render()
  render()




  $('.row .square').click(function() {

    if (!stateSelected) {
      initY = $(this).parent().index()
      initX = $(this).index() % 8
      console.log(initX + "," + initY)
      console.log(board.grid[initY][initX])
      stateSelected = !stateSelected
      console.log(stateSelected)
    } else {
      var targetY = $(this).parent().index()
      var targetX = $(this).index() % 8

      console.log(initX + ',' + initY)
      console.log(board.grid[initY][initX])
      console.log('target = ' + targetY + ',' + targetX)
      board.grid[initY][initX].move(targetY, targetX)
      stateSelected = !stateSelected
      console.log(stateSelected)

    }
  })
})
  function render() {
	board.grid.forEach((row,j)=>{
		row.forEach((piece,i)=>{
			var x = j*5+"vw"
			var y = i*5+"vw"
			if(piece) {
			$('#'+ piece.id).css('top', x)
			$('#'+ piece.id).css('left', y)
		}
		})
	})    
}


