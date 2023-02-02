$(document).ready(function () {

    //Step 1. Hook into the myFile input file change event



   var subKey = '[your key]';

    function makeblob(b64Data, contentType, sliceSize) {
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

    $('#myImage').change(function () {

        //Load everything in
        var reader = new FileReader();
        var file = this.files[0];
      //  var mb = $(this).serializeObject();
        console.log(file);
        reader.onload=  function() {
            var resultData = this.result;

            
          
          
        //     console.log(resultData);
            
                 
            resultData = resultData.split(',')[1];
            
            processImage(resultData);
           // processImage(mb);
        };

       
        reader.readAsDataURL(file);

    });

    processImage = function(binaryImage) {
  
 
   
        
     //   var uriBase = "https://westcentralus.api.cognitive.microsoft.com/vision/v1.0/analyze";
        var uriBase = "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze";

        //    // Request parameters.
        var params = {
            "visualFeatures": "Categories,Description,Color",
            "details": "",
            "language": "en",
        };

        $.ajax({
            url: "https://eastus.api.cognitive.microsoft.com/vision/v1.0/analyze?visualFeatures=Categories&language=en",
            
           method: "POST",
           type: "POST",
            beforeSend: function (xhrObj) {
                xhrObj.setRequestHeader("Ocp-Apim-Subscription-Key", subKey);
               

            },
            contentType: "application/octet-stream",
            mime: "application/octet-stream",   
            data: makeblob(binaryImage, 'image/jpeg'),
            cache: false,
            processData: false
      
          
        }) .done(function(data) {
   // Show formatted JSON on webpage.
   $("#responseTextArea").val(JSON.stringify(data, null, 2));
})

    }
});
