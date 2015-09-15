function Preloader(images, _this, callback) {
  var imgObjs = {};
  var imgList = [];
  var counter = 0;
  var imagesLength = images.length;

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

var pushedKeys = {};

var keys = {
  SPACE: 32,
  ARROW_LEFT: 37,
  ARROW_UP: 38,
  ARROW_RIGHT: 39,
  ARROW_DOWN: 40
};

/**
* Controls class. It maps the keyboard and create functions and events from the pressed keys
* @class
* @constructor
*/
function Controls() {}

/**
* Checks if any key is pressed
*
* @function
* @param {string} keyName - Keyboard key name thats is mapped
*/
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

/**
* General utilities class
* @class
* @constructor
*/
function Util() {}

/**
* Prints text in the game screen
*
* @function
* @param {string} string - The string to be printed
* @param {integer} x - Text x position
* @param {integer} y - Text y position
* @param {Object} obj - Text sytles object
* @param {string} obj.font - String with font size and font family like "30px arial"
* @param {string} obj.color - Hexadecimal color code
* @param {string} obj.textAlign - text alignment
*/
Util.text = function(string, x, y, obj) {
  CTX.font = obj.font;
  CTX.fillStyle = obj.color;
  if(obj.textAlign) CTX.textAlign = obj.textAlign;
  CTX.fillText(string, x, y);
}

var CTX;

/**
* Engine main class
* @class
* @constructor
* @param {Object} obj - Game configuration object
* @param {string} obj.className - Canvas element class name
* @param {integer} obj.width - Game screen width
* @param {integer} obj.height - Game screen height
* @param {string} obj.background - Game background color in hexadecimal
*/
function Maned(obj) {
  this.canvas = document.querySelector(obj.className);
  this.ctx = this.canvas.getContext('2d');
  CTX = this.ctx;
  this.width = obj.width;
  this.height = obj.height;
  this.background = obj.background || '#fff';
  this.statuses = {
    gameTime: 0
  };
  this.states = {};
  this.events = {};
  this.lastTick;
  this.dt;
  this.images = [];
  this.preLoaded = false;

  this.canvas.focus();
}

/**
* Starts the game
*
* @function
*/
Maned.prototype.init = function() {
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

/**
* Run function on a determinated game event
*
* @function
* @param {string} customEvent - Event name. There are three possible events "preload", "start" and "update"
* @param {Requester~requestCallback} callback - Callback that handles the event
*/
Maned.prototype.on = function(customEvent, callback) {
  if(typeof callback === 'function') {
    this.events[customEvent] = callback;
  }
};

Maned.prototype.clearCanvas = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
};

/**
* Preload assets to be used in the game
*
* @function
* @oaram {array} imgArray - Array of image paths to be loaded
*/
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

  var currentTick = Date.now();
  var dt = (currentTick - _this.lastTick) / 1000.0;

  window.requestAnimationFrame(function() {
    _gameLoop(_this);
  });

  _this.clearCanvas();

  _renderBackground(_this);

  if(_this.events['update']) {
    _this.events['update']();
  }

}

function _renderBackground(_this) {
  _this.ctx.fillStyle = '#000';
  _this.ctx.fillRect(0, 0, _this.width, _this.height);
}

