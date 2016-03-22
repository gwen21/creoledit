angular.module('CreolEdit').controller('FilesCtrl', ['$scope', '$modal', 'eolfiles', function($scope, $modal, eolfiles){
    $scope.eolfiles = eolfiles;

    $scope.newFileName = "";
    $scope.newFileType = "";

    $scope.newFile = function() {
        $scope.eolfiles.newFile(
            {
              name: $scope.newFileName,
              path: $scope.newFileType
            });
        $scope.newFileName = '';
        $scope.newFileType = '';
    };

    // $scope.removeFileByIndex = function(index) {
    //     $scope.eolfiles.removeFileByIndex(index);
    // };

    // FIXME : edit files
    // editFileByIndex
}]);
