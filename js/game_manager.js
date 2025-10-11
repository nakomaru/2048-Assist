function GameManager(size, InputManager) {
  this.size         = size; // Size of the grid
  this.inputManager = new InputManager;

  this.manualMode   = true;
  this.hintTimeout  = null;

  this.inputManager.on("move", this.move.bind(this));
  this.inputManager.on("restart", this.restart.bind(this));
}

GameManager.prototype.setActuator = function (actuator) {
  this.actuator = actuator;
};

GameManager.prototype.start = function () {
  this.setup();
};

// Restart the game
GameManager.prototype.restart = function () {
  this.actuator.restart();
  this.setup();
};

// Set up the game
GameManager.prototype.setup = function () {
  this.grid         = new Grid(this.size);

  this.ai           = new AI(this.grid);

  this.score        = 0;
  this.over         = false;
  this.won          = false;

  // Update the actuator
  this.actuate();
  this.runHintCalculation();
};


// Sends the updated grid to the actuator
GameManager.prototype.actuate = function () {
  this.actuator.showHint(-1);
  this.actuator.actuate(this.grid, {
    score: this.score,
    over:  this.over,
    won:   this.won
  });
};

GameManager.prototype.runHintCalculation = function () {
  if (this.hintTimeout) {
    clearTimeout(this.hintTimeout);
  }

  var self = this;
  this.hintTimeout = setTimeout(function() {
    var best = self.ai.getBest();
    if (best) {
      self.actuator.showHint(best.move);
    } else {
      self.actuator.showHint(-1);
    }
  }, 100);
}

// makes a given move and updates state
GameManager.prototype.move = function(direction) {
  this.moveAndAutoplay(direction);
}

GameManager.prototype.moveAndAutoplay = function(direction) {
  var result = this.grid.move(direction);
  this.score += result.score;

  if (!result.won) {
    if (result.moved) {
      var availableCells = this.grid.availableCells();
      if (availableCells.length == 1) {
        this.grid.addSpecificTile(availableCells[0], 2);
        this.grid.playerTurn = true;
        this.runHintCalculation();
      } else if (!this.manualMode) {
        this.grid.computerMove();
      } else {
        this.grid.playerTurn = true;
      }
    }
  } else {
    this.won = true;
  }

  //console.log(this.grid.valueSum());

  if (!this.grid.movesAvailable()) {
    this.over = true; // Game over!
  }

  this.actuate();
}
