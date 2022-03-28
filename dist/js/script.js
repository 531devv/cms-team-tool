var result = document.getElementById("result");
var productName = document.getElementById("productName");
var templateOption = document.getElementById("fileTemplateOptions");
var imageWidth = document.getElementById("imageWidth");
var imageHeight = document.getElementById("imageHeight");
var imageEditOptions = document.getElementById("imageEditOptions");
var imageFileType = document.getElementById("imageFileType");

function cropImg(imageSrc, width, height) {
  var canvasParent = document.getElementById("canvas");
  var canvasChild = document.createElement("canvas");
  canvasChild.id = Math.random() * 10;
  canvasParent.appendChild(canvasChild);
  const canvas = document.getElementById(canvasChild.id);
  const ctx = canvas.getContext("2d");
  ctx.canvas.width = width;
  ctx.canvas.height = height;
  var image = new Image();
  image.src = imageSrc;
  image.onload = function () {
    var sourceX;
    var sourceY = 0;
    if (imageEditOptions.value === "crop") {
      if (image.width != width) {
        sourceX = (image.width - width) / 2;
      } else {
        sourceX = 0;
      }
    }
    const sourceWidth = width;
    const sourceHeight = height;
    const displayX = 0;
    const displayY = 0;
    const displayWidth = width;
    const displayHeight = height;
    if (imageEditOptions.value === "resize") {
      ctx.drawImage(image, 0, 0, width, height);
    }
    if (imageEditOptions.value === "crop") {
      console.log(sourceX + ' ' + sourceY);
      ctx.drawImage(
        image,
        sourceX,
        sourceY,
        sourceWidth,
        sourceHeight,
        displayX,
        displayY,
        displayWidth,
        displayHeight
      );
    }

    if(imageEditOptions.value != "resizeAndCrop") {
      var link = document.createElement("a");
      link.download = "filename";
      if (imageFileType.value === "png") {
        link.href = document.getElementById(canvasChild.id).toDataURL();
      }
      if (imageFileType.value === "jpg") {
        link.href = document
          .getElementById(canvasChild.id)
          .toDataURL("image/jpeg", 0.8);
      }
      link.click();
    }

    if (imageEditOptions.value === "resizeAndCrop") {
      ctx.canvas.width = height;
      ctx.canvas.height = height;
      ctx.drawImage(image, 0, 0, height, height);

      var newCanvasChild = document.createElement("canvas");
      newCanvasChild.id = Math.random() * 10;
      canvasParent.appendChild(newCanvasChild);
      const newCanvas = document.getElementById(newCanvasChild.id);
      const newCtx = newCanvas.getContext("2d");
      newCtx.canvas.width = width;
      newCtx.canvas.height = height;
      var newImage = new Image();
      newImage.src = document.getElementById(canvasChild.id).toDataURL();
      newImage.onload = function () {
        if (newImage.width != width) {
          sourceX = (newImage.width - width) / 2;
        } else {
          sourceX = 0;
        }
        if (newImage.height != height) {
          sourceY = (newImage.height - height) / 2;
        } else {
          sourceY = 0;
        }
        newCtx.drawImage(
          newImage,
          sourceX,
          sourceY,
          width,
          height,
          0,
          0,
          width,
          height
        );
        var newLink = document.createElement("a");
        newLink.download = "filename";
        if (imageFileType.value == "png") {
          newLink.href = document.getElementById(newCanvasChild.id).toDataURL();
        } else {
          newLink.href = document.getElementById(newCanvasChild.id).toDataURL("image/jpeg", 0.8);
        }
        newLink.click();
       }
    }
  };
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
  productName.value = "";
}

window.onload = function () {
  imageHeight.value = "600";
  imageWidth.value = "600";
  imageFileType.value = "jpg";
  imageEditOptions.value = "resize";

  productName.addEventListener("input", function (e) {
    inputHandler(e, result);
  });
  productName.addEventListener("change", function (e) {
    inputHandler(e, result);
  });
  productName.addEventListener("propertychange", function (e) {
    inputHandler(e, result);
  });

  templateOption.addEventListener("change", function (e) {
    switch (e.target.value) {
      case "600x600-jpg":
        imageHeight.value = "600";
        imageWidth.value = "600";
        imageFileType.value = "jpg";
        imageEditOptions.value = "resize";
        break;
      case "540x540-png":
        imageHeight.value = "540";
        imageWidth.value = "540";
        imageFileType.value = "png";
        imageEditOptions.value = "resize";
        break;
      case "540x320-png-crop":
        imageHeight.value = "540";
        imageWidth.value = "320";
        imageFileType.value = "png";
        imageEditOptions.value = "crop";
        break;
      case "970x970-png":
        imageHeight.value = "970";
        imageWidth.value = "970";
        imageFileType.value = "png";
        imageEditOptions.value = "resize";
        break;
      case "970x364-png-crop":
        imageHeight.value = "970";
        imageWidth.value = "364";
        imageFileType.value = "png";
        imageEditOptions.value = "crop";
        break;
      case "970x410-png-crop":
        imageHeight.value = "970";
        imageWidth.value = "410";
        imageFileType.value = "png";
        imageEditOptions.value = "crop";
        break;
      case "970x364-png-resizeAndCrop":
        imageHeight.value = "970";
        imageWidth.value = "364";
        imageFileType.value = "png";
        imageEditOptions.value = "resizeAndCrop";
        break;
      case "540x320-png-resizeAndCrop":
        imageHeight.value = "540";
        imageWidth.value = "320";
        imageFileType.value = "png";
        imageEditOptions.value = "resizeAndCrop";
        break;
    }
  });

  //Check File API support
  if (window.File && window.FileList && window.FileReader) {
    var filesInput = document.getElementById("files");

    filesInput.addEventListener("change", function (event) {
      var files = event.target.files;
      var output = document.getElementById("images_result");

      for (var i = 0; i < files.length; i++) {
        var file = files[i];

        //Only pics
        if (!file.type.match("image")) continue;

        var picReader = new FileReader();

        picReader.addEventListener("load", function (event) {
          var picFile = event.target;
          cropImg(picFile.result, imageWidth.value, imageHeight.value);
          document.getElementById("files").value = "";
          picReader = null;
          picFule = null;
        });

        //Read the image
        picReader.readAsDataURL(file);
      }
    });
  } else {
    console.log("Your browser does not support File API");
  }
};
