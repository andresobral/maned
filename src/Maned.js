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
    this.data = [];
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

  Maned.prototype.tile = window.Tile;

  Maned.prototype.gravity = window.Gravity;

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
