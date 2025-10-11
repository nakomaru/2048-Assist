animationDelay = 100;
minSearchTime = 100;

// Wait till the browser is ready to render the game (avoids glitches)
window.requestAnimationFrame(function () {
  var manager = new GameManager(4, KeyboardInputManager);
  var actuator = new HTMLActuator(manager);
  manager.setActuator(actuator);
  manager.start();
});
