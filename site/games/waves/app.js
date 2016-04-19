window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 480,
    height: 320,
    fps: 30
  });

  var player;
  var playerSpeed = 10;

  game.on('preload', function() {
    console.log('preload...');
    game.preload([
      "assets/tiles.png",
      "assets/player.png",
      "assets/scene.json"
    ]);
  });

  game.on('start', function() {
    player = new game.sprite({
      image: game.images['assets/player.png'],
      x: game.width/2 - 16,
      y: game.height * .8,
      width: 32,
      height: 32,
      delay: 0,
      frames: 1,
      loop: true
    });
  });

  game.on('update', function() {

    if(game.controls.isPressedKey('ARROW_UP')) {
      player.y -= playerSpeed;
    }

    if(game.controls.isPressedKey('ARROW_RIGHT')) {
      player.x += playerSpeed;
    }

    if(game.controls.isPressedKey('ARROW_DOWN')) {
      player.y += playerSpeed;
    }

    if(game.controls.isPressedKey('ARROW_LEFT')) {
      player.x -= playerSpeed;
    }

    updateScene();

    player.update();
  });

  game.init();

  function updateScene() {
    new game.tile(game.data[0], game.images['assets/tiles.png']);
  }

};
