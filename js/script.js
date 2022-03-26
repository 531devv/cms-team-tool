var result = document.getElementById('result');
var source = document.getElementById('product_name');
const first = "first words";
const second = "second words";

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

function inputHandler(event, element, firstWords, secondWords) {
  this.event = event;
  this.element = element;
  this.firstWords = firstWords;
  this.secondWords = secondWords;

  element.innerHTML = firstWords + " " + event.target.value + " " + secondWords;
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

source.addEventListener('input', function(e){
  inputHandler(e, result, first, second);
});
source.addEventListener('change', function(e){
  inputHandler(e, result, first, second);
});
source.addEventListener('propertychange', function(e){
  inputHandler(e, result, first, second);
});

cropImg('./2.png', 400, 970);
