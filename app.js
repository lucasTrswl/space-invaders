<<<<<<< Updated upstream
const grille = document.querySelector('.grille');
const score = document.getElementById('score');

//positon du tireur dans la cadre
let postionTireur = 202;
let width = 15;
let direction = 1;
let allerDroite = true;
let alienId;

// creation des divs
for(let i = 0; i < 225; i++){
    const cadre = document.createElement('div');
    grille.appendChild(cadre);
}

// cadres des divs
const cadres = Array.from(document.querySelectorAll('.grille div'));

// position des aliens dans le cadres
const alien = [
    0,1,2,3,4,5,6,7,8,9,
    15,16,17,18,19,20,21,22,23,24,
    30,31,32,33,34,35,36,37,38,39
];


function ici(){
    for(let i = 0; i < alien.length; i++){
        cadres[alien[i]].classList.add('alien');
    }
}
ici();

function remove(){
    for(let i = 0; i < alien.length; i++){
        cadres[alien[i]].classList.remove('alien');
    }
}

cadres[postionTireur].classList.add('tireur');

function tireurBouge(e) {
    cadres[postionTireur].classList.remove('tireur')
    switch(e.key) {
      case 'ArrowLeft':
        if (postionTireur % width !== 0) postionTireur -=1
        break
      case 'ArrowRight' :
        if (postionTireur % width < width -1) postionTireur +=1
        break
    }
    squares[postionTireur].classList.add('tireur')
  }
  document.addEventListener('keydown', tireurBouge)
  

function alienBouge(){
    const alienGauche = alienInvaders[0] % width === 0
    const alienDroite = alein[alien.length - 1] % width === width -1
    remove()

    for (let i = 0; i < alien.length; i++){
        alien[i] += 1
    }

    ici()

}

alienId = setInterval(alienBouge, 1000)

=======
const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')
let currentShooterIndex = 202
let width = 15
let direction = 1
let invadersId
let goingRight = true
let aliensRemoved = []
let results = 0

for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

const squares = document.querySelectorAll('.grid div')
temp = 0

let alienInvaders =[]
for (let i = 0; i < 46; i++) {
    if (i<=1){
        continue
    }else if (i >=2){
        alienInvaders.push(i)
        temp++

        if (temp === 12){
            i+=3
            temp = 0

        }
    }
}

console.log(alienInvaders)

function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

draw()

function remove() {
  for (let i = 0; i < alienInvaders.length; i++) {
    squares[alienInvaders[i]].classList.remove('invader')
  }
}

squares[currentShooterIndex].classList.add('shooter')


function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft':
      if (currentShooterIndex % width !== 0) currentShooterIndex -=1
      break
    case 'ArrowRight' :
      if (currentShooterIndex % width < width -1) currentShooterIndex +=1
      break
  }
  squares[currentShooterIndex].classList.add('shooter')
}
document.addEventListener('keydown', moveShooter)

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0
  const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  remove()

  if (rightEdge && goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width +1
      direction = -1
      goingRight = false

    }
  }

  if(leftEdge && !goingRight) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width -1
      direction = 1
      goingRight = true
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction
  }

  draw()

  if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if(alienInvaders[i] > (squares.length)) {
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
    }
  }
  if (aliensRemoved.length === alienInvaders.length) {
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
  }
}
invadersId = setInterval(moveInvaders, 500)

function shoot(e) {
  let laserId
  let currentLaserIndex = currentShooterIndex
  function moveLaser() {
    squares[currentLaserIndex].classList.remove('laser')
    currentLaserIndex -= width
    squares[currentLaserIndex].classList.add('laser')

    if (squares[currentLaserIndex].classList.contains('invader')) {
      squares[currentLaserIndex].classList.remove('laser')
      squares[currentLaserIndex].classList.remove('invader')
      squares[currentLaserIndex].classList.add('boom')

      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 100)
      clearInterval(laserId)

      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)
      aliensRemoved.push(alienRemoved)
      results++
      resultsDisplay.innerHTML = results
      console.log(aliensRemoved)

    }
>>>>>>> Stashed changes

  }
  switch(e.key) {
    case ' ':
      laserId = setInterval(moveLaser, 50)
  }
}

document.addEventListener('keydown', shoot)
