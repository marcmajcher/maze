'use strict';

// dig the maze with recursive backtracking
// called on page load

function mazeIt() {
  var width = 101;
  var height = 81;
  var cellSize = 10;

  var maze = new Maze(width, height);
  maze.setStart(10, 0);
  maze.setFinish(width - 11, height - 1);

  digMaze(maze);
  renderMaze(maze, cellSize);
}

function digMaze(maze) {
  maze.digCell(maze.finish.x, maze.finish.y - 1);
  var stack = [maze.start];

  while (stack.length > 0) {
    var current = stack.pop();
    var next;
    while (next = maze.getRandomNeighbor(current)) {
      stack.push(next);
      maze.grid[next.x][next.y] = false;
      maze.grid[(current.x + next.x) / 2][(current.y + next.y) / 2] = false; //hack
      current = next;
    }
  }
}
