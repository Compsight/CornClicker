var PLAYER = {
  points: 0,
  teenagers: 0,
  kettles: 0,
  theaters: 0
}

function earnPoints() {
  PLAYER.points += 1
  updateUI()
}

function buyTeenagers(num) {
  teenagerIncrease = () => {
    PLAYER.teenagers += num
    updateTeenagerDorm()
  }
  return teenagerIncrease
}

function buyKettles(num) {
  kettleIncrease = () => {
    PLAYER.kettles += num
    updateKettleStorage()
  }
  return kettleIncrease
}

function buyTheaters(num) {
  theaterIncrease = () => {
    PLAYER.theaters += num
    updateTheaterLocations()
  }
  return theaterIncrease
}


function updateUI() {
  $('#points').text(PLAYER.points)
}

function updateTeenagerDorm() {
 $('#teenagers').text(PLAYER.teenagers)
}

function updateKettleStorage() {
$('#kettles').text(PLAYER.kettles)
}

function updateTheaterLocations() {
 $('#theaters').text(PLAYER.theaters)
}


$(document).ready(function() {
  $('#popcornkernel').click(earnPoints);
})


$(document).ready(function() {
  $('#buyTeenagers').click(buyTeenagers(1));
})

$(document).ready(function() {
  $('#buyTenTeenagers').click(buyTeenagers(10));
})

$(document).ready(function() {
  $('#buyHundredTeenagers').click(buyTeenagers(100));
})


$(document).ready(function() {
  $('#buyKettles').click(buyKettles(1));
})

$(document).ready(function() {
  $('#buyTenKettles').click(buyKettles(10));
})

$(document).ready(function() {
  $('#buyHundredKettles').click(buyKettles(100));
})


$(document).ready(function() {
  $('#buyTheaters').click(buyTheaters(1));
})

$(document).ready(function() {
  $('#buyTenTheaters').click(buyTheaters(10));
})

$(document).ready(function() {
  $('#buyHundredTheaters').click(buyTheaters(100));
})

