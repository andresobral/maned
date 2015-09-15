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
