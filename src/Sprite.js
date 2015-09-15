/**
* Sprite management class
* @class
* @constructor
* @param {Object} obj - Sprite configuration object
* @param {HTMLDOMElement} obj.img - DOM element of the image that is taken from the Maned.images array in the preload stage of the game
* @param {integer} obj.x - Sprite x position
* @param {integer} obj.y - Sprite y position
* @param {integer} obj.width - Sprite width
* @param {integer} obj.height - Sprite height
* @param {integer} obj.delay - Value o delay the animation
* @param {integer} obj.frames - Number of sprite frames
* @param {boolean} obj.loop - Infinity loop the animation
*/
function Sprite(obj) {
  this.image = obj.image;
  this.x = obj.x;
  this.y = obj.y;
  this.width = obj.width;
  this.height = obj.height;
  this.delay = obj.delay;
  this.loop = obj.lopp || false;
  this.delayCounter = 0;
  this.frames = obj.frames;
  this.frameIndex = 0;
  this.animated = false;
}

/**
* Render the sprite without animation
*
* @function
*/
Sprite.prototype.render = function() {
  _renderImage(this, 0);
};

/**
* Render the sprite in the game loop updating the animation
*
* @function
*/
Sprite.prototype.update = function() {
  if(this.frameIndex === (this.frames - 1)) {
    if(!this.loop) {
      this.animated = true;
    }
    this.frameIndex = 0;
  } else {
    if(this.delayCounter === this.delay) {
      this.frameIndex++;
      this.delayCounter = 0;
    }
  }


  var sx = this.frameIndex * this.width;

   _renderImage(this, sx);

  this.delayCounter++;

};

function _renderImage(_this, sx) {
  CTX.drawImage(
    _this.image,
    sx,
    0,
    _this.width,
    _this.height,
    _this.x,
    _this.y,
    _this.width,
    _this.height
  );
}
