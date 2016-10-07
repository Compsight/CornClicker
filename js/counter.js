var PLAYER;

const PRICE = {
  doublePower: false,
  teenagers: 20,
  kettles: 50,
  theaters: 250,
  reset: function() {
    Cookies.remove("price")

    this.doublePower = false
    this.teenagers = 20
    this.kettles = 50
    this.theaters = 250
  },
  save: function() {
    Cookies.set("price", this)
  },
  load: function() {
    const priceJSON = Cookies.get('price')

    if (typeof priceJSON !== 'undefined') {
      const priceValues = JSON.parse(priceJSON)

      this.doublePower = priceValues.doublePower
      this.teenagers = priceValues.teenagers
      this.kettles = priceValues.kettles
      this.theaters = priceValues.theaters
    }
  }
}

function enableDoublePower() {
  const costForUpgrade = 1000

  if (!PRICE.doublePower && PLAYER.points >= costForUpgrade) {
    PLAYER.points -= costForUpgrade
    PRICE.doublePower = true
    PRICE.save()
    updateDoublePowerButton()
  }
}

const Timer = {
  reset: function() {
    clearInterval(this.id)
    $('#fatherTime').text("0 Seconds")
    this.start()
  },

  start: function() {
    var start = new Date;

    this.id = setInterval(function() {
      $('#fatherTime').text(Math.floor((new Date - start) / 1000) + " Seconds");
    }, 900);
  }
}

function raiseTeenagerPrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.teenagers *= 1.01;
  }
  PRICE.teenagers = Math.ceil(PRICE.teenagers)
  PRICE.save()
}

function raiseKettlePrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.kettles *= 1.01
  }
  PRICE.kettles = Math.ceil(PRICE.kettles)
  PRICE.save()
}

function raiseTheaterPrice(num) {
  for (var index = num; index > 0; index--){
    PRICE.theaters *= 1.01
  }
  PRICE.theaters = Math.ceil(PRICE.theaters)
  PRICE.save()
}

function raiseCornPerSecond() {
  PLAYER.cps = PLAYER.kettles + (PLAYER.theaters * 6)
}

function startGame() {
  PLAYER = new Player()
  PLAYER.load()
  PRICE.load()
  setInterval(earnPointsPerSecond, 1000)
  Timer.start()
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

function resetGame() {
  PLAYER.reset()
  PLAYER.clearStats()

  Timer.reset()
  PRICE.reset()

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

  if (PRICE.doublePower) {
    amount *= 2
  }

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
  updateDoublePowerButton()
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

function updateDoublePowerButton() {
  if (PRICE.doublePower) {
    $('#clickToDouble').attr({ disabled: "disabled" })
      .text("DOUBLE POWER ACTIVATED")
  } else {
    $('#clickToDouble').removeAttr('disabled')
      .text("DOUBLE POWER ($1000)")
  }
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
  $('#clickToDouble').click(enableDoublePower)
  $('#reset').click(resetGame)
})
