window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 400,
    height: 320,
    background: '#fff',
    fps: 5
  });

  var grid;
  var snake;
  var nodeSize = 20;
  var snakeSpeed = 20;

  var score = 0;

  game.on('preload', function() {
    game.preload([]);
  });

  game.on('start', function() {
    grid = new Grid(game.height / nodeSize, game.width / nodeSize);
    snake = new Snake ('right', 10, 8);
  });

  game.on('update', function() {
    if(game.controls.isPressedKey('ARROW_UP')) {
      // direction = 'up';
      // moveSnake();
    }

    if(game.controls.isPressedKey('ARROW_RIGHT')) {
      // direction = 'right';
      // moveSnake();
    }

    if(game.controls.isPressedKey('ARROW_DOWN')) {
      // direction = 'down';
      // moveSnake();
    }

    if(game.controls.isPressedKey('ARROW_LEFT')) {
      // direction = 'left';
      // moveSnake();
    }

    if(game.controls.isPressedKey('S')) {
      console.log("snake nodes: " + snake.length);
      console.log(snake);
    }

    // render();
  });

  game.init();

  function Grid(cols, rows) {
    this.cols = cols;
    this.rows = rows;
    this.arr = [];
    console.log(this);

    for(var i = 0; i < cols; i++) {
      this.arr.push([]);
      for(var j = 0; j < cols; j++) {
        this.arr[i].push(0);
      }
    }
  }

  Grid.prototype.getEntity = function(x, y) {
    // console.log(x + ' - ' + y);
    return this.arr[x][y];
  };

  function Snake(direction, col, row) {
    this.direction = direction;
    this.queue = [];
    console.log(this);
  }

  Snake.prototype.insert = function(row, col) {
    this.queue.unshift({
      x: transformPositionX(row),
      y: transformPositionX(col)
    });
    this.last = this.queue[0];
  };

  function transformPositionX(row) {
    return row * nodeSize;
  }

  function transformPositionY(col) {
    return col * nodeSize;
  }

  function render() {
    for(var i = 0; i < grid.rows; i++) {
      for(var j = 0; j < grid.cols; j++) {
        // grid.getEntity(i, j);
        console.log(grid.getEntity(i, j));
        switch(grid.getEntity(i, j)) {
          case 0:
            game.ctx.fillStyle = "#fff";
            break;
          case 1:
            game.ctx.fillStyle = "blue";
            break;
        }
        game.ctx.fillRect(i * nodeSize, j * nodeSize, nodeSize, nodeSize);
      }
    }
  }

};
