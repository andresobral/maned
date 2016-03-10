;(function() {

  function Collision() {}

  Collision.overlap = function(minA, maxA, minB, maxB) {
    return minB <= maxA && minA <= maxB;
  };

  Collision.isCollided = function(a, b) {
    return this.overlap(a.x, a.x + a.width, b.x, b.x + b.width) &&
      this.overlap(a.y, a.y + a.height, b.y, b.y + b.height);
  };

  window.Collision = Collision;

})();
