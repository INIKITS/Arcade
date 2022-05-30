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
  apple: [[2, 2]],
  snake: snake,
  board: [0, 20],
};

function createGameBoard() {
  gameState.apple.forEach((coordinate) => {
    console.log(coordinate);
    let coordinateY = coordinate[0];
    let coordinateX = coordinate[1];

    const appleSquare = document.createElement("div");
    appleSquare.style.gridRowStart = coordinateX;
    appleSquare.style.gridColumnStart = coordinateY;
    appleSquare.classList.add("apple");

    gameBoardContainer.appendChild(appleSquare);
  });
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
  let directionY = snake.nextDirection[0];
  let directionX = snake.nextDirection[1];
  let snakeHead = snake.snakeBody[snake.snakeBody.length - 1];

  let newSnakeHead = [];
  snake.snakeBody.shift();

  if (
    snakeHead[0] === gameState.apple[0][0] &&
    snakeHead[1] === gameState.apple[0][1]
  ) {
    snake.snakeBody.push([snakeHead]);
    randomAppleGenerator();
    console.log(snake.snakeBody);
  }
  newSnakeHead.push(snakeHead[0] + directionY);
  newSnakeHead.push(snakeHead[1] + directionX);

  snake.snakeBody.push(newSnakeHead);
}

function checkCollision() {
  let snakeHead = snake.snakeBody[snake.snakeBody.length - 1];
  console.log(snakeHead);
  let duplicate = 0;
  if (
    snakeHead[0] < gameState.board[0] ||
    snakeHead[0] > gameState.board[1] ||
    snakeHead[1] < gameState.board[0] ||
    snakeHead[1] > gameState.board[1]
  ) {
    alert("you lost");
    startStopGame(enter);
  }
  //   snake.snakeBody.forEach(segment => {
  //       console.log(segment.length-1);
  //       for (let i=0; i< segment.length-1; i++){
  //       if (snakeHead[i] === segment[i]){
  //           duplicate++;
  //           if (duplicate == 2){
  //               alert("you lost");
  //               startStopGame(enter);
  //           }
  //       }}
  //   })
}

function randomAppleGenerator() {
  let randomNum = Math.floor(math.Random() * 20);
}

function tick() {
  // this is an incremental change that happens to the state every time you update...
  gameBoardContainer.innerHTML = "";
  snakeMove();
  renderState();
}
function startStopGame(event) {
  if (event.key === up || event.key === down) {
    intervalTimer = setInterval(tick, 1000 / 10);
    document.removeEventListener("keyup", startStopGame); // as close to 30 frames per second as possible
  }
  if (event === enter) {
    clearInterval(intervalTimer);
  }
}

function renderState() {
  createGameBoard();
  checkCollision();
  // debugger;
}

document.addEventListener("keyup", startStopGame);

document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case up:
      snake.nextDirection = [0, -1];
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
