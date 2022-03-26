var result = document.getElementById('result');
var product_name = document.getElementById('product_name');

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
        const sourceWidth = width;
        const sourceHeight = height;
        const displayX = 0;
        const displayY = 0;
        const displayWidth = width;
        const displayHeight = height;
        ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, displayX, displayY, displayWidth, displayHeight);
    }
}

function inputHandler(event, element,) {
  this.event = event;
  this.element = element;
  const firstWords = document.getElementById("firstWords").value;
  const secondWords = document.getElementById("secondWords").value;

  element.innerHTML =  firstWords + " " + event.target.value + " " + secondWords;
}

function copyDivToClipboard() {
  const range = document.createRange();
  range.selectNode(result);
  window.getSelection().removeAllRanges();
  window.getSelection().addRange(range); 
  document.execCommand("copy");
  window.getSelection().removeAllRanges();
  result.innerHTML = "";
  source.value = "";
}

product_name.addEventListener('input', function(e){
  inputHandler(e, result);
});
product_name.addEventListener('change', function(e){
  inputHandler(e, result);
});
product_name.addEventListener('propertychange', function(e){
  inputHandler(e, result);
});

cropImg('./2.png', 400, 970);
