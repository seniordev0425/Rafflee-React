export const b64toBlob = (b64Data, contentType, sliceSize) => {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

// export const imageToBase64 = (url) => {
//   return new Promise((res) => {
//     const xhr = new XMLHttpRequest();
//     xhr.onload = () => {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         res(reader.result);
//       };
//       reader.readAsDataURL(xhr.response);
//     };
//     xhr.open('GET', 'https://cors-anywhere.herokuapp.com/' + url);
//     xhr.responseType = 'blob';
//     xhr.send();
//   })
// }

export const imageToBase64 = (url, outputFormat='image/png') => {
  return new Promise((res) => {
    var img = new Image();
    // img.crossOrigin = 'Anonymous';
    img.onload = () => {
        var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'), dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        res(dataURL);
        canvas = null; 
    };
    img.setAttribute('crossOrigin', 'anonymous');
    img.src = url;
  })
}