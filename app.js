const gameBoardContainer = document.getElementById("gameboard-container");
const currentScoreElement = document.getElementById("current-score");
const highScoreElement = document.getElementById("high-score");
const playAgainElement = document.getElementById("play-again-section");
const playAgainButton = document.getElementById("play-again-button");
const startGameButton = document.getElementById("start-game-button");
const muteButton = document.getElementById("mute-music-button");

// realized I could have made all of these sections below their own object to avoid global variables, may do this if I have time

const left = "ArrowLeft";
const up = "ArrowUp";
const right = "ArrowRight";
const down = "ArrowDown";
const enter = "Enter";

let gameStart = false;
let muted = false;
let intervalTimer;
let highScore = 0;
let currentScore = 0;
let firstTime = true;;

let eatSound;
let dieSound;
let backgroundMusic;
let highScoreSound;

// this handles sound elements
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}

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
  board: [0, 20],
  speed: 10,
};

function createGameBoard() {
  // placing apple on board
  gameState.apple.forEach((coordinate) => {
    let coordinateY = coordinate[0];
    let coordinateX = coordinate[1];

    const appleSquare = document.createElement("div");
    appleSquare.style.gridRowStart = coordinateX;
    appleSquare.style.gridColumnStart = coordinateY;
    appleSquare.classList.add("apple");

    gameBoardContainer.appendChild(appleSquare);
  });

  // placing snake body segments on board
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

  // checking to see if snake is on top of apple coordinates
  if (
    snakeHead[0] === gameState.apple[0][0] &&
    snakeHead[1] === gameState.apple[0][1]
  ) {
    eatSound.play();
    snake.snakeBody.unshift([gameState.apple[0]]);
    randomAppleGenerator();

    // increase speed each time snake eats an apple
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
  // checking to see if snake is running out of bounds of the board or if snake is eating itself
  let snakeHead = snake.snakeBody[snake.snakeBody.length - 1];
  if (
    snakeHead[0] < gameState.board[0] ||
    snakeHead[0] > gameState.board[1] ||
    snakeHead[1] < gameState.board[0] ||
    snakeHead[1] > gameState.board[1]
  ) {
    dieSound.play();
    stopGame();
  }

  for (let i = 0; i < snake.snakeBody.length - 1; i++) {
    let compArr = [snakeHead];
    if (
      snake.snakeBody[i][0] === compArr[0][0] &&
      snake.snakeBody[i][1] === compArr[0][1]
    ) {
      dieSound.play();
      stopGame();
    }
  }
}

function randomAppleGenerator() {
  let randomY = Math.floor(Math.random() * 20) + 1;
  let randomX = Math.floor(Math.random() * 20) + 1;

  return (gameState.apple[0] = [randomY, randomX]);
}

function tick() {
  // clear game board every tick and render new positions of apple and snake
  gameBoardContainer.innerHTML = "";
  snakeMove();
  renderState();
}

function startGame(event) {
  if (firstTime) {
    //initializing music elements and setting volume only when page is loaded first time
    backgroundMusic = new sound("cirque de chats3.mp3");
    backgroundMusic.sound.setAttribute("id", "background-music");
    let backgroundMusicId = document.getElementById("background-music");
    backgroundMusicId.volume = 0.07;
    backgroundMusic.play();

    eatSound = new sound("snake_monch.wav");
    eatSound.sound.setAttribute("id", "eat-sound");
    let eatSoundId = document.getElementById("eat-sound");
    eatSoundId.volume = 0.3;

    dieSound = new sound("snake_die.wav");

    highScoreSound = new sound("high_score.wav");
    highScoreSound.sound.setAttribute("id", "high-score-sound");
    let highScoreSoundId = document.getElementById("high-score-sound");
    highScoreSoundId.volume = 0.5;

    firstTime = false;
  }

  if (event.key === up || event.key === down) {
    intervalTimer = setInterval(tick, 1000 / gameState.speed);
    document.removeEventListener("keyup", startGame);
    startGameButton.removeEventListener("click", startGame); // as close to 30 frames per second as possible
  }
  if (event.target.id === "start-game-button") {
    intervalTimer = setInterval(tick, 1000 / gameState.speed);
    document.removeEventListener("keyup", startGame);
    startGameButton.removeEventListener("click", startGame);
  }
}

function stopGame() {
  clearInterval(intervalTimer);
  playAgain();
}

function renderState() {
  createGameBoard();
  checkCollision();
}

// add initial event listeners to start game
document.addEventListener("keyup", startGame);
startGameButton.addEventListener("click", startGame);

let lastCoordinate = [0, 0];
document.addEventListener("keydown", function (event) {
  switch (event.key) {
    case up:
      if (lastCoordinate[1] !== 0) break;

      snake.nextDirection = [0, -1];
      lastCoordinate = [0, -1];
      break;
    case down:
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
      startGame(event.key);
      break;
    default:
      snake.nextDirection = snake.nextDirection;
  }
});

function displayScore() {
  currentScoreElement.innerHTML = `CURRENT SCORE: ${currentScore} `;
  highScoreElement.innerHTML = `HIGH SCORE: ${highScore}`;
}

function playAgain() {
  if (currentScore > highScore) {
    highScore = currentScore;
    highScoreSound.play();
  }

  // reveal play again and reset game if user chooses to play again
  playAgainElement.style.display = "flex";
  playAgainButton.addEventListener("click", function () {
    playAgainElement.style.display = "none";
    gameBoardContainer.innerHTML = "";
    gameState.apple = [[10, 3]];
    snake.snakeBody = [
      [7, 10],
      [8, 10],
      [9, 10],
      [10, 10],
    ];
    snake.nextDirection = [1, 0];

    currentScore = 0;
    displayScore();
    createGameBoard();
    gameState.speed = 10;
    lastCoordinate = [0, 0];
    document.addEventListener("keyup", startGame);
    startGameButton.addEventListener("click", startGame);
  });
}

muteButton.addEventListener("click", function () {
  muted = !muted;
  muteButton.classList.toggle("muted");
  let musicId = document.getElementById("background-music");
  if (muted) {
    musicId.volume = 0;
  } else {
    musicId.volume = 0.07;
  }
});

createGameBoard();
