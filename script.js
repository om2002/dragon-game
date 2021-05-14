audio = new Audio('music.mp3');
function start() {
    audio.play();
    dragon = document.getElementsByClassName('dragon');
    instruction = document.getElementsByClassName('instruction');
    instruction[0].style.visibility = "hidden";
    dragon[0].style.animation = "dragon 3s linear infinite";
}
countX = 1;
score = 0;
cross = true;

audiogo = new Audio('gameover.mp3');


document.onkeydown = function (e) {
    console.log("key code is :" + e.keyCode);
    audio.play();
    if (e.keyCode == 38) {
        dino = document.getElementsByClassName('dino');// getElementsByClassName return array for those element whose class is dino
        dino[0].classList.add('animateDino');// so adding animateDino on first element whose class is  dino
        setTimeout(() => {
            dino[0].classList.remove('animateDino');
        }, 700)
    }

    if (e.keyCode == 39) {
        dino = document.getElementsByClassName('dino');
        dinoX = parseInt(window.getComputedStyle(dino[0], null).getPropertyValue('left'));
        dino[0].style.left = dinoX + 112 + "px"
    }

    if (e.keyCode == 37) {
        dino = document.getElementsByClassName('dino');
        dinoX = parseInt(window.getComputedStyle(dino[0], null).getPropertyValue('left'));
        dino[0].style.left = dinoX - 112 + "px"
    }
    if (e.keyCode == 70) {
        console.log(countX)
        countX = countX * -1;
        dino[0].style.transform = "scaleX(" + countX * -1 + ")";
    }
}

setInterval(() => {
    dino = document.getElementsByClassName('dino');
    obstacle = document.getElementsByClassName('dragon');
    gameover = document.getElementsByClassName('gameover');

    ox = parseInt(window.getComputedStyle(obstacle[0], null).getPropertyValue('left'));// as it return value in pixel 
    oy = parseInt(window.getComputedStyle(obstacle[0], null).getPropertyValue('top'));//so convert int int using parseIn
    dx = parseInt(window.getComputedStyle(dino[0], null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino[0], null).getPropertyValue('top'));


    offsetX = Math.abs(dx - ox);//calulating absolute differnce
    offsetY = Math.abs(dy - oy);
    // console.log(offsetX, offsetY)
    if (offsetX < 100 && offsetY < 75) {
        gameover[0].style.visibility = "visible";
        obstacle[0].classList.remove('dragon');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
        dino[0].style.animation = "DinoHide 4s linear";
        dino[0].style.bottom = -120 + "px";
    }
    else if (offsetX < 145 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        aniDur = parseFloat(window.getComputedStyle(obstacle[0], null).getPropertyValue('animation-duration'));
        console.log(aniDur);
        if (aniDur > 0.7) {
            setTimeout(() => {
                newDur = aniDur - 0.1;
                obstacle[0].style.animationDuration = newDur + 's';
            }, 500);
        }
        setTimeout(() => {
            cross = true;
        }, 1000);

    }

}, 10);

function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score
}