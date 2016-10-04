var PLAYER = {
  points: 0
}

function earnPoints() {
  PLAYER.points += 1
}

$(document).ready(function() {
  $('#popcornkernel').click(earnPoints);
})
