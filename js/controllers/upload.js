angular.module('CreolEdit').controller('FileUploadCtrl', [
  '$scope', '$timeout', 'domparser', 'eolfiles',
  function($scope, $timeout, domparser, eolfiles) {
    $scope.uploaded = false;
    $scope.$watch('file', function(file) {
        if(file) {
            var fr = new FileReader();
            fr.onload = function(evt) {
              var xmlStr = evt.target.result;
              eolfiles.files = domparser.loadFiles(xmlStr);

              // FIXME : deplacer le serializer dans un autre objet
              // var oSerializer = new XMLSerializer();
              // var sXML = oSerializer.serializeToString(doc);
              $timeout(function() {
                  $scope.uploaded = true;
              });
            };
            fr.readAsText(file);
        }
    });
  }
]);
