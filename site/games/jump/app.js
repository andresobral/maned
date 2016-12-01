window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 320,
    height: 480,
    background: '#00ccff',
    fps: 30
  });

  var player;
  var playerSpeed = 10;

  var platform1;
  var platform2;
  var platform3;

  game.on('preload', function() {
    game.preload([
      "graphics/kangoroo.png",
      "graphics/platform.png"
    ]);
  });

  game.on('start', function() {
    player = new game.sprite({
      image: game.images['graphics/kangoroo.png'],
      x: game.width/2 - 16,
      y: 0,
      width: 32,
      height: 32,
      delay: 0,
      frames: 1,
      loop: true,
      vy: 10
    });

    platform1 = new game.sprite({
      image: game.images['graphics/platform.png'],
      x: 0,
      y: game.height - 128,
      width: 128,
      height: 32,
      delay: 0,
      frames: 1,
      loop: true
    });

    platform2 = new game.sprite({
      image: game.images['graphics/platform.png'],
      x: game.width - 128,
      y: game.height - 256,
      width: 128,
      height: 32,
      delay: 0,
      frames: 1,
      loop: true
    });

    platform3 = new game.sprite({
      image: game.images['graphics/platform.png'],
      x: 0,
      y: game.height - 384,
      width: 128,
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

    createScene();

    edges();

    game.gravity(player, 0.3, 0, game);

    platform1.update();

    platform2.update();

    platform3.update();

    player.update();

  });

  game.init();

  function createScene() {
    game.ctx.beginPath();
    game.ctx.arc(280, 40, 30, 0, 2 * Math.PI, false);
    game.ctx.fillStyle = 'yellow';
    game.ctx.fill();
  }

  function edges() {
    if(player.x < 0) {
      player.x = 0;
    }

    if(player.y < 0) {
      player.y = 0;
    }

    if(player.x > game.width - player.width) {
      player.x = game.width - player.width;
    }

    if(player.y > game.height - player.height) {
      player.y = game.height - player.height;
    }
  }

};
