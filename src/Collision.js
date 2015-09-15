/**
* Collision Class
* @class
* @constructor
*/
function Collision() {}

/**
* Detect collision between two sprites in the game
*
* @function
* @param {Object} o1 - Sprite object
* @param {Object} o2 - Sprite object
*/
Collision.isCollided = function(o1, o2) {
  return o1.x + o1.width >= o2.x && o1.x <= o2.x + o2.width && o1.y >= o2.y && o1.y <= o2.y + o2.height;
}
