/** @global */
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

Maned.prototype.init = function() {
  if(this.preLoaded) {
    _init(this);
  } else {
    if(this.events['preload']) {
      this.events['preload']();
    }
  }
};

Maned.prototype.render = function(obj) {
  this.ctx.drawImage(obj.image, obj.x, obj.y, obj.width, obj.height);
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

