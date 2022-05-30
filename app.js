const gameBoardContainer = document.getElementById("gameboard-container");
const left = "ArrowLeft";
const up = "ArrowUp";
const right = "ArrowRight";
const down = "ArrowDown";
const enter = "Enter";
let gameStart = false;
let intervalTimer;

let snake = {
  // snakeBody: [y, x]
  snakeBody: [
    [7, 10],
    [8, 10],
    [9, 10],
    [10, 10],
  ],
  nextDirection: [1, 0],
};

let gameState = {
  apple: [10, 8],
  snake: snake,
  board: [0, 20],
};

function createGameBoard() {
  snake.snakeBody.forEach((segment) => {
    let segmentY = segment[0];
    let segmentX = segment[1];

    const snakeSquare = document.createElement("div");
    snakeSquare.style.gridRowStart = segmentX;
    snakeSquare.style.gridColumnStart = segmentY;
    snakeSquare.classList.add("snake");

    gameBoardContainer.appendChild(snakeSquare);
  });
}
function snakeMove() {
  snake.snakeBody.shift();
  let directionY = snake.nextDirection[0];
  let directionX = snake.nextDirection[1];
  let snakeHead = snake.snakeBody[snake.snakeBody.length - 1];

  let newSnakeHead = [];
  newSnakeHead.push(snakeHead[0] + directionY);
  newSnakeHead.push(snakeHead[1] + directionX);

  snake.snakeBody.push(newSnakeHead);
}

function checkCollision(){
    let snakeHead = snake.snakeBody[snake.snakeBody.length-1];
    console.log(snakeHead);
    if (snakeHead[0] < gameState.board[0] ||snakeHead[0] > gameState.board[1]  || snakeHead[1] < gameState.board[0] || snakeHead[1] > gameState.board[1]){
        alert("you lost");
        startStopGame(enter);
        
    }
}

function tick() {
  // this is an incremental change that happens to the state every time you update...
  gameBoardContainer.innerHTML = "";
  snakeMove();
  createGameBoard();
  checkCollision();
  renderState();
}
function startStopGame(event) {
  if (event.key === up || event.key === down) {
    console.log("it is going here instead");
    intervalTimer = setInterval(tick, 1000 / 10);
    document.removeEventListener("keyup", startStopGame); // as close to 30 frames per second as possible
  }
  if (event === enter) {
    console.log("Enter made it here");
    clearInterval(intervalTimer);
    console.log(intervalTimer)
  //   intervalTimer = null;
  }
}

function renderState() {
  // debugger;
}

document.addEventListener("keyup", startStopGame);
// now you might have things like
document.addEventListener("keydown", function (event) {
  // here you might read which key was pressed and update the state accordingly
  // console.log(event);
  let lastkey;
  // console.log(lastkey)
  switch (event.key) {
    case up:
      snake.nextDirection = [0, -1];
      lastkey = up;
      console.log("this worked: ", up);
      break;
    case down:
      snake.nextDirection = [0, 1];
      lastkey = down;
      break;
    case right:
      snake.nextDirection = [1, 0];
      break;
    case left:
      snake.nextDirection = [-1, 0];
      break;
    case enter:
      startStopGame(event.key), console.log("case Enter: ");
      break;
    default:
      snake.nextDirection = snake.nextDirection;
  }
});

createGameBoard();
// snakeMove();
