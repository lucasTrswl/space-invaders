var ligne1 = document.querySelector(".ligne1");
var ligne2 = document.querySelector(".ligne2");
var ligne3 = document.querySelector(".ligne3"); 

var alien = [
    0,1,2,3,4,5,6,7,8,9,10,11,12,
    21,22,23,24,25,26,27,28,29,30,31,32,
    41,42,43,44,45,46,47,48,49,50,51,52

]

var incr = 0;

for(i = 0; i < 53; i++){
    const square = document.createElement('div');
    grid.appenChild(square);
}


console.log(square);
var board = document.querySelector('.board');
var board_coord = board.getBoundingClientRect();

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