;(function() {

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

  Sprite.prototype.render = function() {
    _renderImage(this, 0);
  };

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

  window.Sprite = Sprite;

})();
