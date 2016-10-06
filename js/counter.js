var PLAYER;

const PRICE = {
  teenagers: 20,
  kettles: 50,
  theaters: 250
}

function raiseTeenagerPrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.teenagers *= 1.01;
  }
  PRICE.teenagers = Math.ceil(PRICE.teenagers)
}

function raiseKettlePrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.kettles *= 1.01
  }
  PRICE.kettles = Math.ceil(PRICE.kettles)
}

function raiseTheaterPrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.theaters *= 1.01
  }
  PRICE.theaters = Math.ceil(PRICE.theaters)
}

const PPS = {
  teenagers: 0,
  kettles: 0,
  theaters: 0
}

function startGame() {
  PLAYER = new Player()
  PLAYER.load()
  setInterval(earnPointsPerSecond, 1000);
  updateUI()
}

const STARTING_POINTS = 0

class Player {
  constructor() {
    this.points = STARTING_POINTS
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
    this.points = STARTING_POINTS
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
  updatePlayerComponents(['points'])
  PLAYER.save()
}

function earnPointsPerSecond() {
  PLAYER.points += PLAYER.kettles
  updatePlayerComponents(['points'])
  PLAYER.save()
}
//every second elapses your current PPS are added to PLAYER.points
//number of points per second you earn == number of kettles owned
//update new PPS total


function buyTeenagers(num) {
  teenagerIncrease = () => {
    const cost = PRICE.teenagers * num

    if (PLAYER.points >= cost){
      PLAYER.teenagers += num
      PLAYER.points -= cost
      raiseTeenagerPrice(num)

      updatePriceComponents(['teenagers'])
      updatePlayerComponents(['points', 'teenagers'])
      PLAYER.save()
    }
  }
  return teenagerIncrease
}

function buyKettles(num) {
  kettleIncrease = () => {
    const cost = PRICE.kettles * num

    if (PLAYER.points >= cost){
      PLAYER.kettles += num
      PLAYER.points -= cost

      raiseKettlePrice(num)
      updatePriceComponents(['kettles'])
      updatePlayerComponents(['points', 'kettles'])

      PLAYER.save()
    }
  }
  return kettleIncrease
}

function buyTheaters(num) {
  theaterIncrease = () => {
    const cost = PRICE.theaters * num

    if (PLAYER.points >= 250 * num){
      PLAYER.theaters += num
      PLAYER.points -= cost

      raiseTheaterPrice(num)
      updatePriceComponents(['theaters'])
      updatePlayerComponents(['points', 'theaters'])

      PLAYER.save()
    }
  }
  return theaterIncrease
}

function updateUI() {
  updatePlayerComponents(['points', 'teenagers', 'kettles', 'theaters'])
  updatePriceComponents(['teenagers', 'kettles', 'theaters'])
}

function updatePlayerComponents(compNames) {
  compNames.forEach((compName) => {
    $('#' + compName).text(PLAYER[compName])
  })
}

function updatePriceComponents(compNames) {
  compNames.forEach((compName) => {
    $('#' + compName + 'Price').text(PRICE[compName])
  })
}

var start = new Date;

setInterval(function() {
    $('#fatherTime').text((new Date - start) + " Miliseconds");
}, 1);


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
