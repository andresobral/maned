;(function() {

  function Gravity(obj, amount, bounce, game) {
    obj.vy += amount;
    obj.y += obj.vy;


    if(obj.y > game.height - obj.height) {
      obj.y = game.height - obj.height;
    }
  }

  window.Gravity = Gravity;

})();
