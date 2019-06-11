let timerConfig = document.querySelector('#timer-minute span')
let breakConfig = document.querySelector('#break-minute span')
let secondUnit = document.getElementById('seconde-unite')
let secondDizaine = document.getElementById('seconde-dizaine')
let minuteUnit = document.getElementById('minute-unite')
let minuteDizaine = document.getElementById('minute-dizaine')
let playPause = document.getElementById('play-pause')
let reset = document.getElementById('reset')


let timer

let breakTimer

let isTimerLaunched = false

let isBreakLaunched = false

let isTimerOver = false

isBreakOver = false

isBreakStarted = false

isTimerStarted = false


let bouttons = document.querySelectorAll('.config-btn')

function secondHandler() {

  if (+secondUnit.innerHTML < 10 && +secondUnit.innerHTML > 0)

    secondUnit.innerHTML = secondUnit.innerHTML - 1
  else
    secondUnit.innerHTML = 9
}

function secondDizaineHandler() {

  if (+secondDizaine.innerHTML === 0)
    secondDizaine.innerHTML = 5
  else if (+secondDizaine.innerHTML > 0)
    secondDizaine.innerHTML = secondDizaine.innerHTML - 1
}

function minuteUnitHandler() {

  if (+minuteUnit.innerHTML === 0)
    minuteUnit.innerHTML = 9
  else if (+minuteUnit.innerHTML > 0)
    minuteUnit.innerHTML = minuteUnit.innerHTML - 1
}

function minuteDizaineHandler() {

  if (+minuteDizaine.innerHTML === 0)
    minuteDizaine.innerHTML = 5
  else if (+minuteDizaine.innerHTML > 0)
    minuteDizaine.innerHTML = minuteDizaine.innerHTML - 1
}

function startCountdown() {

  if (+minuteDizaine.innerHTML == 0 && +minuteUnit.innerHTML == 0 && +secondDizaine.innerHTML == 0 && +secondUnit.innerHTML == 1) {

    if(!isTimerOver) {
      clearInterval(timer)
      isTimerOver = true
      isTimerStarted = false
      console.log('timer over status: ',isTimerOver)
      setTimeout(breakLauncher, 3000)
    }else if(!isBreakOver) {
      clearInterval(breakTimer)
      isBreakOver = true
      isBreakStarted = false
      console.log('break over status: ',isBreakOver)
      setTimeout(timerLauncher, 3000)
    }
  }

  if (+minuteUnit.innerHTML == 0 && +secondDizaine.innerHTML == 0 && +secondUnit.innerHTML == 0) {

    minuteDizaineHandler()

  }

  if (+secondDizaine.innerHTML == 0 && +secondUnit.innerHTML == 0) {

    minuteUnitHandler()
    //console.log(minuteUnit.innerHTML)
  }

  if (+secondUnit.innerHTML == 0) {

    secondDizaineHandler()
  }

  secondHandler()

}

function timerLauncher() {

  if (!isBreakStarted) {
    timer = setInterval(startCountdown, 1000)
    isBreakStarted = true
    isBreakOver = false
    console.log('Is timer started: ', isBreakStarted)
  } else if(isBreakStarted){
    isBreakStarted = false
    clearInterval(timer)
  }

}

function breakInit() {
  console.log('breakInit')
  clearInterval(breakTimer)
  isBreakStarted = false
  isBreakLaunched = true
  isTimerLaunched = false
  isBreakOver = false
  secondUnit.innerHTML = 0
  secondDizaine.innerHTML = 0
  minuteUnit.innerHTML = breakConfig.innerHTML.length > 1 ? breakConfig.innerHTML[1] : breakConfig.innerHTML[0]
  minuteDizaine.innerHTML = breakConfig.innerHTML.length > 1 ? breakConfig.innerHTML[0] : 0
}

function breakLauncher() {
  if(!isTimerStarted) {
    breakTimer = setInterval(startCountdown, 1000)
    isTimerStarted = true
    isTimerOver = false
    console.log('Is break started: ', isBreakStarted)
    breakInit()
  }else if(isTimerStarted) {
    isTimerStarted = false
    clearInterval(breakTimer)
  }
}

function timerInit() {
  //console.log('timerInit')
  clearInterval(timer)
  isBreakStarted = false
  isBreakLaunched = false
  isTimerLaunched = false
  isBreakOver = false
  secondUnit.innerHTML = 0
  secondDizaine.innerHTML = 0
  minuteUnit.innerHTML = timerConfig.innerHTML.length > 1 ? timerConfig.innerHTML[1] : timerConfig.innerHTML[0]
  minuteDizaine.innerHTML = timerConfig.innerHTML.length > 1 ? timerConfig.innerHTML[0] : 0
}

timerInit()


bouttons.forEach(boutton => {
  boutton.addEventListener('click', function () {
    let id = boutton.getAttribute('id')

    switch (id) {
      case 'augmenter-timer':
        if (+timerConfig.innerHTML < 25)
          timerConfig.innerHTML = +timerConfig.innerHTML + 1
          timerInit()

        break;
      case 'diminuer-timer':
        if (+timerConfig.innerHTML > 1)
          timerConfig.innerHTML = +timerConfig.innerHTML - 1
          timerInit()

        break;
      case 'augmenter-break':
        if (+breakConfig.innerHTML < 25)
          breakConfig.innerHTML = +breakConfig.innerHTML + 1

        break;
      case 'diminuer-break':
        if (+breakConfig.innerHTML > 1)
          breakConfig.innerHTML = +breakConfig.innerHTML - 1

        break;
    }
  })
})

playPause.addEventListener('click', timerLauncher)

reset.addEventListener('click', timerInit)