const grille = document.getElementById('grille');
const score = document.getElementById('score');

// creation des divs
for(let i = 0; i < 255; i++){
    let cadre = document.createElement('div');
    grille.appendChild(cadre);
}
// cadres des divs
const cadres = document.querySelectorAll('#grille div');
