const canvas = document.querySelector('#game');
const game = canvas.getContext('2d');
const btnUp= document.querySelector('#up');
const btnLeft = document.querySelector('#left');
const btnRight = document.querySelector('#right');
const btnDown = document.querySelector('#down');


let canvaSize;
let elementsSize;

const playerPosition = {
  x: undefined,
  y:undefined,
}
const giftPosition = {
  x: undefined,
  y: undefined,
}

window.addEventListener('load', setCanvasSize);
window.addEventListener('resize', setCanvasSize);

function setCanvasSize() {
  
  if (window.innerHeight > window.innerWidth) {
    canvaSize = window.innerWidth * 0.8;
  } else {
      canvaSize = window.innerHeight * 0.8;
    }
    
    canvas.setAttribute('Width', canvaSize);
    canvas.setAttribute('Height', canvaSize);
    
    elementsSize = (canvaSize / 10) - 2;
    startGame();
  }

function startGame() {
  //console.log('Start game');
    game.font = (elementsSize - 12) + 'px Verdana';
    game.textAlign = 'end';

    const map = maps[0];
    const mapRows = map.trim().split('\n');
    const mapRowCols = mapRows.map(row => row.trim().split(''));

    game.clearRect(0,0, canvaSize, canvaSize);

    mapRowCols.forEach((row, rowI) => {
      row.forEach((col, colI) => {
        const emoji = emojis[col];
        const posX = elementsSize * (colI + 1);
        const posY = elementsSize * (rowI + 1);

        if (col == 'O') {
          if (!playerPosition.x && !playerPosition.y) {
            playerPosition.x = posX;
            playerPosition.y = posY;
            console.log(playerPosition);
          }
        }else if (col == 'I') {
          giftPosition.x = posX;
          giftPosition.y = posY;
        }
        game.fillText(emoji, posX, posY);
      })
      
    });
  
    movePlayer();

    // for (let row = 1; row <= 10; row++) {
    //   for (let col = 1; col <= 10; col++) {
    //     game.fillText(emojis[mapRowCols[row - 1][col - 1]], elementsSize * col, elementsSize * row);
    //   }
    // }  
  }    
  
function movePlayer() {
  const gitfCollisionX = playerPosition.x.toFixed(2) == giftPosition.x.toFixed(2);
  const gitfCollisionY = playerPosition.y.toFixed(2) == giftPosition.y.toFixed(2);
  const gitfCollision = gitfCollisionX && gitfCollisionY;

  if (gitfCollision) {
    console.log('subiste de nivel wiiii');
  }

  game.fillText(emojis['PLAYER'], playerPosition.x, playerPosition.y);
}

window.addEventListener('keydown', moveByKeys);
btnUp.addEventListener('click', moveUp);
btnLeft.addEventListener('click', moveLeft);
btnRight.addEventListener('click', moveRight);
btnDown.addEventListener('click', moveDown);

function moveByKeys(event) {
  if (event.key == 'ArrowUp') moveUp();
  else if (event.key == 'ArrowLeft') moveLeft();
  else if (event.key == 'ArrowRight')moveRight();
  else if (event.key == 'ArrowDown') moveDown();  
}

function moveUp() {
  if (playerPosition.y - elementsSize < elementsSize){
    console.log('out');
  }else{
    playerPosition.y -= elementsSize;
    startGame();
  }
}

function moveLeft() {
  if (playerPosition.x - elementsSize < elementsSize){
    console.log('out');
  }else{
    playerPosition.x -= elementsSize;
    startGame();
  }
}

function moveRight() {
  if (playerPosition.x + elementsSize > canvaSize){
    console.log('out');
  }else{
    playerPosition.x += elementsSize;
    startGame();
  }
}

function moveDown() {
  if (playerPosition.y + elementsSize > canvaSize){
    console.log('out');
  }else{
    playerPosition.y += elementsSize;
    startGame();
  }
}

