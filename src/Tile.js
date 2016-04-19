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
