window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 320,
    height: 192,
    background: '#000',
    fps: 60
  });

  var player;
  var playerSpeed = 2;

  var enemy;
  var enemySpeed = 1;
  var enemyDir = "down";

  var shots = [];

  var shotsSpeed = 1;
  var shotsDelay = 10;
  var shotsDelayCounter = 0;

  var explosions = [];

  game.on('preload', function() {
    game.preload([
      "assets/dungeon.json",
      "assets/dungeon.png",
      "assets/bg.png",
      "assets/player.png",
      "assets/enemy.png",
      "assets/shot.png",
      "assets/explosion.png"
    ]);
  });

  game.on('start', function() {
    player = new game.sprite({
      image: game.images['assets/player.png'],
      x: game.width/2 - 16,
      y: game.height/2 - 16,
      width: 16,
      height: 16,
      delay: 12,
      frames: 2,
      loop: true
    });

    enemy = new game.sprite({
      image: game.images['assets/enemy.png'],
      x: game.width - 64,
      y: game.height/2 - 40,
      width: 16,
      height: 16,
      delay: 6,
      frames: 2,
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

    if(game.controls.isPressedKey('SPACE')) {
      shot();
    }

    updateScene();

    edges();

    player.update();

    renderShots();

    moveEnemy();

    collisions();

    renderExplosion();

  });

  game.init();

  function updateScene() {
    game.ctx.drawImage(game.images['assets/bg.png'], 0, 0);
  }

  function moveEnemy() {
    if(enemy) {
      if(enemy.y > game.height/2 + 40) {
        enemyDir = 'up';
      } else if (enemy.y < game.height/2 - 40) {
        enemyDir = 'down';
      }


      if(enemyDir == 'down') {
        enemy.y += enemySpeed;
      } else if(enemyDir == 'up') {
        enemy.y -= enemySpeed;
      }

      enemy.update();
    }
  }

  function edges() {
    if(player.x < 32) {
      player.x = 32;
    }

    if(player.y < 32) {
      player.y = 32;
    }

    if(player.x > game.width - 32 - player.width) {
      player.x = game.width - 32 - player.width;
    }

    if(player.y > game.height - 32 - player.height) {
      player.y = game.height - 32 - player.height
    }
  }

  function shot() {
    if(shotsDelayCounter == shotsDelay) {
      var shot = new game.sprite({
        image: game.images['assets/shot.png'],
        x: player.x + player.width,
        y: player.y + (player.height/2),
        width: 8,
        height: 8,
        delay: 10,
        frames: 1,
        loop: true
      });
      shots.push(shot);
      shotsDelayCounter = 0;
    }
    shotsDelayCounter++;
  }

  function renderShots() {
    var i = shots.length;
    while(i--) {
      shots[i].x += shotsSpeed;
       if(shots[i].x > game.width) {
        shots.splice(i, 1);
      } else {
        shots[i].update();
      }
    }
  }

  function collisions() {
    var i = shots.length;
    if(shots.length > 0) {
      while(i--) {
        if(game.collision.isCollided(shots[i], enemy)) {
          var explosion = new game.sprite({
            image: game.images['assets/explosion.png'],
            x: enemy.x,
            y: enemy.y,
            width: 16,
            height: 16,
            delay: 0,
            frames: 4
          });
          explosions.push(explosion);
          enemy = null;
        }
      }
    }
  }

  function renderExplosion() {
    var i = explosions.length;
    if(i > 0) {
      while(i--) {
        if(explosions[i].animated) {
          explosions.splice(i, 1);
        } else {
          explosions[i].update();
        }
      }
    }
  }

};
