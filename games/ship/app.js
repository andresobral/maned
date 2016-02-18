window.onload = function() {

  //Game instace
  var game = new Maned({
    className: '.engine',
    width: 600,
    height: 400,
    background: '#000'
  });

  var images = [];

  //Game status
  var gameOver = false;
  var win = false;
  var score = 0;

  //Player Settings
  var player;
  var playerSpeed = 4;

  //Game collections
  var shots = [];
  var enemies = [];
  var enemyShots = [];
  var explosions = [];

  //guns
  var item;
  var gun = false;
  var purpleShots = [];
  var itemCreated = false;

  //Red explodion
  var redExplosion;

  //Inner control variables

  //shots
  var shotsSpeed = 6;
  var shotsDelay = 10;
  var shotsDelayCounter = 0;

  //enemy
  var enemySpeed = 1;

  //enemy waves
  var enemyWaves = 15;
  var enemyWavesCounter = 1;
  var enemyWavesDelay = 480;
  var enemyWavesDelayCounter = 0;

  //enemy shot
  var enemyShotSpeed = 2;
  var enemyShotDelay = 240;
  var enemyShotCounter = 0;
  var enemyShotAnimationDelay = 40;
  var enemyShotAnimationDelayCounter = 0;

  //game states
  game.on('preload', function() {
    game.preload([
      "graphics/enemy.png",
      "graphics/ship.png",
      "graphics/shot.png",
      "graphics/enemy-shot.png",
      "graphics/explosion.png",
      "graphics/explosion-red.png",
      "graphics/shot-purple.png",
      "graphics/item.png"
    ]);
  });

  game.on('start', function() {

    player = new game.sprite({
      image: game.images['graphics/ship.png'],
      x: 50,
      y: game.height/2 - 16,
      width: 32,
      height: 17,
      delay: 6,
      frames: 4,
      loop: true
    });

    var firstEnemy = new game.sprite({
      image: game.images['graphics/enemy.png'],
      x: game.width + 50,
      y: game.height/2 - 16,
      width: 32,
      height: 32,
      delay: 6,
      frames: 4,
      loop: true
    });

    enemies.push(firstEnemy);

  });

  game.on('update', function() {

    if(!gameOver && !win) {

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
        createShot();
      }

      if(game.controls.isPressedKey('S')) {
        console.log(
          "summary" +
          "\n-------" +
          "\nshots: " + shots.length +
          "\npurple shots: " + purpleShots.length +
          "\nenemies: " + enemies.length +
          "\nenemy shots: " + enemyShots.length
        );
      }

      playerEdges();

      if(redExplosion) {
        if(redExplosion.animated) {
          player = {};
          gameOver = true;
        } else {
          redExplosion.update();
        }
      } else {
        player.update();
      }

      createEnemies();

      checkItems();

      renderEnemies();

      renderBullets();

      if(gun) renderPurpleBullets();

      renderEnemyBullets();

      bulletsEnemyCollision();

      if(gun) purpleBulletsEnemyCollision();

      bulletsPlayerCollision();

      enemiesPlayerCollision();

      renderExplosions();

      updateScore();

    } else if(win) {
      winScreen();
    } else {
      gameOverScreen();
    }

  });

  game.init();

  // Game functions
  function createShot() {
    if(shotsDelayCounter == shotsDelay) {
      var shot = new game.sprite({
        image: game.images['graphics/shot.png'],
        x: player.x + player.width,
        y: player.y + (player.height/2),
        width: 12,
        height: 7,
        delay: 10,
        frames: 1,
        loop: true
      });
      shots.push(shot);
      if(gun) {
        var purpleShot = new game.sprite({
          image: game.images['graphics/shot-purple.png'],
          x: player.x,
          y: player.y + (player.height/2),
          width: 12,
          height: 7,
          delay: 10,
          frames: 1,
          loop: true
        });
        purpleShots.push(purpleShot);
      }
      shotsDelayCounter = 0;
    }
    shotsDelayCounter++;
  }

  function checkItems() {
    if(enemyWavesCounter == 8 && !itemCreated) {
        item = new game.sprite({
        image: game.images['graphics/item.png'],
        x: game.width + 12,
        y: 70,
        width: 12,
        height: 32,
        delay: 10,
        frames: 1,
        loop: true
      });
      itemCreated = true;
    } else if(itemCreated && !gun) {
      item.x -= 2;
      item.update();
      if(game.collision.isCollided(player, item)) {
        itemCreated = false;
        item = null;
        gun = true;
      }
    }
  }

  function createEnemies() {
    if(enemyWavesDelayCounter == enemyWavesDelay) {
      enemyWavesDelayCounter = 0;
      var enemySize = enemyWavesCounter * 4;
      for(var i = 0; i < enemySize; i++) {
        var enemy = new game.sprite({
          image: game.images['graphics/enemy.png'],
          x: game.width + (Math.floor((Math.random() * 181) + 50)),
          y: (Math.random() *  (game.height - 92)) + 60,
          width: 32,
          height: 32,
          delay: 6,
          frames: 4,
          loop: true
        });
        enemies.push(enemy);
      }

      enemyWavesCounter++;
    }
    enemyWavesDelayCounter++;
  }

  function renderBullets() {
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

  function renderPurpleBullets() {
    var i = purpleShots.length;
    while(i--) {
      purpleShots[i].x -= shotsSpeed;
      if(purpleShots[i].x < 0) {
        purpleShots.splice(i, 1);
      } else {
        purpleShots[i].update();
      }
    }
  }

  function renderEnemies() {
    var i = enemies.length;
    while(i--) {
      enemies[i].x -= enemySpeed;
      if(enemies[i].x < -42) {
        enemies.splice(i, 1);
      } else {
        enemies[i].update();
        if(enemyShotCounter == enemyShotDelay) {
          var enemyShot = new game.sprite({
            image: game.images['graphics/enemy-shot.png'],
            x: enemies[i].x,
            y: enemies[i].y + (enemies[i].height/2),
            width: 8,
            height: 8,
            delay: 10,
            frames:1,
            loop: true
          });
          enemyShots.push(enemyShot);
          enemyShotCounter = 0;
        }
        enemyShotCounter ++;
      }
    }
  }

  function renderEnemyBullets() {
    var i = enemyShots.length;
    while(i--) {
      enemyShots[i].x -= 2;
      if(enemyShots[i].x < -18) {
        enemyShots.splice(i, 1);
      } else {
        enemyShots[i].update();
      }
    }
  }

  function renderExplosions() {
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

  function enemiesPlayerCollision() {
    var i = enemies.length;

    if(i > 0) {
      while(i--) {
        if(game.collision.isCollided(enemies[i], player)) {
          redExplosion = new game.sprite({
            image: game.images['graphics/explosion-red.png'],
            x: player.x,
            y: player.y,
            width: 32,
            height: 32,
            delay: 5,
            frames: 6
          });
          enemies.splice(i, 1);
        }
      }
    }
  }

  function bulletsEnemyCollision() {
    var i = enemies.length;

    if(i > 0 && shots.length > 0) {
      while(i--) {
        var j = shots.length;
        while(j--) {
          if(game.collision.isCollided(shots[j], enemies[i])) {
            var explosion = new game.sprite({
              image: game.images['graphics/explosion.png'],
              x: enemies[i].x,
              y: enemies[i].y,
              width: 32,
              height: 32,
              delay: 5,
              frames: 6
            });
            explosions.push(explosion);
            enemies.splice(i, 1);
            shots.splice(j, 1);
            score += 50;
          }
        }
      }
    }
  }

  function purpleBulletsEnemyCollision() {
    var i = enemies.length;

    if(i > 0 && purpleShots.length > 0) {
      while(i--) {
        var j = purpleShots.length;
        while(j--) {
          if(game.collision.isCollided(purpleShots[j], enemies[i])) {
            var explosion = new game.sprite({
              image: game.images['graphics/explosion.png'],
              x: enemies[i].x,
              y: enemies[i].y,
              width: 32,
              height: 32,
              delay: 5,
              frames: 6
            });
            explosions.push(explosion);
            enemies.splice(i, 1);
            purpleShots.splice(j, 1);
            score += 50;
          }
        }
      }
    }
  }

  function bulletsPlayerCollision() {
    var i = enemyShots.length;

    if(i > 0) {
      while(i--) {
        if(game.collision.isCollided(enemyShots[i], player)) {
          enemyShots.splice(i, 1);
          redExplosion = new game.sprite({
            image: game.images['graphics/explosion-red.png'],
            x: player.x,
            y: player.y,
            width: 32,
            height: 32,
            delay: 5,
            frames: 6
          });
        }
      }
    }
  }

  function playerEdges() {
    if(player.x < 0) {
      player.x = 0;
    }

    if(player.y < 60) {
      player.y = 60;
    }

    if(player.x > game.width - player.width) {
      player.x = game.width - player.width;
    }

    if(player.y > game.height - player.height) {
      player.y = game.height - player.height
    }
  }

  function updateScore() {
    game.text(score, game.width/2, 50, {
      font: "30px Arial",
      color: "#fff",
      textAlign: "center"
    });
  }

  function gameOverScreen() {
    game.text("Game Over", game.width/2, game.height/2, {
      font: "30px Arial",
      color: "#fff",
      textAlign: "center"
    });
    game.text(score, game.width/2, game.height/2 + 45, {
      font: "24px Arial",
      color: "#fff",
      textAlign: "center"
    });
  }

  function winScreen() {
    game.text("Vitória", game.width/2, game.height/2, {
      font: "30px Arial",
      color: "#fff",
      textAlign: "center"
    });
    game.text(score, game.width/2, game.height/2 + 45, {
      font: "24px Arial",
      color: "#fff",
      textAlign: "center"
    });
  }

}
