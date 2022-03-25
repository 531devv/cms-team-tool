function cropImg(imageSrc, width, height){
    this.src = imageSrc;
    this.width = width;
    this.height = height;
    
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
    ctx.canvas.width  = width;
    ctx.canvas.height = height;
    var image = new Image();
    image.src = imageSrc; 
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    image.onload = function(){
        var sourceX;
        var sourceY;
        if(image.width != width) {
          sourceX = (image.width - width) / 2;
        } else {
          sourceX = 0;
        }
        if(!image.height != height) {
          sourceY = (image.width - height) / 2;
        } else {
          sourceY = 0;
        }
        var sourceWidth = width;
        var sourceHeight = height;
        var displayX = 0;
        var displayY = 0;
        var displayWidth = width;
        var displayHeight = height;
        ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, displayX, displayY, displayWidth, displayHeight);
        var img = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");  // here is the most important part because if you dont replace you will get a DOM 18 exception.
        //window.location.href=img; // it will save locally
    }
  }


cropImg('./2.png', 400, 970);
