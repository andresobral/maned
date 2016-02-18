window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 600,
    height: 400,
    background: '#fff'
  });

  var nodeSize = 10;
  var snakeSpeed = 2;

  var score = 0;
  var snake = [];
  var food = [];
  var direction = 'right';
  var turnPoint = {};
  var foodOnStage = false;

  game.on('preload', function() {
    console.log('Preload...');
    game.preload([]);
  });

  game.on('start', function() {
    console.log('Start...');
    snake.push({
      x: game.width / 2,
      y: game.height / 2,
      width: nodeSize,
      height: nodeSize,
      direction: 'right'
    });
    createFood();
    foodOnStage = true;
  });

  game.on('update', function() {
    if(game.controls.isPressedKey('ARROW_UP')) {
      direction = 'up';
    }

    if(game.controls.isPressedKey('ARROW_RIGHT')) {
      direction = 'right';
    }

    if(game.controls.isPressedKey('ARROW_DOWN')) {
      direction = 'down';
    }

    if(game.controls.isPressedKey('ARROW_LEFT')) {
      direction = 'left';
    }

    if(game.controls.isPressedKey('S')) {
      console.log("snake nodes: " + snake.length);
      console.log(snake);
    }

    snakeEdges();
    moveSnake();
    renderSnake();
    createFood();
    renderFood();
    checkCollision();
    updateScore();
  });

  game.init();

  function createFood() {
    if(!foodOnStage) {
      food.push({
        x: Math.floor(Math.random() * game.width + 1),
        y: Math.floor(Math.random() * game.height + 1),
        width: nodeSize,
        height: nodeSize
      });
      foodOnStage = true;
    }
  }

  function renderFood() {
    var foodSize = food.length;

    for(var i = 0; i < foodSize; i++) {
      game.ctx.fillStyle = "orange";
      game.ctx.fillRect(food[i].x, food[i].y, nodeSize, nodeSize);
    }
  }

  function moveSnake() {
    var snakeSize = snake.length;

    for(var i = 0; i < snakeSize; i++) {
      if(i == 0) {
        switch(direction) {
          case 'right': snake[i].x += snakeSpeed; break;
          case 'up': snake[i].y -= snakeSpeed; break;
          case 'left': snake[i].x -= snakeSpeed; break;
          case 'down': snake[i].y += snakeSpeed; break;
        }
      } else {
        if(typeof snake[i - 1] !== 'undefined') {
          switch(snake[i - 1].direction) {
            case 'right': snake[i].x += snakeSpeed; break;
            case 'up': snake[i].y -= snakeSpeed; break;
            case 'left': snake[i].x -= snakeSpeed; break;
            case 'down': snake[i].y += snakeSpeed; break;
          }
        }
      }
    }
  }

  function renderSnake() {
    var snakeSize = snake.length;

    for(var i = 0; i < snakeSize; i++) {
      game.ctx.fillStyle = "#000";
      game.ctx.fillRect(snake[i].x, snake[i].y, nodeSize, nodeSize);
    }
  }

  function snakeEdges() {
    var snakeSize = snake.length;

    for(var i = 0; i < snakeSize; i++) {
      if(snake[i].x < 0) {
        snake[i].x = 0;
      }

      if(snake[i].y < 0) {
        snake[i].y = 0;
      }

      if(snake[i].x > game.width - nodeSize) {
        snake[i].x = game.width - nodeSize;
      }

      if(snake[i].y > game.height - nodeSize) {
        snake[i].y = game.height - nodeSize;
      }
    }
  }

  function checkCollision() {
    var foodSize = food.length;

    for(var i = 0; i < foodSize; i++) {
      if(game.collision.isCollided(snake[0], food[i])) {
        food.splice(i, 1);
        foodOnStage = false;
        addNodeToSnake();
        score += 100;
      }
    }
  }

  function addNodeToSnake() {
    var snakeSize = snake.length;
    var i = snakeSize - 1;
    var obj = {};
    if(direction == 'right') {
      obj = {
        x: snake[i].x - nodeSize,
        y: snake[i].y,
        width: nodeSize,
        height: nodeSize,
        direction: direction
      }
    }
    if(direction == 'up') {
      obj = {
        x: snake[i].x,
        y: snake[i].y - nodeSize,
        width: nodeSize,
        height: nodeSize,
        direction: direction
      }
    }
    if(direction == 'left') {
      obj = {
        x: snake[i].x + nodeSize,
        y: snake[i].y,
        width: nodeSize,
        height: nodeSize,
        direction: direction
      }
    }
    if(direction == 'down') {
      obj = {
        x: snake[i].x,
        y: snake[i].y + nodeSize,
        width: nodeSize,
        height: nodeSize,
        direction: direction
      }
    }
    snake.push(obj);
  }

  function updateScore() {
    game.text(score, 30, 30, {
      font: "22px Arial",
      color: "#000"
    });
  }

};
