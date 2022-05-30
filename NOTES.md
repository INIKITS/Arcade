    for (let i = 0; i < snake.snakeBody.length; i++) {
        // debugger;
        // console.log(snake.snakeBody.length)
        // console.log(snake.snakeBody[i])
        for (let j = 0; j < snake.snakeBody[i].length - 1; j++) {
            let snakeDirection = snake.nextDirection[j];
            // console.log(snakeDirection)
            // console.log("this is i i: " + snake.snakeBody[i][i])
            // console.log("this is i j: " + snake.snakeBody[i][j])
            let snakeDiv = document.createElement("div");
            let snakeRow = (snakeDiv.style.gridRowStart = snake.snakeBody[i][j]);
            let snakeColumn = (snakeDiv.style.gridColumnStart = snake.snakeBody[i][j + 1]);
            let snakeHead = snake.snakeBody[snake.snakeBody.length-1];
            
      
      let nextRow = snakeRow + snakeDirection;
      let nextCol = snakeColumn + snake.nextDirection[j + 1];
      snakeHead.push(nextRow,nextCol);
      console.log(snakeHead)
    //   console.log(nextRow);
    //   console.log(nextCol);

    //   snake.snakeBody[i] = [...snake.snakeBody[i+1]];

    //   console.log(snake.snakeBody[i]);

      snakeDiv.style.gridRowStart = nextRow;
      snakeDiv.style.gridColumnStart = nextCol;
      snake.snakeBody[i] = [...snake.snakeBody[i+1]];
      snakeDiv.classList.add("snake");
      gameBoardContainer.appendChild(snakeDiv);