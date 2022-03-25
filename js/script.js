function cropImg(){
    const canvas = document.getElementById('canvas');
    const ctx = canvas.getContext('2d');
  
    var image = new Image();
    image.src = "https://images.unsplash.com/photo-1593642634443-44adaa06623a?ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=725&q=80"; 
    //drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
    image.onload = function(){
      ctx.drawImage(image, 0, 0, 500, 300, 60, 60, 500, 300);
    }
  }
  
  cropImg();