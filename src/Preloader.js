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
