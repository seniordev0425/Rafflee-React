export const printPreview = (data) => {
  var type = 'application/pdf';
  let blob = null;
  const blobURL = URL.createObjectURL(pdfBlobConversion(data, 'application/pdf'));
  const theWindow = window.open(blobURL);
  const theDoc = theWindow.document;
  const theScript = document.createElement('script');
  function injectThis() {
    window.print();
  }
  theScript.innerHTML = 'window.onload = ${injectThis.toString()};';
  theDoc.body.appendChild(theScript);
}
//converts base64 to blob type for windows
function pdfBlobConversion(b64Data, contentType) {
  contentType = contentType || '';
  var sliceSize = 512;
  b64Data = b64Data.replace(/^[^,]+,/, '');
  b64Data = b64Data.replace(/\s/g, '');
  var byteCharacters = window.atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset = offset + sliceSize) {
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