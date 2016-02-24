;(function() {

  function Preloader(images, _this, callback) {
    var imgObjs = {};
    var imgList = [];
    var counter = 0;
    var imagesLength = images.length;

    if(imagesLength == 0) {
      _this.preLoaded = true;
      callback();
    } else {
      for(var i = 0; i < imagesLength; i++) {

        var img = new Image();

        img.onload = function() {
          counter++;
          if(counter === imagesLength) {
            _this.images = imgObjs;
            _this.preLoaded = true;
            callback();
          }
        };

        img.src = images[i];
        imgObjs[images[i]] = img;

      }
    }
  }

  window.Preloader = Preloader;

})();

;(function() {

  var pushedKeys = {};

  var keys = {
    SPACE: 32,
    ARROW_LEFT: 37,
    ARROW_UP: 38,
    ARROW_RIGHT: 39,
    ARROW_DOWN: 40
  };

  function Controls() {}

  Controls.isPressedKey = function(keyName) {
    return pushedKeys[keyName];
  };

  function _getKeyByValue(value) {
    for(var prop in keys) {
      if(keys.hasOwnProperty(prop)) {
        if(keys[prop] === value) {
          return prop;
        }
      }
    }
    if (String.fromCharCode(value) != ' ') {
      return String.fromCharCode(value);
    }
  }

  function _setKey(value, status) {
    var key = _getKeyByValue(value);
    if(key) {
      pushedKeys[key] = status;
    }
  }

  //Events
  window.addEventListener('keydown', function(e) {
    _setKey(e.keyCode, true);
  });

  window.addEventListener('keyup', function(e) {
    _setKey(e.keyCode, false);
  });

  window.addEventListener('blur', function(e) {
      pushedKeys = {};
  });

  window.Controls = Controls;

})();

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

;(function() {

  function Collision() {}

  Collision.isCollided = function(o1, o2) {
    return o1.x + o1.width >= o2.x && o1.x <= o2.x + o2.width && o1.y >= o2.y && o1.y <= o2.y + o2.height;
  }

  window.Collision = Collision;

})();

;(function() {

  function Util() {}

  Util.text = function(string, x, y, obj) {
    CTX.font = obj.font;
    CTX.fillStyle = obj.color;
    if(obj.textAlign) CTX.textAlign = obj.textAlign;
    CTX.fillText(string, x, y);
  }

  window.Util = Util;

})();

var CTX;

;(function() {

  var fpsInterval, startTime, now, then, elapsedTime;

  function Maned(obj) {
    this.canvas = document.querySelector(obj.className);
    this.ctx = this.canvas.getContext('2d');
    CTX = this.ctx;
    this.width = obj.width;
    this.height = obj.height;
    this.background = obj.background || '#fff';
    this.images = [];
    this.events = {};
    this.preLoaded = false;
    this.fps = obj.fps;

    this.canvas.focus();
  }

  Maned.prototype.init = function() {

    fpsInterval = 1000 / this.fps;
    then = Date.now();
    startTime = then;

    if(this.preLoaded) {
      _init(this);
    } else {
      if(this.events['preload']) {
        this.events['preload']();
      }
    }
  };

  Maned.prototype.bg = function() {
    _renderBackground(this);
  };

  Maned.prototype.on = function(customEvent, callback) {
    if(typeof callback === 'function') {
      this.events[customEvent] = callback;
    }
  };

  Maned.prototype.clearCanvas = function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  };

  Maned.prototype.preload = function(imgArray) {
    var self = this;
    Preloader(imgArray, this, function() {
       self.init();
    });
  };

  Maned.prototype.controls = window.Controls;

  Maned.prototype.sprite = window.Sprite;

  Maned.prototype.collision = window.Collision;

  Maned.prototype.text = window.Util.text;

  //Private methods

  function _init(_this) {
    _renderBackground(_this);

    if(_this.events['start']) {
      _this.events['start']();
    }

    _gameLoop(_this);
  }

  function _gameLoop(_this) {

    window.requestAnimationFrame(function() {
      _gameLoop(_this);
    });

    now = Date.now();
    elapsedTime = now - then;

    if(elapsedTime > fpsInterval) {

      then = now - (elapsedTime % fpsInterval);

      _this.clearCanvas();

      _renderBackground(_this);

      if(_this.events['update']) {
        _this.events['update']();
      }

    }

  }

  function _renderBackground(_this) {
    _this.ctx.fillStyle = _this.background;
    _this.ctx.fillRect(0, 0, _this.width, _this.height);
  }

  window.Maned = Maned;
  window.CTX = CTX;

})();
