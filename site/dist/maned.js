;(function() {

  function Preloader(images, _this, callback) {
    var imgObjs = {};
    var imgList = [];
    var counter = 0;
    var imagesLength = images.length;
    var pattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/;

    if(imagesLength == 0) {
      _this.preLoaded = true;
      callback();
    } else {
      for(var i = 0; i < imagesLength; i++) {

        if(_getAssetType(images[i]) == 'image') {
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
        } else {
          _loadData(images[i], function(data) {
            _this.data.push(data);
            counter++;
            if(counter === imagesLength) {
              _this.images = imgObjs;
              _this.preLoaded = true;
              callback();
            }
          });
        }
      }
    }
  }

  function _getAssetType(ext) {
    var pattern = /\.([0-9a-z]+)(?=[?#])|(\.)(?:[\w]+)$/;
    switch(ext.match(pattern)[0]) {
      case ".jpg":
      case ".jpeg":
      case ".png":
      case ".bmp":
        return "image";
      case ".json":
        return "data";
      default:
        return "other";
    }
  }

  function _loadData(path, callback) {
    var request;
    if(window.XMLHttpRequest) {
      request = new XMLHttpRequest();
    }

    if(!request) {
      console.log('Request failed...');
      return false;
    }

    request.onreadystatechange = function() {
      if(request.readyState === 4) {
        if(request.status === 200) {
          callback(request.responseText);
        } else {
          console.log('Something went wrong!');
        }
      }
    };
    request.open('GET', path);
    request.send();
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

  Collision.overlap = function(minA, maxA, minB, maxB) {
    return minB <= maxA && minA <= maxB;
  };

  Collision.isCollided = function(a, b) {
    return this.overlap(a.x, a.x + a.width, b.x, b.x + b.width) &&
      this.overlap(a.y, a.y + a.height, b.y, b.y + b.height);
  };

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

;(function() {

  function Tile(data, tileset) {
    this.data = JSON.parse(data);
    this.tileset = tileset;

    this.create();
  }

  Tile.prototype.create = function() {
    var cols = this.data.layers[0].width;
    var rows = this.data.layers[0].height;
    var index = 0;
    for(var i = 0; i < rows; i++) {
      for(var j = 0; j < cols; j++) {
        _drawTile(
          this,
          this.tileset,
          this.data.layers[0].data[index],
          32,
          32,
          j * 32,
          i * 32
        );
        index++;
      }
    }
  };

  function _drawTile(_this, img, index, width, height, x, y) {
    var pos = _getPosition(_this, index);
    var sx = pos.x * width;
    var sy = pos.y * height;
    CTX.drawImage(
      img,
      sx,
      sy,
      width,
      height,
      x,
      y,
      width,
      height
    );
  }

  function _getPosition(_this, index) {
    var cols = _this.data.tilesets[0].imagewidth / _this.data.tilewidth;
    var rows = _this.data.tilesets[0].imageheight / _this.data.tileheight;
    var y = Math.floor(index/cols) + 1;
    var pos = {
      x: (index - ((y - 1) * cols)) - 1,
      y: y -1
    };
    return pos;
  }

  window.Tile = Tile;

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
