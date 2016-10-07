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

function raiseTheaterPrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.theaters *= 1.01
  }
  PRICE.theaters = Math.ceil(PRICE.theaters)
}

function raiseCornPerSecond() {
  PLAYER.cps = PLAYER.kettles + (PLAYER.theaters * 6)
}

function startGame() {
  PLAYER = new Player()
  PLAYER.load()
  setInterval(earnPointsPerSecond, 1000)
  updateUI()
}

const STARTING_POINTS = 1000

class Player {
  constructor() {
    this.points = STARTING_POINTS
    this.teenagers = 0
    this.kettles = 0
    this.theaters = 0
    this.cps = 0
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
      this.cps = playerState.cps
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
    this.cps = 0
  }
}

function clearState() {
  PLAYER.reset()
  PLAYER.clearStats()
  updateUI()
}

function addPointsDiv( amount, x, y ) {
  let textElement = $('<div class="badge">')

  textElement.text( '+' + String(amount) )
  textElement.css({
    backgroundColor: 'transparent',
    position: 'absolute',
    left: x,
    top: y
  })

  $('body').append( textElement )

  window.setTimeout( function() {
    textElement.remove()
  }, 1000 )
}

function earnPointsFromClick( event ) {
  let amount = 1 + PLAYER.teenagers*2

  addPointsDiv( amount, event.clientX - 50, event.clientY + 25 )

  PLAYER.points += amount
  updatePlayerComponents(['points'])
  PLAYER.save()
}

function earnPointsPerSecond() {
  PLAYER.points += PLAYER.kettles
  PLAYER.points +=(PLAYER.theaters * 6)
  updatePlayerComponents(['points'])
  PLAYER.save()
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
      updateCPS()()
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
      updateCPS()()
      PLAYER.save()
    }
  }
  return theaterIncrease
}

function updateCPS() {
  cpsIncrease = () => {

    raiseCornPerSecond()
    updatePlayerComponents(['cps'])
    PLAYER.save()
  }
  return cpsIncrease
}

function updateUI() {
  updatePlayerComponents(['points', 'teenagers', 'kettles', 'theaters', 'cps'])
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

function animatePopcornKernel() {
  const randLeftPos = Math.round((0.5 - Math.random()) * 2000)
  const randTopPos = Math.round((0.5 - Math.random()) * 2000)

  $('#popped-kernel')
    .show()
    .animate({ left: `${randLeftPos}px`, top: `${randTopPos}px` }, 500, function() {
      $(this).css({ left: '44%', top: '37%' }).hide()
    })
}

var start = new Date;

var theTime = setInterval(function() {
    $('#fatherTime').text(Math.floor((new Date - start) / 1000) + " Seconds");
}, 1);
    if (theTime % 1000 === 0) {
      earnPointsPerSecond()
    }

$(document).ready(function() {
  startGame()
  $('#corn-kernel').click(earnPointsFromClick);
  $('#corn-kernel').click(animatePopcornKernel);
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
