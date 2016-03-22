angular.module('CreolEdit').controller('XmlExportCtrl', ['$scope', function($scope){

    // $scope.export = function(){
    //       $window.open("data:text/xml;charset=utf-8," + encodeURIComponent("<xml>toto</xml>"), "exporter", "menubar=no, status=no, scrollbars=no, menubar=no, width=200, height=100");
    // };

    $scope.export = function (){
        // FIXME : the xml string shall comme from a service
        var blob = new Blob(["<xml>hello</xml>"], {type: "text/xml;charset=utf-8"});
        // FIXME : recupérer le nom de fichier a sauver
        saveAs(blob, "CreolEditDictionary.xml");
    };
}]);
