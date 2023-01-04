const grille = document.getElementById('grille');
const score = document.getElementById('score');

// creation des divs
for(let i = 0; i < 255; i++){
    let cadre = document.createElement('div');
    grille.appendChild(cadre);
}
// cadres des divs
const cadres = document.querySelectorAll('#grille div');
// position des aliens dans le cadres
const alien = [
    1,2,3,4,5,6,7,8,9,
    16,17,18,19,20,21,22,23,24,
    31,32,33,34,35,36,37,38,39
];

//positon du tireur dans la cadre
let postionTireur = 232;
cadres[postionTireur].classList.add('tireur');
//postion des aliens dans la cadre
alien.forEach(alien => cadres[alien].classList.add('alien'));


