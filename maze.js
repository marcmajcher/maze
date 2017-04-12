'use strict';

// Maze object
function Maze(width, height) {
  this.width = width;
  this.height = height;
  this.grid = [];
  for (var x = 0; x < width; x++) {
    this.grid[x] = [];
    for (var y = 0; y < height; y++) {
      this.grid[x][y] = true;
    }
  }
}

Maze.prototype.getRandomNeighbor = function(point) {
  var dirs = [{
    x: -2,
    y: 0
  }, {
    x: 2,
    y: 0
  }, {
    x: 0,
    y: -2
  }, {
    x: 0,
    y: 2
  }];
  var neighbors = [];
  for (var i = 0; i < dirs.length; i++) {
    var newPoint = {
      x: point.x + dirs[i].x,
      y: point.y + dirs[i].y
    };
    if (newPoint.x > 0 && newPoint.y > 0 &&
      newPoint.x < this.width - 1 && newPoint.y < this.height - 1 &&
      this.grid[newPoint.x][newPoint.y]) {
      neighbors.push(newPoint);
    }
  }
  if (neighbors.length > 0) {
    return neighbors[Math.floor(Math.random() * neighbors.length)];
  }
  return false;
};

Maze.prototype.digCell = function(x, y) {
  this.grid[x][y] = false;
};

Maze.prototype.setStart = function(x, y) {
  this.digCell(x, y);
  this.start = {
    x: x,
    y: y
  };
};

Maze.prototype.setFinish = function(x, y) {
  this.digCell(x, y);
  this.finish = {
    x: x,
    y: y
  };
};

// draw that maze on the canvas

function renderMaze(maze, cellSize) {
  var canvas = document.getElementById('mazeCanvas');
  canvas.width = cellSize * maze.width;
  canvas.height = cellSize * maze.height;
  var ctx = canvas.getContext('2d');

  for (var x = 0; x < maze.width; x++) {
    for (var y = 0; y < maze.height; y++) {
      ctx.fillStyle = maze.grid[x][y] ?
        'rgb(0, 0, 0)' :
        'rgb(255, 255, 255)';

      ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
    }
  }
}
