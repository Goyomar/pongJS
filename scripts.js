// systeme de round une fois touche enclenché la balle est lancé et l'utilisateur peut faire haut bas avec les fleches du clavier

// la balle commence a aller vers le joueur qui a gagner
// tracker la balle en permanence
// calculer le rebond de la balle ?
// accelerer la balle au fur et a mesure de la partie

// si balle touche joueur rebond

// systeme angle si tape au bas du joeur renvoie vers le bas et inverse 
// vitesse = x && angle = y


// le joueur gagne ou perd si la balle a franchis la zone du carré joueur
// reset la position des joueurs a la fin d'une manche et petit temps avant de relancer la balle



// faire un systeme deux joueur avec keydown/keyup et z/s ?

raquetteSize = {
    "x" : 5,
    "y" : 50
}

function startGame() {
    myGameArea.start()
    let canvas = document.querySelector("canvas")
    P1 = new component(40, (canvas.height/2)-(raquetteSize.y/2), raquetteSize.x, raquetteSize.y, "#ffffff")
    P2 = new component(canvas.width - 40, (canvas.height/2)-(raquetteSize.y/2), raquetteSize.x, raquetteSize.y, "#ffffff")
}

var myGameArea = {
    canvas : document.createElement('canvas'),

    start :function() {
        this.canvas.height = 600
        this.canvas.width = 800

        this.context = this.canvas.getContext('2d')
        this.context.fillStyle = "#2f4f4f"
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height) // set backroung color

        document.body.insertBefore(this.canvas, document.body.childNodes[0])
        this.interval = setInterval(updateGameArea, 16) // calcul le nombre FPS 100/60 == 16 100/50 FPS = 20

        window.addEventListener('keydown', function (e) { // test
            myGameArea.keys = (myGameArea.keys || []) // recupere la touch enfoncé par l'utilisateur
            myGameArea.keys[e.keyCode] = true
          })
        if (myGameArea.keys) { // sinon erreur console car non defini
            window.addEventListener('keyup', function (e) { // 
                myGameArea.keys[e.keyCode] = false
            })
        }
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.start()
    }
}

function component(x, y, width, height, color) {
    this.width = width
    this.height = height
    this.x = x
    this.y = y

    this.speedX = 0
    this.speedY = 0

    this.update = function(){ // regenere l'objet
        ctx = myGameArea.context
        ctx.fillStyle = color
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }

    this.newPos = function() { // adapte la position en fonction de la vitesse actuel 
        this.x += this.speedX
        this.y += this.speedY
      } 
}


function updateGameArea() { // rafraichi le jeu pour simuler l'avancement
    myGameArea.clear() // reset tableau
    P2.update()

    P2.speedX = 0; // Adapte la vitesse du joeur
    P2.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[38]) {P2.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[40]) {P2.speedY = 1; }
    P2.newPos(); // actualise la position de la raquette du joueur

    P1.update()
    P1.speedX = 0; // ""
    P1.speedY = 0;
    if (myGameArea.keys && myGameArea.keys[90]) {P1.speedY = -1; }
    if (myGameArea.keys && myGameArea.keys[83]) {P1.speedY = 1; }
    P1.newPos(); // ""
}

function moveup() {
    P1.speedY -= 1;
}
  function movedown() {
    P1.speedY += 1;
}



// todo list
// BALL
// limite de position pour les joueurs et la balle
// gestion si balle touche utilisateur rebon
// si balle depasse un utlisateur alors score +1 a l'autre
// gerer les scores des 2 joueurs 
// vitesse balle croissante + ya de rebond sur raquette
// mettre un theme musical en arriere plan
// mode non retro ? ^^
// rajout de fonctionalité genre pouvoir ?? evenement tout les 50 rebond rajout d'un cone random ou pouvoir ?



startGame() // condition de demarage !


// BOUGER 1 touche a la fois 
// document.onkeydown = checkKey; // ecoute si une touche est enfoncé
// function checkKey(e) {
//     e = e || window.event
//     if (e.keyCode == '38') { // up arrow
//         moveupP2()
//     } else if (e.keyCode == '40') { // down arrow
//         movedownP2()
//     } else if (e.keyCode == '90') { // z key
//         moveupP1()
//     } else if (e.keyCode == '83') { // s key
//         movedownP1()
//     }
// }
// function moveupP2() {
//     P2.y -= 15
// }
// function movedownP2() {
//     P2.y += 15
// }

// function moveupP1() {
//     P1.y -= 15
// }
// function movedownP1() {
//     P1.y += 15
// }