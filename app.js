var ligne1 = document.querySelector(".ligne1");
var ligne2 = document.querySelector(".ligne2");
var ligne3 = document.querySelector(".ligne3");


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

