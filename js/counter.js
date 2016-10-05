var PLAYER;

function startGame() {
  PLAYER = new Player()
  PLAYER.load()
  updateUI()
}


class Player {
  constructor() {
    this.points = 0
    this.teenagers = 0
    this.kettles = 0
    this.theaters = 0
  }

  load() {
    const playerJSON = Cookies.get('player');

    if (typeof playerJSON === 'undefined') {
      // PLAYER = newPlayer()
    } else {
      const playerState = JSON.parse(playerJSON)
      this.points = playerState.points
      this.teenagers = playerState.teenagers
      this.kettles = playerState.kettles
      this.theaters = playerState.theaters
    }
  }

  save() {
    Cookies.set("player", this)
  }
  reset() {
    Cookies.remove("player")
  }
  clearStats() {
    this.points = 0
    this.teenagers = 0
    this.kettles = 0
    this.theaters = 0
  }
}
function clearState() {
  PLAYER.reset()
  PLAYER.clearStats()
  updateUI()
}

function earnPoints() {
  PLAYER.points += 1
  updateComponents(['points'])
  PLAYER.save()
}

function buyTeenagers(num) {
  teenagerIncrease = () => {
    if (PLAYER.points >= 20){
      PLAYER.teenagers += num
      PLAYER.points -= 20
      updateComponents(['points', 'teenagers'])

      PLAYER.save()
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

      PLAYER.save()
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

      PLAYER.save()
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
  $('#reset').click(clearState)
})
