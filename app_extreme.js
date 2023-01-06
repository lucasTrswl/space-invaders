// On crée une grille et un élément pour afficher les résultats
const grid = document.querySelector('.grid')
const resultsDisplay = document.querySelector('.results')

// On initialise certaines variables utilisées plus tard dans le code
let currentShooterIndex = 202 // L'index de la case actuelle du tireur (l'espace)
let width = 15 // La largeur de la grille
let direction = 1 // La direction de déplacement des envahisseurs (1 = droite, -1 = gauche)
let invadersId // L'ID de l'intervalle de mouvement des envahisseurs
let goingRight = true // Si les envahisseurs se déplacent vers la droite ou non
let aliensRemoved = [] // Les index des envahisseurs qui ont été enlevés
let results = 0 // Le score du joueur

// On crée 225 cases vides dans la grille
for (let i = 0; i < 225; i++) {
  const square = document.createElement('div')
  grid.appendChild(square)
}

// On récupère toutes les cases de la grille
const squares = document.querySelectorAll('.grid div')

// On initialise un compteur temporaire à 0
temp = 0

// On crée un tableau d'index des envahisseurs
let alienInvaders =[]

// On parcourt les index de 0 à 46 (il y a 46 envahisseurs)
for (let i = 0; i < 74; i++) {
  // Si l'index est inférieur ou égal à 1, on passe au suivant
  if (i<=1){
    continue
  }
  // Sinon, si l'index est supérieur ou égal à 2, on ajoute l'index au tableau d'envahisseurs et on incrémente le compteur temporaire
  else if (i >=2){
    alienInvaders.push(i)
    temp++

    // Si le compteur temporaire atteint 12, on ajoute 3 à l'index et on réinitialise le compteur à 0
    if (temp === 12){
      i+=3
      temp = 0

    }
  }
}

// On affiche le tableau d'envahisseurs dans la console
console.log(alienInvaders)

// On définit une fonction qui ajoute la classe 'invader' à tous les envahisseurs
function draw() {
  for (let i = 0; i < alienInvaders.length; i++) {
    // Si l'envahisseur n'a pas été enlevé, on lui ajoute la classe 'invader'
    if(!aliensRemoved.includes(i)) {
      squares[alienInvaders[i]].classList.add('invader')
    }
  }
}

// On affiche les envahisseurs sur la grille
draw()


// Enlève la classe 'invader' de tous les envahisseurs
function remove() {
    for (let i = 0; i < alienInvaders.length; i++) {
      squares[alienInvaders[i]].classList.remove('invader')
    }
  }
  
// Ajoute la classe 'shooter' (tireur) à la case actuelle de l'espace
squares[currentShooterIndex].classList.add('shooter')

// Déplace le vaisseau en fonction de la touche pressée par le joueur
function moveShooter(e) {
  squares[currentShooterIndex].classList.remove('shooter')
  switch(e.key) {
    case 'ArrowLeft': // Si la flèche gauche est pressée
        e.preventDefault() // Permet de ne pas bouger la fenêtre
        // Si l'index de la case actuelle du vaisseau n'est pas un multiple de la largeur de la grille, on déplace le vaisseau vers la gauche
        if (currentShooterIndex % width !== 0) currentShooterIndex -=1
        break
    case 'ArrowRight' : // Si la flèche droite est pressée
        e.preventDefault() 
        // Si l'index de la case actuelle du vaisseau n'est pas un multiple de la largeur de la grille - 1, on déplace le vaisseau vers la droite
        if (currentShooterIndex % width < width -1) currentShooterIndex +=1
        break
    case 'ArrowUp': // Si la flèche du haut est pressée
        e.preventDefault()
        // Si la différence de l'index de la case actuelle du vaisseau et de la largeur de la grille est supèrieure ou égale à 165 on déplace le vaisseau vers le haut
        if (currentShooterIndex - width >= 165) currentShooterIndex -= width
        break
    case 'ArrowDown': // Si la flèche du bas est pressée
        e.preventDefault()
        // Si la différence de l'index de la case actuelle du vaisseau et de la largeur de la grille est infèrieure à 195 on déplace le vaisseau vers le bas
        if (currentShooterIndex - width < 195) currentShooterIndex += width
        break
  }
  squares[currentShooterIndex].classList.add('shooter')
}

// On écoute les événements 'keydown' (touche pressée) sur le document
document.addEventListener('keydown', moveShooter)

// Déplace les envahisseurs
function moveInvaders() {
    // Vérifie si l'envahisseur le plus à gauche se trouve sur le bord gauche de la grille
    const leftEdge = alienInvaders[0] % width === 0

    // Vérifie si l'envahisseur le plus à droite se trouve sur le bord droit de la grille
    const rightEdge = alienInvaders[alienInvaders.length - 1] % width === width -1
  
    // Enlève la classe 'invader' de tous les envahisseurs
    remove()
  
    // Si l'envahisseur le plus à droite se trouve sur le bord droit de la grille et qu'ils se déplacent vers la droite
    if (rightEdge && goingRight) {
      // Pour chaque envahisseur
      for (let i = 0; i < alienInvaders.length; i++) {

        // On ajoute la largeur de la grille + 1 à l'index de l'envahisseur
        alienInvaders[i] += width +1

        // On change la direction de déplacement des envahisseurs
        direction = -1

        // On indique qu'ils ne se déplacent plus vers la droite
        goingRight = false
      }
    }

 // Si l'envahisseur le plus à gauche se trouve sur le bord gauche de la grille et qu'ils ne se déplacent pas vers la droite
if(leftEdge && !goingRight) {
    // Pour chaque envahisseur
    for (let i = 0; i < alienInvaders.length; i++) {
      // On ajoute la largeur de la grille - 1 à l'index de l'envahisseur
      alienInvaders[i] += width -1
      // On change la direction de déplacement des envahisseurs
      direction = 1
      // On indique qu'ils se déplacent maintenant vers la droite
      goingRight = true
    }
  }
  
  // Pour chaque envahisseur
  for (let i = 0; i < alienInvaders.length; i++) {
    // On ajoute la direction de déplacement à l'index de l'envahisseur
    alienInvaders[i] += direction
  }
  
  // Dessine les envahisseurs
  draw()
  
// Si l'envahisseur et le tireur se trouvent à la même position
if (squares[currentShooterIndex].classList.contains('invader', 'shooter')) {
    // Affiche 'GAME OVER' et arrête le déplacement des envahisseurs
    resultsDisplay.innerHTML = 'GAME OVER'
    clearInterval(invadersId)
    let reset = document.querySelector('.reset-button')
    reset.style.visibility = "visible"
    squares[currentShooterIndex].classList.remove('shooter')
    // Ajoute la classe 'boom' à la div correspondant à l'index 'currentLaserIndex'
    squares[currentShooterIndex].classList.add('boom')

    var explosion = document.getElementById('explosion') // on récupère l'audio pour l'explosion des vaisseau
    explosion.play() // On joue l'audio

    // Attend 100ms avant de retirer la classe 'boom' de la div correspondant à l'index 'currentLaserIndex'
    setTimeout(()=> squares[currentShooterIndex].classList.remove('boom'), 100)
  }
  
  // Pour chaque envahisseur
  for (let i = 0; i < alienInvaders.length; i++) {
    // Si l'index de l'envahisseur dépasse la longueur de la grille
    if(alienInvaders[i] > (squares.length)) {
      // Affiche 'GAME OVER' et arrête le déplacement des envahisseurs
      resultsDisplay.innerHTML = 'GAME OVER'
      clearInterval(invadersId)
      let reset = document.querySelector('.reset-button')
      reset.style.visibility = "visible"
      squares[currentShooterIndex].classList.remove('shooter')
      // Ajoute la classe 'boom' à la div correspondant à l'index 'currentLaserIndex'
      squares[currentShooterIndex].classList.add('boom')

      var explosion = document.getElementById('explosion') // on récupère l'audio pour l'explosion des vaisseau
      explosion.play() // On joue l'audio

      // Attend 100ms avant de retirer la classe 'boom' de la div correspondant à l'index 'currentLaserIndex'
      setTimeout(()=> squares[currentShooterIndex].classList.remove('boom'), 100)
    }
  }
  
  // Si tous les envahisseurs ont été enlevés
  if (aliensRemoved.length === alienInvaders.length) {
    // Affiche 'YOU WIN' et arrête le déplacement des envahisseurs
    resultsDisplay.innerHTML = 'YOU WIN'
    clearInterval(invadersId)
    let reset = document.querySelector('.reset-button')
    reset.style.visibility = "visible"
  }  
}

// Démarre l'intervalle de déplacement des envahisseurs toutes les 500ms
invadersId = setInterval(moveInvaders, 300)

// Définit la fonction 'shoot' qui prend en argument un événement 'e'
function shoot(e) {
    // Déclare une variable 'laserId'
    let laserId

    // Déclare une variable 'currentLaserIndex' qui vaut l'index du tireur
    let currentLaserIndex = currentShooterIndex

    // Définit la fonction 'moveLaser'
    function moveLaser() {

      // Enlève la classe 'laser' de la div correspondant à l'index 'currentLaserIndex'
      squares[currentLaserIndex].classList.remove('laser')

      // Décrémente 'currentLaserIndex' de la largeur de la grille
      currentLaserIndex -= width

      // Ajoute la classe 'laser' à la div correspondant à l'index 'currentLaserIndex'
      squares[currentLaserIndex].classList.add('laser')
  
      // Si la div correspondant à l'index 'currentLaserIndex' contient la classe 'invader'
      if (squares[currentLaserIndex].classList.contains('invader')) {

        // Enlève les classes 'laser' et 'invader' de la div correspondant à l'index 'currentLaserIndex'
        squares[currentLaserIndex].classList.remove('laser')
        squares[currentLaserIndex].classList.remove('invader')

        // Ajoute la classe 'boom' à la div correspondant à l'index 'currentLaserIndex'
        squares[currentLaserIndex].classList.add('boom')

        var explosion = document.getElementById('explosion') // on récupère l'audio pour l'explosion des vaisseau
        explosion.play() // On joue l'audio
  
      // Attend 100ms avant de retirer la classe 'boom' de la div correspondant à l'index 'currentLaserIndex'
      setTimeout(()=> squares[currentLaserIndex].classList.remove('boom'), 100)

      // Arrête l'intervalle 'laserId'
      clearInterval(laserId)
  
      // Déclare une variable 'alienRemoved' qui vaut l'index de l'envahisseur dans le tableau 'alienInvaders'
      const alienRemoved = alienInvaders.indexOf(currentLaserIndex)

      // Ajoute l'envahisseur à la liste des envahisseurs retirés
      aliensRemoved.push(alienRemoved)

      // Incrémente les résultats de 1
      results+=100

      // Affiche les résultats dans le div avec la classe 'results'
      resultsDisplay.innerHTML = results

      // Affiche les envahisseurs retirés dans la console
      console.log(aliensRemoved)
      }
  
    }

  // Si l'événement 'e' est la touche d'espacement (' ')
    switch(e.key) {
        case ' ':
        // Définit une variable 'laserId' qui vaut l'intervalle qui exécute la fonction 'moveLaser' toutes les 50ms
        laserId = setInterval(moveLaser, 50)

        var laser = document.getElementById('laser') // on récupère l'audio pour le laser du vaisseau
        laser.play() // On joue l'audio
    }
  }

  // Ajoute un écouteur d'événement 'keydown' qui exécute la fonction 'shoot'
  document.addEventListener('keydown', shoot)