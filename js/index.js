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
  }, 6000)};

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

let deferredPrompt;

window.addEventListener('beforeinstallprompt', (event) => {
  // Prevent the default browser install prompt
  event.preventDefault();
  
  // Save the event for later use
  deferredPrompt = event;

  // Show the custom install pop-up
  showInstallPromotion();
});
function showInstallPromotion() {
  const installContainer = document.getElementById('installContainer');
  installContainer.style.display = 'block';
}
const installButton = document.getElementById('installButton');
const cancelButton = document.getElementById('cancelButton');
const installContainer = document.getElementById('installContainer');

installButton.addEventListener('click', () => {
  // Hide the pop-up
  installContainer.style.display = 'none';

  // Show the browser's install prompt
  if (deferredPrompt) {
    deferredPrompt.prompt();

    // Wait for the user to respond to the prompt
    deferredPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the install prompt');
      } else {
        console.log('User dismissed the install prompt');
      }

      // Clear the saved prompt
      deferredPrompt = null;
    });
  }
});

// Handle the "Not Now" button
cancelButton.addEventListener('click', () => {
  installContainer.style.display = 'none';
});
