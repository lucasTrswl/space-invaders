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


