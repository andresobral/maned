window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 480,
    height: 320,
    fps: 30
  });

  var player;
  var playerSpeed = 10;

  var coins = [];
  var score = 0;

  game.on('preload', function() {
    console.log('preload...');
    game.preload([
      "assets/tiles.png",
      "assets/player.png",
      "assets/coin.png",
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

    checkCollisions();

    checkCoins();

    player.update();

    updateScore();
  });

  game.init();

  function updateScene() {
    new game.tile(game.data[0], game.images['assets/tiles.png']);
  }

  function checkCoins() {
    var coinLength = coins.length;
    if(coinLength == 0) {
      var coinCounter = Math.round(Math.random() * (3 - 1) + 1);
      for(var i = 0; i < coinCounter; i++) {
        var coin = new game.sprite({
          image: game.images['assets/coin.png'],
          x: Math.round(Math.random() * (game.width - 1) + 1),
          y: Math.round(Math.random() * (game.height - 1) + 1),
          width: 16,
          height: 16,
          delay: 0,
          frames: 1,
          loop: true
        });
        coins.push(coin);
      }
    } else {
      for(var i = 0; i < coinLength; i++) {
        coins[i].update();
      }
    }
  }

  function checkCollisions() {
    var i = coins.length;

    if(i > 0) {
      while(i--) {
        if(game.collision.isCollided(player, coins[i])) {
          coins.splice(i, 1);
          score += 100;
        }
      }
    }
  }

  function updateScore() {
    game.text(score, game.width/2, 50, {
      font: "22px Arial",
      color: "#fff",
      textAlign: "center"
    });
  }

};
