//Componenets
let jump = document.getElementById('up');
let left = document.getElementById('le');
let right = document.getElementById('ri');
let restart = document.querySelector('.restart');

let gOver = document.querySelector('.gameover');
let score = document.querySelector('.score');

let dino = document.querySelector('.dino');
let obstacle = document.querySelector('.cactus');

let scoreValue = 0;
let gameover = "false";

//Controls (Mouse/Touch)
jump.onclick = () => {
  dino.classList.add('jump');
  setTimeout (()=> {
    dino.classList.remove('jump');
  }, 600)};

left.onclick = () => {
  dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  dino.style.left = dinoX - 20 + "px";
};

right.onclick = () => {
  dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  dino.style.left = dinoX + 20 + "px";
};

//Controls (Keyboard)
document.addEventListener('keydown', (e) => {
  if (e.code === 'ArrowUp') {
    dino.classList.add('jump');
    setTimeout(() => {
      dino.classList.remove('jump');
    }, 600);
  } else if (e.code === 'ArrowLeft') {
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = dinoX - 20 + "px";
  } else if (e.code === 'ArrowRight') {
    dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dino.style.left = dinoX + 20 + "px";
  }
});

//Game logic collided or not
setInterval(()=> {
  dX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
  dY = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));

  oX = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
  oY = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

  cX = Math.abs(dX - oX);
  cY = Math.abs(dY - oY);
  if ((cX < 40) && (cY < 15)) {
    gOver.style.visibility = "visible";
    obstacle.classList.remove('obstacle');
    gameover = "true";
  }
}, 10);
//Score and obstacle speed
setInterval(()=>{
  if (gameover!="true"){
  scoreValue++;
 score.innerHTML= "Score : " + parseInt(scoreValue/30);
  }
  obdur =parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
  newdur = obdur - 0.0001;
  obstacle.style.animationDuration = newdur + 's';
},10);

restart.onclick = ()=>{
  gameover = "false";
  gOver.style.visibility = "hidden";
  obstacle.classList.add('obstacle');
  scoreValue = 0;
};

//Service Worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then((registration) => {
        console.log('ServiceWorker registration successful');
      })
      .catch((err) => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}
