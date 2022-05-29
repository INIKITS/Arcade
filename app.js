

let snakeBody = []
// add to above
function tick() {
    // this is an incremental change that happens to the state every time you update...
  
    renderState()
  }
  
  setInterval(tick, 1000 / 30) // as close to 30 frames per second as possible
  
  // now you might have things like
  document.addEventListener('keydown', function (event) {
    // here you might read which key was pressed and update the state accordingly
  })