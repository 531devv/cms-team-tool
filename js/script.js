var result = document.getElementById('result');
var product_name = document.getElementById('product_name');

function cropImg(imageSrc, width, height){
    this.src = imageSrc;
    this.width = width;
    this.height = height;
    console.log('cropImg');
    var canvasParent = document.getElementById('canvas');
    var canvasChild = document.createElement('canvas');
    canvasChild.id = Math.random() * 10;
    canvasParent.appendChild(canvasChild);
    const canvas = document.getElementById(canvasChild.id);
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
        var link = document.createElement('a');
        link.download = 'filename';
        if(document.getElementById('imageFileType').value == 'png') {
          link.href = document.getElementById(canvasChild.id).toDataURL();
        } 
        if(document.getElementById('imageFileType').value == 'jpg') {
          link.href = document.getElementById(canvasChild.id).toDataURL('image/jpeg', 0.7);
        }
        link.click();
        deleteChild(canvasParent);
    }
}

function deleteChild(e) {
  //e.firstElementChild can be used.
  var child = e.lastElementChild; 
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
  }
}

function inputHandler(event, element) {
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
  product_name.value = "";
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

window.onload = function(){
        
  //Check File API support
  if(window.File && window.FileList && window.FileReader)
  {
      var filesInput = document.getElementById("files");
      
      filesInput.addEventListener("change", function(event){
          
          var files = event.target.files;
          var output = document.getElementById("images_result");
          
          for(var i = 0; i< files.length; i++)
          {
              var file = files[i];
              
              //Only pics
              if(!file.type.match('image'))
                continue;
              
              var picReader = new FileReader();
              
              picReader.addEventListener("load",function(event){
                  
                  var picFile = event.target;
                  const imageWidth = document.getElementById('imageWidth').value;
                  const imageHeight = document.getElementById('imageHeight').value;
                  cropImg(picFile.result, imageWidth, imageHeight);
                  document.getElementById('files').value = '';   
                  picReader = null;
                  picFule = null;
              });
              
               //Read the image
              picReader.readAsDataURL(file);
          }                               
         
      });
  }
  else
  {
      console.log("Your browser does not support File API");
  }
}
