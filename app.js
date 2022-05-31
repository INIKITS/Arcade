const gameBoardContainer = document.getElementById("gameboard-container");
const currentScoreElement = document.getElementById("current-score");
const highScoreElement = document.getElementById("high-score");
const left = "ArrowLeft";
const up = "ArrowUp";
const right = "ArrowRight";
const down = "ArrowDown";
const enter = "Enter";
let gameStart = false;
let intervalTimer;
let highScore = 0;
let currentScore = 0;

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
  apple: [[10, 3]],
  snake: snake,
  board: [0, 20],
  speed: 10,
};

function createGameBoard() {
  gameState.apple.forEach((coordinate) => {
    // console.log(coordinate);
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
function displayScore() {
    currentScoreElement.innerHTML = `CURRENT SCORE: ${currentScore} `;
    highScoreElement.innerHTML = `HIGH SCORE: ${highScore}`;
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
    snake.snakeBody.unshift([gameState.apple[0]]);
    randomAppleGenerator();
    gameState.speed += 0.25;
    currentScore++;
    displayScore();
    // console.log(snake.snakeBody);
  }
  newSnakeHead.push(snakeHead[0] + directionY);
  newSnakeHead.push(snakeHead[1] + directionX);

  snake.snakeBody.push(newSnakeHead);
}

function checkCollision() {
  let snakeHead = snake.snakeBody[snake.snakeBody.length - 1];
  if (
    snakeHead[0] < gameState.board[0] ||
    snakeHead[0] > gameState.board[1] ||
    snakeHead[1] < gameState.board[0] ||
    snakeHead[1] > gameState.board[1]
  ) {
    alert("you lost");
    startStopGame(enter);
  }
  let snakeHeadDup = snakeHead;
  console.log(snakeHeadDup);

  for (let i = 0; i < snake.snakeBody.length - 1; i++) {
    let compArr = [snakeHead];
    if (
      snake.snakeBody[i][0] === compArr[0][0] &&
      snake.snakeBody[i][1] === compArr[0][1]
    ) {
      alert("you lost");
      startStopGame("Enter");
    }
  }
}


function randomAppleGenerator() {
  let randomY = Math.floor(Math.random() * 20) + 1;
  let randomX = Math.floor(Math.random() * 20) + 1;

  return (gameState.apple[0] = [randomY, randomX]);
}

function tick() {
  // this is an incremental change that happens to the state every time you update...
  gameBoardContainer.innerHTML = "";
  snakeMove();
  renderState();
}
function startStopGame(event) {
  if (event.key === up || event.key === down) {
    intervalTimer = setInterval(tick, 1000 / gameState.speed);
    document.removeEventListener("keyup", startStopGame); // as close to 30 frames per second as possible
  }
  if (event === enter) {
    clearInterval(intervalTimer);
    playAgain();
  }
}

function renderState() {
  createGameBoard();
  checkCollision();
  // debugger;
}

document.addEventListener("keyup", startStopGame);

let lastCoordinate = [0, 0];
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case up:
      console.log("up, lastCoordinate: ", lastCoordinate);
      if (lastCoordinate[1] !== 0) break;

      snake.nextDirection = [0, -1];
      lastCoordinate = [0, -1];
      break;
    case down:
      console.log("down last Coordinate: ", lastCoordinate);
      if (lastCoordinate[1] !== 0) break;

      snake.nextDirection = [0, 1];
      lastCoordinate = [0, 1];
      break;
    case right:
      if (lastCoordinate[0] !== 0) break;
      snake.nextDirection = [1, 0];
      lastCoordinate = [1, 0];
      break;
    case left:
      if (lastCoordinate[0] !== 0) break;
      snake.nextDirection = [-1, 0];
      lastCoordinate = [-1, 0];
      break;
    case enter:
      startStopGame(event.key), console.log("case Enter: ");
      break;
    default:
      snake.nextDirection = snake.nextDirection;
  }
});

function playAgain() {
    gameBoardContainer.innerHTML = "";
    gameState.apple = [[10, 3]];
    snake.snakeBody = [
        [7, 10],
        [8, 10],
        [9, 10],
        [10, 10],
      ];
      highScore = currentScore;
      currentScore = 0;
      displayScore();
    createGameBoard();
    gameState.speed = 10;
    document.addEventListener("keyup", startStopGame);
}
createGameBoard();
