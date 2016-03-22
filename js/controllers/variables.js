angular.module('CreolEdit').controller('VariablesCtrl', ['$scope', '$modal', 'eolvars', function($scope, $modal, eolvars){

    $scope.eolvars = eolvars;

    // $scope.removeFileByIndex = eolfiles.removeFileByIndex;
    // var createDialogOpts = {
    //     templateUrl: 'templates/FileCreate.html',
    //     controller: ['$scope', '$modalInstance','scopeParent', 'eolfiles',
    //         function($scope, $modalInstance,scopeParent, eolfiles) {
    //             //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
    //             $scope.newFile = "";
    //             $scope.filePath = "";
    //             $scope.save = function() {
    //                 //On peut également faire appel à un service de notre application.
    //                 eolfiles.newFile({fileName: $scope.newFile, filePath:$scope.newPath});
    //                 $modalInstance.close();
    //             };
    //             $scope.cancel = function() {
    //                 $modalInstance.dismiss('cancel');
    //             };
    //         }
    //     ],
    //     resolve: {
    //         // FIXME don't even need a 'resolve' now. remove it.
    //         scopeParent: function() {
    //             return $scope;
    //         }
    //     }
    // };
    //
    // $scope.fileCreateWidget = function() {
    //     $modal.open(createDialogOpts);
    // };
    // var editDialogOpts = {
    //     templateUrl: 'templates/FileEdit.html',
    //     controller: ['$scope', '$modalInstance','scopeParent', 'eolfiles',
    //         function($scope, $modalInstance, scopeParent, eolfiles) {
    //             //Controller de la fenêtre. Il doit prend en paramètre tous les élèments du "resolve".
    //             $scope.newFile = "";
    //             $scope.filePath = "";
    //             $scope.save = function() {
    //                 //On peut également faire appel à un service de notre application.
    //                 eolfiles.editFileByIndex(); //{fileName: $scope.newFile, filePath:$scope.newPath});
    //                 $modalInstance.close();
    //             };
    //             $scope.cancel = function() {
    //                 $modalInstance.dismiss('cancel');
    //             };
    //         }
    //     ],
    //     resolve: {
    //         scopeParent: function() {
    //             return $scope;
    //         }
    //     }
    // };
    // $scope.editFileByIndex = function() {
    //     $modal.open(editDialogOpts);
    // };
}]);
