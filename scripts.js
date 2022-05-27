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
ballSize = {
    "x" : 10,
    "y" : 10
}

let score1 = 0
let score2 = 0

function startGame() {
    myGameArea.start()
    let canvas = document.querySelector("canvas")
    P1 = new component(40, (canvas.height/2)-(raquetteSize.y/2), raquetteSize.x, raquetteSize.y, "#ffffff")
    P2 = new component(canvas.width - 40, (canvas.height/2)-(raquetteSize.y/2), raquetteSize.x, raquetteSize.y, "#ffffff")
    ball = new component((canvas.width/2)-5, (canvas.height/2)-5, ballSize.x, ballSize.y, "#ffffff")
    ball.speedX = 0.25 // defini les propriéte de base de la ball
    ball.speedY = Math.random()
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
        this.interval = setInterval(updateGameArea, 50) // calcul le nombre FPS 100/60 == 16 100/50 FPS = 20

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

    stop :function() {
        // clearInterval(this.interval)

        ball.x = (this.width/2)-5
        ball.y = (this.height/2)-5
    },

    clear : function() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.start()
    }
}

function component(x, y, width, height, color) { // classe
    this.width = width
    this.height = height
    this.x = x
    this.y = y

    this.speedX = 0
    this.speedY = 0

    this.bounce = 0

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
    P2.speedX = 0 // Adapte la vitesse du joeur
    P2.speedY = 0
    if (myGameArea.keys && myGameArea.keys[38] && P2.y>0) {P2.speedY = -1 }// on s'assure que le joueur appuie et ne puisse sortir de l'écran
    if (myGameArea.keys && myGameArea.keys[40] && P2.y<550) {P2.speedY = 1 }// on s'assure que le joueur appuie et ne puisse sortir de l'écran
    P2.newPos() // actualise la position de la raquette du joueur
    
    P1.update()
    P1.speedX = 0 // ""
    P1.speedY = 0
    if (myGameArea.keys && myGameArea.keys[90] && P1.y>0) {P1.speedY = -1 }
    if (myGameArea.keys && myGameArea.keys[83] && P1.y<550) {P1.speedY = 1 }
    P1.newPos() // ""

    ball.update()
    actualSpeedY = ball.speedY
    actualSpeedX = ball.speedX
    switch (ball.bounce) { // accelere la ball pour plus de challenge
        case 5: ball.speedX += 0.1; break;
        case 10: ball.speedX += 0.1; break;
        case 20: ball.speedX += 0.1; break;
        case 30: ball.speedX += 0.1; break;
        case 40: ball.speedX += 0.1; break;
        case 50: ball.speedX += 0.1; break;
        case 65: ball.speedX += 0.1; break;
        case 80: ball.speedX += 0.1; break;
        case 100: ball.speedX += 0.1; break;
        case 125: ball.speedX += 0.1; break;
    }
    if (ball.x == 45 && (ball.y > P1.y-ballSize.y && ball.y+ballSize.y < P1.y+raquetteSize.y+ballSize.y)) { // pour renvoyer a l'autre joueur il faut que la balle touche la raquette
        ball.speedX = -actualSpeedX
        ball.speedY = bounceAngle(ball.y,P1.y)

        P1.bounce += 1
        ball.bounce += 1
    }
    if (ball.x == 755 && (ball.y > P2.y-ballSize.y && ball.y+ballSize.y < P2.y+raquetteSize.y+ballSize.y)){ // pour renvoyer a l'autre joueur il faut que la balle touche la raquette
        ball.speedX = -actualSpeedX
        ball.speedY = bounceAngle(ball.y,P2.y)

        P1.bounce += 1
        ball.bounce += 1
    }

    if (ball.y >= 0 ) {
        ball.speedY = -ball.speedY 
    }
    if(ball.y <= 600-ballSize.y) {
        ball.speedY = -ball.speedY 
    }

    if (ball.x == 21) {
        score2 += 1
        document.querySelector("#P2").innerText = score2
    } else if (ball.x == 774) {
        score1 += 1
        document.querySelector("#P1").innerText = score1
    }

    if (ball.x == 20) {
        ball.speedX = 0
        ball.speedY = 0
        // myGameArea.stop()
    }
    if (ball.x == 775) {
        ball.speedX = 0
        ball.speedY = 0
        // myGameArea.stop()
    }

    ball.newPos()
}

let body = document.body
let div = document.createElement("div")

let scoreP1 = document.createElement("p")
scoreP1.innerText = "PLAYER 1 : "
let scoreP2 = document.createElement("p")
scoreP2.innerText = "PLAYER 2 : "
let btn = document.createElement("button")
btn.innerText = "PLAY"

let P1score = document.createElement("span")
let P2score = document.createElement("span")
P1score.innerText = 0
P2score.innerText = 0



body.prepend(document.createElement("div"))

body.append(div)
div.append(scoreP1)
scoreP1.append(P1score)
div.append(btn)
div.append(scoreP2)
scoreP2.append(P2score)



scoreP1.style.color = "white"
P1score.id = "P1"
scoreP2.style.color = "white"
P2score.id = "P2"
div.style.display = "flex"
div.style.justifyContent = "space-evenly"
div.style.marginTop = "1em"
body.style.paddingTop = "1em"
body.style.backgroundColor = "black"
body.firstElementChild.style.height = "600px"
body.firstElementChild.style.width = "800px"
body.firstElementChild.style.backgroundColor = "#2f4f4f"
body.firstElementChild.style.margin = "auto"
body.firstElementChild.id = "start"


btn.addEventListener("click",function () {
    if(document.querySelector("#start")){
        document.querySelector("div").remove()
    }
    
    startGame()// condition de demarage !
})
 


function bounceAngle(ballY, playerY) { // determin el'angle de la balle lors du rebond
    let touchArea = (ballY -playerY) + (ballSize.y-1)
    console.log(touchArea)
    if (touchArea >= (raquetteSize.y + ( (ballSize.y-1)*2 ))/2) { // on calcule ici si la balle a touché la partie supérieur ou inférieur du player en divisant par 2 la alrgeur possible d'impact
        return (1/touchArea)*2  // si partie inférieur j'nvoie vers le bas
    } else {
        return (-1/touchArea)*2 // si partie supérieur j'envoie vers le haut
    }
}






// BOUGER 1 touche a la fois  pour l'histore
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