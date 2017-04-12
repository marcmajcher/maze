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
  if (point.y < 28 && this.grid[point.x][point.y + 1]) {
    return {
      x: point.x,
      y: point.y + 1
    };

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

// called on page load

function mazeIt() {
  var width = 100;
  var height = 80;
  var cellSize = 10;

  var maze = new Maze(width, height);
  maze.setStart(10, 0);
  maze.setFinish(width - 12, height - 1);

  digMaze(maze);
  renderMaze(maze, cellSize);
}

// dig the maze

function digMaze(maze) {
  var stack = [maze.start];

  while (stack.length > 0) {
    var current = stack.pop();
    var next;
    while (next = maze.getRandomNeighbor(current)) {
      stack.push(next);
      maze.grid[next.x][next.y] = false;
      current = next;
    }
  }
}

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
