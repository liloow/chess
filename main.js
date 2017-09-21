var stateSelected = false
var board = new Board()


$(document).ready(function() {

  var initX
  var initY

  board.render()



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
      console.log( board.grid[initY][initX])
      console.log('target = ' + targetX + ',' + targetY)
      board.grid[initY][initX].move(targetX, targetY)
            stateSelected = !stateSelected
            console.log(stateSelected)

    }
  })

})
/*


  function render() {
    $('.row').each(function(row, rowEl) {
      $(rowEl)
        .find('.cell')
        .each(function(column, cellEl) {
          var color = board.grid[row][column];
        });
    })
  }
})

*/