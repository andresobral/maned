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
