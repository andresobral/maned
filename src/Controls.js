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
