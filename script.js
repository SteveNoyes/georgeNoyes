console.log("Hello, George");
console.log("These are pre-written lines that run when you open this site.")
console.log("You can leave a message on the main screen and I will be able to see it and respond.")

function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = checkTime(m);
  s = checkTime(s);
  document.getElementById('timeStamp').innerHTML =
  h + ":" + m + ":" + s;
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}


$(document).ready(function() {

  var url = "https://fcc-weather-api.glitch.me/api/current?lat=35&lon=139";
  $.getJSON(url, function(data) {
    document.getElementById('weatherStamp').innerHTML = "weather data:" + data;
    console.log("weather data:", data)
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      document.getElementById('positionStamp').innerHTML = 'position data:' + position;
      console.log('position data:', position)
    });
  }

});

document.addEventListener('DOMContentLoaded', () => {
  const squares = document.querySelectorAll('.grid div')
  const resultDisplay = document.querySelector('#result')
  let width = 15
  let currentShooterIndex = 202
  let currentInvaderIndex = 0
  let alienInvadersTakenDown = []
  let result = 0
  let direction = 1
  let invaderId

  //define the alien invaders
  const alienInvaders = [
      0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
      15,16,17,18,19,20,21,22,23,24,
      30,31,32,33,34,35,36,37,38,39
    ]

  //draw the alien invaders
  alienInvaders.forEach( invader => squares[currentInvaderIndex + invader].classList.add('invader'))

  //draw the shooter
  squares[currentShooterIndex].classList.add('shooter')

  //move the shooter along a line
  function moveShooter(e) {
    squares[currentShooterIndex].classList.remove('shooter')
    switch(e.keyCode) {
      case 37:
        if(currentShooterIndex % width !== 0) currentShooterIndex -= 1
        break
      case 39:
        if(currentShooterIndex % width < width - 1) currentShooterIndex += 1
        break
    }
    squares[currentShooterIndex].classList.add('shooter')
  }
  document.addEventListener('keydown', moveShooter)

  //move the alien invaders
  function moveInvaders() {
    const leftEdge = alienInvaders[0] % width === 0
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width - 1

      if((leftEdge && direction === -1) || (rightEdge && direction === 1)){
        direction = width
      } else if (direction === width) {
      if (leftEdge) direction = 1
      else direction = -1
      }
      for (let i = 0; i <= alienInvaders.length - 1; i++) {
        squares[alienInvaders[i]].classList.remove('invader')
      }
      for (let i = 0; i <= alienInvaders.length - 1; i++) {
        alienInvaders[i] += direction
      }
      for (let i = 0; i <= alienInvaders.length - 1; i++) {
      //ADD IF LATER
        if (!alienInvadersTakenDown.includes(i)){
          squares[alienInvaders[i]].classList.add('invader')
        }
      }

    if(squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
      resultDisplay.textContent = 'Fin'
      squares[currentShooterIndex].classList.add('boom')
      clearInterval(invaderId)
    }

    for (let i = 0; i <= alienInvaders.length - 1; i++){
      if(alienInvaders[i] > (squares.length - (width -1))){
        resultDisplay.textContent = 'Fin'
        clearInterval(invaderId)
      }
    }

    //ADD LATER
    if(alienInvadersTakenDown.length === alienInvaders.length) {
      console.log(alienInvadersTakenDown.length)
      console.log(alienInvaders.length)
      resultDisplay.textContent = 'Gagner'
      clearInterval(invaderId)
    }
  }
  invaderId = setInterval(moveInvaders, 500)

  //shoot at aliens
  function shoot(e) {
    let laserId
    let currentLaserIndex = currentShooterIndex
    //move the laser from the shooter to the alien invader
    function moveLaser() {
      squares[currentLaserIndex].classList.remove('laser')
      currentLaserIndex -= width
      squares[currentLaserIndex].classList.add('laser')
      if(squares[currentLaserIndex].classList.contains('invader')) {
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')
        squares[currentLaserIndex].classList.add('boom')

        setTimeout(() => squares[currentLaserIndex].classList.remove('boom'), 250)
        clearInterval(laserId)

        const alienTakenDown = alienInvaders.indexOf(currentLaserIndex)
        alienInvadersTakenDown.push(alienTakenDown)
        result++
        resultDisplay.textContent = result
      }

      if(currentLaserIndex < width) {
        clearInterval(laserId)
        setTimeout(() => squares[currentLaserIndex].classList.remove('laser'), 100)
      }
    }

    switch(e.keyCode) {
      case 32:
        laserId = setInterval(moveLaser, 100)
        break
    }
  }

  document.addEventListener('keyup', shoot)
})

console.log("Do I have your attention, Mr. Noyes?");
