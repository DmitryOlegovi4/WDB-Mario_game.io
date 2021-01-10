const mario = document.getElementById('mario');
const mushroom = document.getElementById('mushroom');
const bestScore = document.querySelector('.bestScore');
const score = document.querySelector('.score');
const btnStart = document.querySelector('.start');
const rule = document.querySelector('.rule');
const gameover = document.querySelector('.gameover');
const btnRepeat = document.querySelector('.repeat');
let count = 0;

if (!localStorage.getItem('bestScore')){
    localStorage.setItem('bestScore', 0);
    bestScore.innerHTML = 'HI 000000'
} else if (localStorage.getItem('bestScore')){
    keepBestScore(localStorage.getItem('bestScore'));
}

let isALive = setInterval(function () {
    let marioTop = parseInt(window.getComputedStyle(mario).getPropertyValue('top'));
    let mushroomLeft = parseInt(window.getComputedStyle(mushroom).getPropertyValue('left'));

    if (mushroomLeft < 50 && mushroomLeft > 0 && marioTop >= 150) {
        if(count>localStorage.getItem('bestScore')){
            localStorage.setItem('bestScore', count);
            keepBestScore(count);
            bestScore.style.textShadow = '0 0 10px yellow';
            setTimeout(function () {
                bestScore.style.textShadow = 'none';
            }, 3000)
        }
        count = 0;
        keepScore();
        gameover.style.display = 'flex';
        mushroom.classList.remove('moveMushroom');
        mario.classList.remove('moveMario');
        rule.style.display = 'block';
    }
}, 10)


function keepScore() {
    if (count < 10) {
        score.innerText = `00000${count}`;
    } else if (count < 100) {
        score.innerText = `0000${count}`;
    } else if (count < 1000) {
        score.innerText = `000${count}`;
    } else if (count < 10000) {
        score.innerText = `00${count}`;
    }
}
function keepBestScore(count) {
    if (count < 10) {
        bestScore.innerText = `HI 00000${count}`;
    } else if (count < 100) {
        bestScore.innerText = `HI 0000${count}`;
    } else if (count < 1000) {
        bestScore.innerText = `HI 000${count}`;
    } else if (count < 10000) {
        bestScore.innerText = `HI 00${count}`;
    }
}

keepScore();

function jump() {
    if (mario.classList !== 'jump') {
        mario.classList.add('jump');
    }
    setTimeout(function () {
        mario.classList.remove('jump');
    }, 500)
}

document.addEventListener('keydown', function (e) {
    if (e.code === 'KeyW' || e.code === 'ArrowUp' || e.code === 'Space') {
        jump();
        let mushroomLeft = parseInt(window.getComputedStyle(mushroom).getPropertyValue('left'));
        if (mushroomLeft < 150 && mushroomLeft > 55) {
            count++;
            keepScore();
        }
    }
})
document.addEventListener('touchstart', function () {
        jump();
        let mushroomLeft = parseInt(window.getComputedStyle(mushroom).getPropertyValue('left'));
        if (mushroomLeft < 150 && mushroomLeft > 55) {
            count++;
            keepScore();
        }
})
btnStart.addEventListener('click', function () {
    btnStart.innerHTML = '3';
    rule.style.display = 'none';
    setTimeout(function () {
        btnStart.innerHTML = '2';
    }, 1000)
    setTimeout(function () {
        btnStart.innerHTML = '1';
    }, 2000)
    setTimeout(function () {
        btnStart.style.display = 'none';
        btnStart.innerHTML = 'START';
    }, 3000)
    setTimeout(function () {
        mushroom.classList.add('moveMushroom');
        mario.classList.add('moveMario');
    }, 4000)
})
btnRepeat.addEventListener('click',function () {
    rule.style.display = 'none';
    gameover.style.display = 'none';
    setTimeout(function () {
        mushroom.classList.add('moveMushroom');
        mario.classList.add('moveMario');
    }, 500)
})
