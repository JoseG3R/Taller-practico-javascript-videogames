const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');

const btnUp = document.getElementById('up');
const btnDown = document.getElementById('down');
const btnLeft = document.getElementById('left');
const btnRight = document.getElementById('right');

let canvasSize;
let elementsSize;
let level = 0;

const playerPosition ={
  x:undefined,
  y:undefined
};

const giftPosition = {
  x:undefined,
  y:undefined
};
let enemyPositions = [];

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);


function setCanvasSize() {

  if (window.innerHeight > window.innerWidth) {
    canvasSize = window.innerWidth * 0.8;
  } else {
    canvasSize = window.innerHeight * 0.8;
  }
  
  canvas.setAttribute('width', canvasSize);
  canvas.setAttribute('height', canvasSize);
  
  elementsSize = canvasSize / 10;

  startGame()
}

function startGame() {
  game.font = elementsSize + 'px Verdana';
  game.textAlign = 'end';

  const map = maps[level];

  if (!map) {
    gameWin();
    return;
  }

  const mapRows = map.trim().split('\n') ;
  const mapRowCols = mapRows.map(row =>row.trim().split(''));

  enemyPositions = [];
  game.clearRect(0,0,canvasSize,canvasSize);
  mapRowCols.forEach((row, rowI) => {
    row.forEach((col,colI) => {
      const emoji = emojis[col];
      const posX = elementsSize*(colI+1);
      const posY = elementsSize*(rowI+1);

      if (col == 'O') {
        if (!playerPosition.x && !playerPosition.y) {
          playerPosition.x = posX;
          playerPosition.y = posY;
          console.log(playerPosition);
        }
      }else if(col == 'I'){
        giftPosition.x = posX;
        giftPosition.y = posY;
      }else if(col == 'X'){
        enemyPositions.push({
          x: posX,
          y: posY
        });
      }

      game.fillText(emoji, posX, posY);

    });
  });

  movePlayer();

  /* for (let row = 1; row <= 10; row++) {
    //console.log(row);
    for(let col = 1; col <= 10; col ++){
      game.fillText(emojis[mapRowCols[row-1][col-1]], elementsSize * col , elementsSize * row);
      //console.log(col);
    }
  } */
}

function movePlayer() {

  const giftCollisionX = playerPosition.x.toFixed(3) == giftPosition.x.toFixed(3);
  const giftCollisionY = playerPosition.y.toFixed(3) == giftPosition.y.toFixed(3);
  const giftCollision = giftCollisionX && giftCollisionY;

  if(giftCollision){
    levelWin();
  }
  
  const enemyCollision = enemyPositions.find(enemy=>{
    const enemyCollistionX =enemy.x.toFixed(3) == playerPosition.x.toFixed(3);
    const enemyCollistionY =enemy.y.toFixed(3) == playerPosition.y.toFixed(3);
    return enemyCollistionX && enemyCollistionY;
  })
  
  if(enemyCollision){
    console.log('Chocaste con un enemigo :(');
  }
  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);

}
function levelWin(){
  console.log('Subiste de nivel');
  level++;
  startGame();
}
function gameWin() {
  console.log('Terminaste el juego');
}

window.addEventListener('keydown',moveByKeys)
btnUp.addEventListener('click', moveUp);
btnDown.addEventListener('click', moveDown);
btnRight.addEventListener('click', moveLeft);
btnLeft.addEventListener('click', moveRight);

function moveByKeys(e) {
  if (e.key == 'ArrowUp') moveUp();
  else if(e.key == 'ArrowLeft') moveLeft();
  else if(e.key == 'ArrowRight')  moveRight();
  else if(e.key == 'ArrowDown') moveDown();
}

function moveUp() {
  console.log('arriba');
  if ((playerPosition.y - elementsSize) < elementsSize) {
    console.log('Out');
  }else{

    playerPosition.y -= elementsSize;
    startGame();
  }

}
function moveLeft() {
  console.log('izquierda');
  if ((playerPosition.x - elementsSize) < elementsSize) {
    console.log('Out');
  }else{

    playerPosition.x -= elementsSize;
    startGame();
  }
}
function moveRight() {
  if ((playerPosition.x + elementsSize) > canvasSize) {
    console.log('Out');
  }else{

    playerPosition.x += elementsSize;
    startGame();
  }
  console.log(playerPosition.x);

}
function moveDown() {
  console.log('abajo');
   if ((playerPosition.y + elementsSize) > canvasSize) {
    console.log('Out');
  }else{

    playerPosition.y += elementsSize;
    startGame();
  }
}

 
//RETO-8:MOVIMIENTO CON TECLAS Y BOTONES
/* window.addEventListener('keydown',moverTeclas);
window.addEventListener('keypress',moverTeclas);
window.addEventListener('mousedown',moverBotones);

function moverTeclas(e) {
  //console.log(e.key);

  switch (e.key) {
    case 'ArrowUp':
      console.log('arriba');
      break;
    case 'ArrowDown':
      console.log('abajo');
      break;
    case 'ArrowLeft':
      console.log('izquierda');
      break;
    case 'ArrowRight':
      console.log('derecha');
      break;
  
    default:
      break;
  }
}
function moverBotones(e) {
  //console.log(e.target.id);
 // console.log(e);
  //console.log('hola');
   switch (e.target.id) {
    case 'up':
      console.log('arriba');
      break;
    case 'down':
      console.log('abajo');
      break;
    case 'left':
      console.log('izquierda');
      break;
    case 'right':
      console.log('derecha');
      break;
  
    default:
      break;
  }
} */