

var direction = 1;



var aliens = [
  4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
  24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55
]; 

var grille = document.querySelector('.grille');

var score = document.querySelector(".results");

var incr = 0;
for (i = 0; i < 240; i++) {
  var carre = document.createElement("div");

  if (incr == 0) {
    carre.classList.add('left');
  }

  if (incr == 19) {
    carre.classList.add('right');
  }
  grille.appendChild(carre);

  incr++;
  if (incr == 20)
    incr = 0;
}

let allDiv = document.querySelectorAll('.grille div');

aliens.forEach(invader => {
  allDiv[invader].classList.add('alien');
})


let fromLeft  = true;
let fromRight = true;

function moveInvaders() {


for(i = 0; i<aliens.length; i++){

  if( allDiv[aliens[i]].classList.contains('right')){
      if( fromLeft == true){
        direction = 20;
        fromLeft = false;
      }else{
        direction = -1;
        fromLeft = true;
      }
  }


  if( allDiv[aliens[i]].classList.contains('left')){
    if( fromRight == true){
      direction = 20;
      fromRight = false;
    }else{
      direction = +1;
      fromRight = true;
    }
}



}



  for (i = 0; i < aliens.length; i++) {
    allDiv[aliens[i]].classList.remove('alien');
  }


  for (i = 0; i < aliens.length; i++) {
    aliens[i] += direction;
  }

  for (i = 0; i < aliens.length; i++) {
    allDiv[aliens[i]].classList.add('alien');
  }

  if (incr == 20)
    carre.classList.add('right');

}


setInterval(moveInvaders, 400);


var vaisseau = document.querySelector('.vaisseau');
var initial_vaisseau_coord =vaisseau.getBoundingClientRect();
var vaisseau_coord = initial_vaisseau_coord;
var vaisseau_common = 
    document.querySelector('.vaisseau').getBoundingClientRect();


bad = []
var element = { name: "bad", image: "images/ennemies.png" }

function gamestart(){
    tab = [ligne1, ligne2, ligne3];
        for (let i in tab) {
            for (let j = 0; j < 12; j++) {
                tab[i].innerHTML += `
                <div class="grille"> <img src="images/ennemies.png"> </div> `;
            }
        }
}

gamestart();

document.addEventListener('keydown', (e) => {
    if (e.key == 'ArrowLeft') {

        // Pour ne pas que ça bouge la fenêtre avec
        e.preventDefault();

        // Permet d'aller à gauche
        vaisseau.style.left = (Math.max(
            board_coord.left,
            vaisseau_coord.left - window.innerHeight * 0.02
        )) + 'px';
        

        // Change les coordonnées du vaisseau vu que l'on vient de le bouger
        vaisseau_coord = vaisseau.getBoundingClientRect();
    }
    if (e.key == 'ArrowRight') {

        // Pour ne pas que ça bouge la fenêtre avec
        e.preventDefault();

        // Permet d'aller à droite
        vaisseau.style.left =
        (Math.min(
            board_coord.right - vaisseau_common.height,
            vaisseau_coord.left + window.innerHeight * 0.02
        )) + 'px';

        // Change les coordonnées du vaisseau vu que l'on vient de le bouger
        vaisseau_coord = vaisseau.getBoundingClientRect();
    }
    if (e.key == 'ArrowUp') {
        if (vaisseau_coord.y>534.2){
            // Pour ne pas que ça bouge la fenêtre avec
            e.preventDefault();

            // Permet d'aller à gauche
            vaisseau.style.top = (Math.max(
                board_coord.top,
                vaisseau_coord.top - window.innerHeight * 0.02
            )) + 'px';
            

            // Change les coordonnées du vaisseau vu que l'on vient de le bouger
            vaisseau_coord = vaisseau.getBoundingClientRect();
        }
    }
    if (e.key == 'ArrowDown') {
        // Pour ne pas que ça bouge la fenêtre avec
        e.preventDefault();

        // Permet d'aller à droite
        vaisseau.style.top =
        (Math.min(
            board_coord.bottom - vaisseau_common.height,
            vaisseau_coord.top + window.innerHeight * 0.02
        )) + 'px';

        // Change les coordonnées du vaisseau vu que l'on vient de le bouger
        vaisseau_coord = vaisseau.getBoundingClientRect();
    }
    if (e.key == ' '){
        tir = board.innerHTML += 
        `<div class="pioupiou"><img class="tir" src="images/tir.png"></div>`;
        var pioupiou = document.querySelector(".pioupiou");
        pioupiou.style.marginLeft = (vaisseau_coord.x -275 ) + "px";
        pioupiou.style.top = (vaisseau_coord.y - 20) + "px";
    } 
});