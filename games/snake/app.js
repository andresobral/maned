window.onload = function() {

  var game = new Maned({
    className: '.engine',
    width: 600,
    height: 400,
    background: '#fff'
  });

  game.on('preload', function() {
    console.log('Preload...');
    game.preload([]);
  });

  game.on('start', function() {
    console.log('Start...');
  });

  game.on('update', function() {
    // console.log(i + 1);
  });

  game.init();

};
