var PLAYER = {
  points: 0
}

function earnPoints() {
  PLAYER.points += 1
  updateUI()
}

function updateUI() {
  $('#points').text(PLAYER.points)
}

$(document).ready(function() {
  $('#popcornkernel').click(earnPoints);
})
