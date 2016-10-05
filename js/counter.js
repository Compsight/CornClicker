var PLAYER;

function startGame() {
  loadPlayer()
  updateUI()
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
  updateComponents(['points'])
  savePlayer()
}

function buyTeenagers(num) {
  teenagerIncrease = () => {
    if (PLAYER.points >= 20){
      PLAYER.teenagers += num
      PLAYER.points -= 20
      updateComponents(['points', 'teenagers'])

      savePlayer()
    }
  }
  return teenagerIncrease
}

function buyKettles(num) {
  kettleIncrease = () => {
    if (PLAYER.points >= 50){
      PLAYER.kettles += num
      PLAYER.points -= 50
      updateComponents(['points', 'kettles'])

      savePlayer()
    }
  }
  return kettleIncrease
}

function buyTheaters(num) {
  theaterIncrease = () => {
    if (PLAYER.points >= 250){
      PLAYER.theaters += num
      PLAYER.points -= 250
      updateComponents(['points', 'theaters'])

      savePlayer()
    }
  }
  return theaterIncrease
}

function updateUI() {
  updateComponents(['points', 'teenagers', 'kettles', 'theaters'])
}

function updateComponents(compNames) {
  compNames.forEach((compName) => {
    $('#' + compName).text(PLAYER[compName])
  })
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
