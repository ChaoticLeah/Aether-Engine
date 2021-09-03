export function getDataUrl(img) {
  // Create canvas
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");
  // Set width and height
  canvas.width = img.width;
  canvas.height = img.height;
  // Draw the image
  ctx.drawImage(img, 0, 0);
  return canvas.toDataURL("image/png");
}

export async function readImage(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result);
  };
}

export async function readFile(file, callback) {
  const reader = new FileReader();
  reader.readAsText(file);
  reader.onload = function () {
    callback(reader.result);
  };
}

export async function readFileBase64(file, callback) {
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = function () {
    callback(reader.result);
  };
}

export function uploadFile(callback) {
  let fileUploader = document.createElement("input");
  fileUploader.type = "file";
  fileUploader.multiple = true;
  fileUploader.click();
  fileUploader.addEventListener("change", (async) => {
    callback(fileUploader.files);
    //fileUploader.removeEventListener("change", null);
    fileUploader.remove();
  });
}
