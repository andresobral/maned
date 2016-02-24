var game;
var grid;
var snake;
var score;

var nodeSize = 20;

function Grid(direction, cols, rows) {
  this.direction = direction;
  this.rows = rows;
  this.cols = cols;
  this.arr = [];

  this.init();
}

Grid.prototype.init = function() {
  for(var i  = 0; i < this.cols; i++) {
    this.arr.push([]);
    for(var j = 0; j < this.rows; j++) {
      this.arr[i].push(0);
    }
  }
};

Grid.prototype.setEntity = function(value, x, y) {
  this.arr[x][y] = value;
};

Grid.prototype.getEntity = function(x, y) {
  return this.arr[x][y];
};

function Snake(direction, rows, cols) {
  this.direction = direction;
  this.queue = [];
  this.insert(rows, cols);
}

Snake.prototype.insert = function(x, y) {
  this.queue.unshift({x: x, y: y});
  this.last = this.queue[0];
}

Snake.prototype.remove = function() {
  return this.queue.pop();
}

function render() {
  for(var i = 0; i < grid.cols; i++) {
    for(var j = 0; j < grid.rows; j++) {
      switch(grid.getEntity(i, j)) {
        case 0:
          game.ctx.fillStyle = "#fff";
          break;
        case 1:
          game.ctx.fillStyle = "blue";
          break;
        case 2:
          game.ctx.fillStyle = "orange";
          break;
      }

      game.ctx.fillRect(i * nodeSize, j * nodeSize, nodeSize, nodeSize);
    }
  }

  updateScore();
}

function createFood() {
  var empty = [];

  for(var i = 0; i < grid.cols; i++) {
    for(var j = 0; j < grid.rows; j++) {
      if(grid.getEntity(i, j) === 0) {
        empty.push({x: i, y: j});
      }
    }
  }

  var position = empty[Math.round(Math.random()*(empty.length - 1))];
  grid.setEntity(2, position.x, position.y);
}

function updateScore() {
  game.text(score, game.width/2, 20, {
    font: "18px Arial",
    color: "#000",
    textAlign: "center"
  });
}

function init() {
  score = 0;
  grid = new Grid('right', 20, 16);
  snake = new Snake('right', 10, 8);
  grid.setEntity(1, 10, 8);
  createFood();
}

game = new Maned({
  className: '.engine',
  width: 400,
  height: 320,
  background: '#fff',
  fps: 10
});

game.on('preload', function() {
  game.preload([]);
});

game.on('start', function() {
  console.log('start...');
  init();
});

game.on('update', function() {
  if(game.controls.isPressedKey('ARROW_UP')) {
    snake.direction = 'up';
  }

  if(game.controls.isPressedKey('ARROW_RIGHT')) {
    snake.direction = 'right';
  }

  if(game.controls.isPressedKey('ARROW_DOWN')) {
    snake.direction = 'down';
  }

  if(game.controls.isPressedKey('ARROW_LEFT')) {
    snake.direction = 'left';
  }

  var x = snake.last.x;
  var y = snake.last.y;

  switch(snake.direction) {
    case 'left':
      x--;
      break;
    case 'up':
      y--;
      break;
    case 'right':
      x++;
      break;
    case 'down':
      y++;
      break;
  }

  if(x < 0 || x > grid.cols - 1 || y < 0 || y > grid.rows - 1 || grid.getEntity(x, y) === 1) {
    return init();
  }

  if(grid.getEntity(x, y) === 2) {
    score += 100;
    createFood();
  } else {
    var tail = snake.remove();
    grid.setEntity(0, tail.x, tail.y);
  }

  grid.setEntity(1, x, y);
  snake.insert(x, y);

  render();
});

window.onload = function() {

  game.init();

};
