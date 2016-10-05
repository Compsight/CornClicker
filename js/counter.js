var PLAYER;

function startGame() {
  loadPlayer()
  updateAllUIs()
}

function loadPlayer() {
  const player = Cookies.get('player');

  if (typeof player === 'undefined') {
    PLAYER = newPlayer()
  } else {
    PLAYER = parsePlayer(player)
  }
}

function parsePlayer(playerJSON) {
  return JSON.parse(playerJSON)
}

function newPlayer() {
  return {
    points: 0,
    teenagers: 0,
    kettles: 0,
    theaters: 0
  }
}

function savePlayer() {
  Cookies.set("player", PLAYER)
}

function earnPoints() {
  PLAYER.points += 1
  updateUI()
  savePlayer()
}


function buyTeenagers(num) {
  teenagerIncrease = () => {
    if (PLAYER.points >= 20){
      PLAYER.teenagers += num
      updateTeenagerDorm()
      PLAYER.points -= 20
      updateUI()

      savePlayer()
    }
  }
  return teenagerIncrease
}

function buyKettles(num) {
  kettleIncrease = () => {
    if (PLAYER.points >= 50){
      PLAYER.kettles += num
      updateKettleStorage()
      PLAYER.points -= 50
      updateUI()

      savePlayer()
    }
  }
  return kettleIncrease
}

function buyTheaters(num) {
  theaterIncrease = () => {
    if (PLAYER.points >= 250){
      PLAYER.theaters += num
      updateTheaterLocations()
      PLAYER.points -= 250
      updateUI()

      savePlayer()
    }
  }
  return theaterIncrease
}

function updateAllUIs() {
  updateUI()
  updateTeenagerDorm()
  updateKettleStorage()
  updateTheaterLocations()
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

function storePrices(){
  var TeenagerCost
}

$(document).ready(function() {
  startGame()

  $('#popcornkernel').click(earnPoints);
  $('#buyTeenagers').click(buyTeenagers(1));
  $('#buyTenTeenagers').click(buyTeenagers(10));
  $('#buyHundredTeenagers').click(buyTeenagers(100));
  $('#buyKettles').click(buyKettles(1));
  $('#buyTenKettles').click(buyKettles(10));
  $('#buyHundredKettles').click(buyKettles(100));
  $('#buyTheaters').click(buyTheaters(1));
  $('#buyTenTheaters').click(buyTheaters(10));
  $('#buyHundredTheaters').click(buyTheaters(100));
})
