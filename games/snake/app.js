var game;
var grid;
var snake;

var nodeSize = 20;

function Grid(direction, cols, rows) {
  this.direction = direction;
  this.rows = rows;
  this.cols = cols;
  this.arr = [];

  this.init();
}

Grid.prototype.init = function() {
  console.log('Grid inited...');
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
      }

      game.ctx.fillRect(i * nodeSize, j * nodeSize, nodeSize, nodeSize);
    }
  }
}

game = new Maned({
  className: '.engine',
  width: 400,
  height: 320,
  background: '#fff',
  fps: 5
});

game.on('preload', function() {
  game.preload([]);
});

game.on('start', function() {
  console.log('start...');
  grid = new Grid('right', 20, 16);
  snake = new Snake('right', 10, 8);
  grid.setEntity(1, 10, 8);

  console.log(grid);
});

game.on('update', function() {
  // console.log('update...');
  render();
});

window.onload = function() {

  game.init();

};
