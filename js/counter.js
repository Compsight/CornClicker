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
}

function raiseKettlePrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.kettles *= 1.01
  }
}

function raiseTheaterPrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.theaters *= 1.01
  }
}
const PPS = {
  teenagers: 0,
  kettles: 0,
  theaters: 0
}

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

function earnPointsFromClick() {
  PLAYER.points += (1 + PLAYER.teenagers*2)
  updatePlayerComponents(['points'])
  PLAYER.save()
//When there are no teenagers, one click = one point.
//When there is one teenager, one click = three points.
//When there are five teenagers, one click = five points.
//For each teenager, points per click increases by two.
//Everytime you click, you get one base point plus number of teenagers * 2.

}



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
    $('#' + compName).text(Math.round(PLAYER[compName]))
  })
}

function updatePriceComponents(compNames) {
  compNames.forEach((compName) => {
    $('#' + compName + 'Price').text(Math.round(PRICE[compName]))
  })
}

var start = new Date;

setInterval(function() {
    $('#fatherTime').text((new Date - start) + " Miliseconds");
}, 1);


$(document).ready(function() {
  startGame()

  $('#popcornkernel').click(earnPointsFromClick);
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
