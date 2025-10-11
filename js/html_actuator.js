function HTMLActuator(gameManager) {
  this.gameManager = gameManager;
  this.gameContainer = document.getElementById("game-container");
  this.hintContainer = document.getElementById("hint-container");

  this.setupGrid();
}

HTMLActuator.prototype.setupGrid = function () {
  var self = this;
  var cells = document.getElementsByClassName("grid-cell");
  for (var i = 0; i < cells.length; i++) {
    var cellElement = cells[i];
    cellElement.addEventListener("click", function (event) {
      var id = event.currentTarget.id;
      var parts = id.split('-');
      var x = parseInt(parts[1], 10);
      var y = parseInt(parts[2], 10);
      var position = {x: x, y: y};
      var tile = self.gameManager.grid.cellContent(position);

      if (tile) {
        var newValue = tile.value * 2;
        if (newValue > 16384) {
          newValue = 2;
        }
        tile.value = newValue;
      } else {
        var newTile = new Tile(position, 2);
        self.gameManager.grid.insertTile(newTile);
      }
      self.gameManager.actuate();
      self.gameManager.runHintCalculation();
    });

    cellElement.addEventListener("contextmenu", function (event) {
      event.preventDefault();
      var id = event.currentTarget.id;
      var parts = id.split('-');
      var x = parseInt(parts[1], 10);
      var y = parseInt(parts[2], 10);
      var position = {x: x, y: y};
      var tile = self.gameManager.grid.cellContent(position);

      if (tile) {
        var newValue = tile.value / 2;
        if (newValue < 2) {
          self.gameManager.grid.removeTile(tile);
        } else {
          tile.value = newValue;
        }
        self.gameManager.actuate();
        self.gameManager.runHintCalculation();
      }
    });
  }
};

HTMLActuator.prototype.actuate = function (grid, metadata) {
  var self = this;

  window.requestAnimationFrame(function () {
    grid.cells.forEach(function (column, x) {
      column.forEach(function (cell, y) {
        var cellElement = document.getElementById("cell-" + x + "-" + y);
        self.clearContainer(cellElement);
        if (cell) {
          var tileElement = document.createElement("div");
          tileElement.classList.add("tile");
          tileElement.classList.add("tile-" + cell.value);
          tileElement.textContent = cell.value;
          cellElement.appendChild(tileElement);
        }
      });
    });
  });
};

HTMLActuator.prototype.clearContainer = function (container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
};

function HTMLActuator(gameManager) {
  this.gameManager = gameManager;
  this.gameContainer = document.getElementById("game-container");

  this.setupGrid();
}

HTMLActuator.prototype.showHint = function(hint) {
  var hintArrow = document.getElementById("hint-arrow");
  var hintText = hint !== -1 ? ['↑','→','↓','←'][hint] : '';
  hintArrow.innerHTML = hintText;
};

HTMLActuator.prototype.restart = function () {
  // clear game over message
};
