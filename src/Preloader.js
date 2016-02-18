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
