window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 480,
    height: 320,
    fps: 30
  });

  game.on('preload', function() {
    console.log('preload...');
    game.preload([
      "assets/tiles.png",
      "assets/scene.json"
    ]);
  });

  game.on('start', function() {
    // console.log(game.data[0]);
    // updateScene();
  });

  game.on('update', function() {
    updateScene();
  });

  // game.init();

  function updateScene() {
    new game.tile(game.data[0], game.images['assets/tiles.png']);
  }

};
