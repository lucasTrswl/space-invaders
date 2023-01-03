var ligne1 = document.querySelector(".ligne1");
var ligne2 = document.querySelector(".ligne2");
var ligne3 = document.querySelector(".ligne3");

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

        // Permet de monter le paddle 2
        vaisseau.style.left = (Math.max(
            board_coord.left,
            vaisseau_coord.left - window.innerHeight * 0.1
        )+50) + 'px';
        

        // Change les coordonnées du paddle vu que l'on vient de le bouger
        vaisseau_coord = vaisseau.getBoundingClientRect();
    }
    if (e.key == 'ArrowRight') {

        // Pour ne pas que ça bouge la fenêtre avec
        e.preventDefault();
        // Permet de descendre le paddle 2

        vaisseau.style.left =
        (Math.min(
            board_coord.right - vaisseau_common.height,
            vaisseau_coord.left + window.innerHeight * 0.1
        )-50) + 'px';

        // Change les coordonnées du paddle vu que l'on vient de le bouger
        vaisseau_coord = vaisseau.getBoundingClientRect();
    }
    if (e.key == 'b') {
        
    }
});

