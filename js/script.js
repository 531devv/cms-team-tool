var result = document.getElementById('result');
var productName = document.getElementById('productName');
var templateOption = document.getElementById('fileTemplateOptions');
var imageWidth = document.getElementById('imageWidth');
var imageHeight = document.getElementById('imageHeight');
var imageEditOptions = document.getElementById('imageEditOptions');
var imageFileType = document.getElementById('imageFileType');


function cropImg(imageSrc, width, height){
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
        ctx.drawImage(image, 0, 0, width, height);
        if(imageEditOptions.value === 'resizeAndCrop') {
          ctx.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, displayX, displayY, displayWidth, displayHeight);
        }
        var link = document.createElement('a');
        link.download = 'filename';
        if(imageFileType.value === 'png') {
          link.href = document.getElementById(canvasChild.id).toDataURL();
        } 
        if(imageFileType.value === 'jpg') {
          link.href = document.getElementById(canvasChild.id).toDataURL('image/jpeg', 0.7);
        }
        link.click();
    }
}

function deleteChild(e) {
  var child = e.lastElementChild; 
  while (child) {
      e.removeChild(child);
      child = e.lastElementChild;
  }
}

function inputHandler(event, element) {
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
  productName.value = "";
}

window.onload = function(){
  imageHeight.value = '600';
  imageWidth.value = '600';
  imageFileType.value = 'jpg';
  imageEditOptions.value = 'resize';

  productName.addEventListener('input', function(e){
    inputHandler(e, result);
  });
  productName.addEventListener('change', function(e){
    inputHandler(e, result);
  });
  productName.addEventListener('propertychange', function(e){
    inputHandler(e, result);
  });

  templateOption.addEventListener('change', function(e){
    switch(e.target.value) {
      case '600x600-jpg':
        imageHeight.value = '600';
        imageWidth.value = '600';
        imageFileType.value = 'jpg';
        imageEditOptions.value = 'resize';
        break;
      case '970x364-png-crop':
        imageHeight.value = '970';
        imageWidth.value = '364';
        imageFileType.value = 'png';
        imageEditOptions.value = 'resizeAndCrop';
        break;
      case '970x410-png-crop':
        imageHeight.value = '970';
        imageWidth.value = '410';
        imageFileType.value = 'png';
        imageEditOptions.value = 'resizeAndCrop';
        break;
    }
  });
        
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
                  cropImg(picFile.result, imageWidth.value, imageHeight.value);
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
