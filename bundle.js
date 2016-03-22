(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
exports.translations = {
    'APPSHORTTITLE': 'CreolEdit',
    'APPTITLE':'CreolEdit XML Editor',
    'FILES':{
        'TITLE': 'Files Editor',
        'FILE': 'File Name',
        'PATH': "File's Path (if different)",
        'NOFILES': 'No file by now.',
        'DELETE': 'Delete',
        'EDIT': 'Edit',
        'FILEUPLOADED': 'File uploaded.',
        'NEW_FILE_DIALOG_TITLE': 'New file',
        'EDIT_FILE_DIALOG_TITLE': 'Edit file',
        'EDIT_FILE_TITLE':'File Editor',
        'NEW_FILE_BUTTON': 'New file',
        'FILES_BUTTON': 'Files'
    },
    'VARIABLES':{
        'TITLE': 'Variables Editor',
        'FILE': 'Variable Name',
        'TYPE': "Variable's type",
        'NOVARIABLES': 'No variable by now.',
        'DELETE': 'Delete',
        'EDIT': 'Edit',
        'NEW_VARIABLE_BUTTON': 'New variable'
    },
    'UPLOAD':{
        'UPLOAD_BUTTON': 'Upload'
    },
    'CREDITS': {
        'ANNONCE': 'CreolEdit Creole dictionnary editor ',
        'LICENCE': 'ISC licence Cadoles 2015-2016.'
    }
};

},{}],2:[function(require,module,exports){
exports.translations = {
    'APPSHORTTITLE': 'CreolEdit',
    'APPTITLE':'CreolEdit éditeur de fichiers XML',
    'FILES':{
        'TITLE': 'Édition des fichiers',
        'FILE': 'Nom du fichier',
        'PATH': 'Chemin du fichier (si différent)',
        'NOFILES': "Pas de fichiers pour l'instant",
        'DELETE': 'Supprimer',
        'EDIT': 'Éditer',
        'FILEUPLOADED': 'Fichier téléchargé.',
        'NEW_FILE_DIALOG_TITLE': 'Nouveau fichier',
        'EDIT_FILE_DIALOG_TITLE': 'Éditer le fichier',
        'EDIT_FILE_TITLE':'Edition du fichier',
        'NEW_FILE_BUTTON': 'Nouveau fichier',
        'FILES_BUTTON': 'Fichiers'
    },
    'VARIABLES':{
        'TITLE': 'Édition des Variables',
        'FILE': 'Nom de la variable',
        'TYPE': "Type de variable",
        'NOVARIABLES': 'Pas de variable pour l\'instant.',
        'DELETE': 'Supprimer',
        'EDIT': 'Editer',
        'NEW_VARIABLE_BUTTON': 'Nouvelle variable'
    },
    'UPLOAD':{
        'UPLOAD_BUTTON': 'Téléchargement'
    },
    'CREDITS': {
        'ANNONCE': 'CreolEdit éditeur de dictionnaire XML Créole ',
        'LICENCE': 'Cadoles 2015-2016 licence ISC.'

    }

} ;

},{}],3:[function(require,module,exports){
var CreolEdit = angular.module('CreolEdit', ['pascalprecht.translate', 'ngFileUpload', 'ui.bootstrap']);
var enTranslations = require('../i18n/en.js').translations;
var frTranslations = require('../i18n/fr.js').translations;

// i18n
CreolEdit.config(['$translateProvider', function ($translateProvider) {
  $translateProvider.useSanitizeValueStrategy('escape');
  $translateProvider.translations('en', enTranslations);
  $translateProvider.translations('fr', frTranslations);
  $translateProvider.preferredLanguage('fr');
}]);

//CreolEdit.constant('properties', ['hidden', 'disabled']);
CreolEdit.constant('Version', 'v1.00');

require('./services');
require('./controllers');

},{"../i18n/en.js":1,"../i18n/fr.js":2,"./controllers":6,"./services":11}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
require('./files');
require('./variables');
require('./upload');
require('./export');

},{"./export":4,"./files":5,"./upload":7,"./variables":8}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
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

},{}],9:[function(require,module,exports){
angular.module('CreolEdit').factory('domparser', [function(){
    var instanciateFilesFromDom = function(xmlStr){
        var parser = new DOMParser();
        var document = parser.parseFromString(xmlStr, 'application/xml');
        return loadFilesFromDom(document.getElementsByTagName("file"));
    };
    var loadFilesFromDom = function(fileElements){
        var domfiles = [];
        for(var i=0;i<fileElements.length;i++){
            fileElement = fileElements[i];
            if (fileElement.hasAttributes()) {
                var attrs = fileElement.attributes;
                var fileattrs = {};
                for(var j=attrs.length - 1; j >= 0; j--) {
                    fileattrs[attrs[j].name] = attrs[j].value;
                }
                domfiles.push(fileattrs);
                } else {
                  // FIXME do something -> should not happen
            }
        }
        return domfiles;
    };
    var domparserAPI = {
        loadFiles: instanciateFilesFromDom
    };
    return domparserAPI;
}]);

},{}],10:[function(require,module,exports){
angular.module('CreolEdit').service('eolfiles', function(domparser){
    // FIXME : make unittests with this
    // var loadFiles = function loadFiles(){
    //         return [{
    //                 name:'ntp.conf',
    //                 path: '/etc/'
    //             },{
    //                 name: 'ntpdate',
    //                 path: '/etc/default/'
    //             },{
    //                 name: 'host',
    //                 path: '/etc/strange/'
    //             },{
    //                 name: 'active_tags',
    //                 path: '/usr/share/era/backend/data/'
    //             }];
    //     };
    // var files = loadFiles();
    
    this.files = [];
    this.newFile = function (newFile){
        this.files.push(newFile);
    };
    this.removeFileByIndex = function(index){
        this.files.splice(index, 1);
    };

});

},{}],11:[function(require,module,exports){
require('./files') ;
require('./variables') ;
require('./domparser') ;

},{"./domparser":9,"./files":10,"./variables":12}],12:[function(require,module,exports){
angular.module('CreolEdit').factory('eolvars', [function(){
    var loadVars = function (){
            return [{
                    name:'ntp.conf',
                    type: '/etc/'
                },{
                    name: 'ntpdate',
                    type: '/etc/default/'
                },{
                    name: 'host',
                    type: '/etc/strange/'
                },{
                    name: 'active_tags',
                    type: '/usr/share/era/backend/data/'
                }];
        };
    var variables = loadVars();

    var VarsManagerAPI = {
        variables: variables
        // newVar: function (newVarItem){
        //     vars.push({
        //       name: newVarItem.varName,
        //       type: newVarItem.varType
        //     });
        // },
        // removeVarByIndex: function(index) {
        //     files.splice(index, 1);
        // },
        // editVarByIndex: function(index){
        //     vars[index].varName = 'edite';
        //     vars[index].vartype = 'editedfiletype';
        // }
    };
    return VarsManagerAPI;
}]);

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJpMThuL2VuLmpzIiwiaTE4bi9mci5qcyIsImpzL2FwcC5qcyIsImpzL2NvbnRyb2xsZXJzL2V4cG9ydC5qcyIsImpzL2NvbnRyb2xsZXJzL2ZpbGVzLmpzIiwianMvY29udHJvbGxlcnMvaW5kZXguanMiLCJqcy9jb250cm9sbGVycy91cGxvYWQuanMiLCJqcy9jb250cm9sbGVycy92YXJpYWJsZXMuanMiLCJqcy9zZXJ2aWNlcy9kb21wYXJzZXIuanMiLCJqcy9zZXJ2aWNlcy9maWxlcy5qcyIsImpzL3NlcnZpY2VzL2luZGV4LmpzIiwianMvc2VydmljZXMvdmFyaWFibGVzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7O0FDSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiZXhwb3J0cy50cmFuc2xhdGlvbnMgPSB7XG4gICAgJ0FQUFNIT1JUVElUTEUnOiAnQ3Jlb2xFZGl0JyxcbiAgICAnQVBQVElUTEUnOidDcmVvbEVkaXQgWE1MIEVkaXRvcicsXG4gICAgJ0ZJTEVTJzp7XG4gICAgICAgICdUSVRMRSc6ICdGaWxlcyBFZGl0b3InLFxuICAgICAgICAnRklMRSc6ICdGaWxlIE5hbWUnLFxuICAgICAgICAnUEFUSCc6IFwiRmlsZSdzIFBhdGggKGlmIGRpZmZlcmVudClcIixcbiAgICAgICAgJ05PRklMRVMnOiAnTm8gZmlsZSBieSBub3cuJyxcbiAgICAgICAgJ0RFTEVURSc6ICdEZWxldGUnLFxuICAgICAgICAnRURJVCc6ICdFZGl0JyxcbiAgICAgICAgJ0ZJTEVVUExPQURFRCc6ICdGaWxlIHVwbG9hZGVkLicsXG4gICAgICAgICdORVdfRklMRV9ESUFMT0dfVElUTEUnOiAnTmV3IGZpbGUnLFxuICAgICAgICAnRURJVF9GSUxFX0RJQUxPR19USVRMRSc6ICdFZGl0IGZpbGUnLFxuICAgICAgICAnRURJVF9GSUxFX1RJVExFJzonRmlsZSBFZGl0b3InLFxuICAgICAgICAnTkVXX0ZJTEVfQlVUVE9OJzogJ05ldyBmaWxlJyxcbiAgICAgICAgJ0ZJTEVTX0JVVFRPTic6ICdGaWxlcydcbiAgICB9LFxuICAgICdWQVJJQUJMRVMnOntcbiAgICAgICAgJ1RJVExFJzogJ1ZhcmlhYmxlcyBFZGl0b3InLFxuICAgICAgICAnRklMRSc6ICdWYXJpYWJsZSBOYW1lJyxcbiAgICAgICAgJ1RZUEUnOiBcIlZhcmlhYmxlJ3MgdHlwZVwiLFxuICAgICAgICAnTk9WQVJJQUJMRVMnOiAnTm8gdmFyaWFibGUgYnkgbm93LicsXG4gICAgICAgICdERUxFVEUnOiAnRGVsZXRlJyxcbiAgICAgICAgJ0VESVQnOiAnRWRpdCcsXG4gICAgICAgICdORVdfVkFSSUFCTEVfQlVUVE9OJzogJ05ldyB2YXJpYWJsZSdcbiAgICB9LFxuICAgICdVUExPQUQnOntcbiAgICAgICAgJ1VQTE9BRF9CVVRUT04nOiAnVXBsb2FkJ1xuICAgIH0sXG4gICAgJ0NSRURJVFMnOiB7XG4gICAgICAgICdBTk5PTkNFJzogJ0NyZW9sRWRpdCBDcmVvbGUgZGljdGlvbm5hcnkgZWRpdG9yICcsXG4gICAgICAgICdMSUNFTkNFJzogJ0lTQyBsaWNlbmNlIENhZG9sZXMgMjAxNS0yMDE2LidcbiAgICB9XG59O1xuIiwiZXhwb3J0cy50cmFuc2xhdGlvbnMgPSB7XG4gICAgJ0FQUFNIT1JUVElUTEUnOiAnQ3Jlb2xFZGl0JyxcbiAgICAnQVBQVElUTEUnOidDcmVvbEVkaXQgw6lkaXRldXIgZGUgZmljaGllcnMgWE1MJyxcbiAgICAnRklMRVMnOntcbiAgICAgICAgJ1RJVExFJzogJ8OJZGl0aW9uIGRlcyBmaWNoaWVycycsXG4gICAgICAgICdGSUxFJzogJ05vbSBkdSBmaWNoaWVyJyxcbiAgICAgICAgJ1BBVEgnOiAnQ2hlbWluIGR1IGZpY2hpZXIgKHNpIGRpZmbDqXJlbnQpJyxcbiAgICAgICAgJ05PRklMRVMnOiBcIlBhcyBkZSBmaWNoaWVycyBwb3VyIGwnaW5zdGFudFwiLFxuICAgICAgICAnREVMRVRFJzogJ1N1cHByaW1lcicsXG4gICAgICAgICdFRElUJzogJ8OJZGl0ZXInLFxuICAgICAgICAnRklMRVVQTE9BREVEJzogJ0ZpY2hpZXIgdMOpbMOpY2hhcmfDqS4nLFxuICAgICAgICAnTkVXX0ZJTEVfRElBTE9HX1RJVExFJzogJ05vdXZlYXUgZmljaGllcicsXG4gICAgICAgICdFRElUX0ZJTEVfRElBTE9HX1RJVExFJzogJ8OJZGl0ZXIgbGUgZmljaGllcicsXG4gICAgICAgICdFRElUX0ZJTEVfVElUTEUnOidFZGl0aW9uIGR1IGZpY2hpZXInLFxuICAgICAgICAnTkVXX0ZJTEVfQlVUVE9OJzogJ05vdXZlYXUgZmljaGllcicsXG4gICAgICAgICdGSUxFU19CVVRUT04nOiAnRmljaGllcnMnXG4gICAgfSxcbiAgICAnVkFSSUFCTEVTJzp7XG4gICAgICAgICdUSVRMRSc6ICfDiWRpdGlvbiBkZXMgVmFyaWFibGVzJyxcbiAgICAgICAgJ0ZJTEUnOiAnTm9tIGRlIGxhIHZhcmlhYmxlJyxcbiAgICAgICAgJ1RZUEUnOiBcIlR5cGUgZGUgdmFyaWFibGVcIixcbiAgICAgICAgJ05PVkFSSUFCTEVTJzogJ1BhcyBkZSB2YXJpYWJsZSBwb3VyIGxcXCdpbnN0YW50LicsXG4gICAgICAgICdERUxFVEUnOiAnU3VwcHJpbWVyJyxcbiAgICAgICAgJ0VESVQnOiAnRWRpdGVyJyxcbiAgICAgICAgJ05FV19WQVJJQUJMRV9CVVRUT04nOiAnTm91dmVsbGUgdmFyaWFibGUnXG4gICAgfSxcbiAgICAnVVBMT0FEJzp7XG4gICAgICAgICdVUExPQURfQlVUVE9OJzogJ1TDqWzDqWNoYXJnZW1lbnQnXG4gICAgfSxcbiAgICAnQ1JFRElUUyc6IHtcbiAgICAgICAgJ0FOTk9OQ0UnOiAnQ3Jlb2xFZGl0IMOpZGl0ZXVyIGRlIGRpY3Rpb25uYWlyZSBYTUwgQ3LDqW9sZSAnLFxuICAgICAgICAnTElDRU5DRSc6ICdDYWRvbGVzIDIwMTUtMjAxNiBsaWNlbmNlIElTQy4nXG5cbiAgICB9XG5cbn0gO1xuIiwidmFyIENyZW9sRWRpdCA9IGFuZ3VsYXIubW9kdWxlKCdDcmVvbEVkaXQnLCBbJ3Bhc2NhbHByZWNodC50cmFuc2xhdGUnLCAnbmdGaWxlVXBsb2FkJywgJ3VpLmJvb3RzdHJhcCddKTtcbnZhciBlblRyYW5zbGF0aW9ucyA9IHJlcXVpcmUoJy4uL2kxOG4vZW4uanMnKS50cmFuc2xhdGlvbnM7XG52YXIgZnJUcmFuc2xhdGlvbnMgPSByZXF1aXJlKCcuLi9pMThuL2ZyLmpzJykudHJhbnNsYXRpb25zO1xuXG4vLyBpMThuXG5DcmVvbEVkaXQuY29uZmlnKFsnJHRyYW5zbGF0ZVByb3ZpZGVyJywgZnVuY3Rpb24gKCR0cmFuc2xhdGVQcm92aWRlcikge1xuICAkdHJhbnNsYXRlUHJvdmlkZXIudXNlU2FuaXRpemVWYWx1ZVN0cmF0ZWd5KCdlc2NhcGUnKTtcbiAgJHRyYW5zbGF0ZVByb3ZpZGVyLnRyYW5zbGF0aW9ucygnZW4nLCBlblRyYW5zbGF0aW9ucyk7XG4gICR0cmFuc2xhdGVQcm92aWRlci50cmFuc2xhdGlvbnMoJ2ZyJywgZnJUcmFuc2xhdGlvbnMpO1xuICAkdHJhbnNsYXRlUHJvdmlkZXIucHJlZmVycmVkTGFuZ3VhZ2UoJ2ZyJyk7XG59XSk7XG5cbi8vQ3Jlb2xFZGl0LmNvbnN0YW50KCdwcm9wZXJ0aWVzJywgWydoaWRkZW4nLCAnZGlzYWJsZWQnXSk7XG5DcmVvbEVkaXQuY29uc3RhbnQoJ1ZlcnNpb24nLCAndjEuMDAnKTtcblxucmVxdWlyZSgnLi9zZXJ2aWNlcycpO1xucmVxdWlyZSgnLi9jb250cm9sbGVycycpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ0NyZW9sRWRpdCcpLmNvbnRyb2xsZXIoJ1htbEV4cG9ydEN0cmwnLCBbJyRzY29wZScsIGZ1bmN0aW9uKCRzY29wZSl7XG5cbiAgICAvLyAkc2NvcGUuZXhwb3J0ID0gZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgICAkd2luZG93Lm9wZW4oXCJkYXRhOnRleHQveG1sO2NoYXJzZXQ9dXRmLTgsXCIgKyBlbmNvZGVVUklDb21wb25lbnQoXCI8eG1sPnRvdG88L3htbD5cIiksIFwiZXhwb3J0ZXJcIiwgXCJtZW51YmFyPW5vLCBzdGF0dXM9bm8sIHNjcm9sbGJhcnM9bm8sIG1lbnViYXI9bm8sIHdpZHRoPTIwMCwgaGVpZ2h0PTEwMFwiKTtcbiAgICAvLyB9O1xuXG4gICAgJHNjb3BlLmV4cG9ydCA9IGZ1bmN0aW9uICgpe1xuICAgICAgICAvLyBGSVhNRSA6IHRoZSB4bWwgc3RyaW5nIHNoYWxsIGNvbW1lIGZyb20gYSBzZXJ2aWNlXG4gICAgICAgIHZhciBibG9iID0gbmV3IEJsb2IoW1wiPHhtbD5oZWxsbzwveG1sPlwiXSwge3R5cGU6IFwidGV4dC94bWw7Y2hhcnNldD11dGYtOFwifSk7XG4gICAgICAgIC8vIEZJWE1FIDogcmVjdXDDqXJlciBsZSBub20gZGUgZmljaGllciBhIHNhdXZlclxuICAgICAgICBzYXZlQXMoYmxvYiwgXCJDcmVvbEVkaXREaWN0aW9uYXJ5LnhtbFwiKTtcbiAgICB9O1xufV0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ0NyZW9sRWRpdCcpLmNvbnRyb2xsZXIoJ0ZpbGVzQ3RybCcsIFsnJHNjb3BlJywgJyRtb2RhbCcsICdlb2xmaWxlcycsIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsLCBlb2xmaWxlcyl7XG4gICAgJHNjb3BlLmVvbGZpbGVzID0gZW9sZmlsZXM7XG5cbiAgICAkc2NvcGUubmV3RmlsZU5hbWUgPSBcIlwiO1xuICAgICRzY29wZS5uZXdGaWxlVHlwZSA9IFwiXCI7XG5cbiAgICAkc2NvcGUubmV3RmlsZSA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAkc2NvcGUuZW9sZmlsZXMubmV3RmlsZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJHNjb3BlLm5ld0ZpbGVOYW1lLFxuICAgICAgICAgICAgICBwYXRoOiAkc2NvcGUubmV3RmlsZVR5cGVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAkc2NvcGUubmV3RmlsZU5hbWUgPSAnJztcbiAgICAgICAgJHNjb3BlLm5ld0ZpbGVUeXBlID0gJyc7XG4gICAgfTtcblxuICAgIC8vICRzY29wZS5yZW1vdmVGaWxlQnlJbmRleCA9IGZ1bmN0aW9uKGluZGV4KSB7XG4gICAgLy8gICAgICRzY29wZS5lb2xmaWxlcy5yZW1vdmVGaWxlQnlJbmRleChpbmRleCk7XG4gICAgLy8gfTtcblxuICAgIC8vIEZJWE1FIDogZWRpdCBmaWxlc1xuICAgIC8vIGVkaXRGaWxlQnlJbmRleFxufV0pO1xuIiwicmVxdWlyZSgnLi9maWxlcycpO1xucmVxdWlyZSgnLi92YXJpYWJsZXMnKTtcbnJlcXVpcmUoJy4vdXBsb2FkJyk7XG5yZXF1aXJlKCcuL2V4cG9ydCcpO1xuIiwiYW5ndWxhci5tb2R1bGUoJ0NyZW9sRWRpdCcpLmNvbnRyb2xsZXIoJ0ZpbGVVcGxvYWRDdHJsJywgW1xuICAnJHNjb3BlJywgJyR0aW1lb3V0JywgJ2RvbXBhcnNlcicsICdlb2xmaWxlcycsXG4gIGZ1bmN0aW9uKCRzY29wZSwgJHRpbWVvdXQsIGRvbXBhcnNlciwgZW9sZmlsZXMpIHtcbiAgICAkc2NvcGUudXBsb2FkZWQgPSBmYWxzZTtcbiAgICAkc2NvcGUuJHdhdGNoKCdmaWxlJywgZnVuY3Rpb24oZmlsZSkge1xuICAgICAgICBpZihmaWxlKSB7XG4gICAgICAgICAgICB2YXIgZnIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgICAgICAgICAgZnIub25sb2FkID0gZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgIHZhciB4bWxTdHIgPSBldnQudGFyZ2V0LnJlc3VsdDtcbiAgICAgICAgICAgICAgZW9sZmlsZXMuZmlsZXMgPSBkb21wYXJzZXIubG9hZEZpbGVzKHhtbFN0cik7XG5cbiAgICAgICAgICAgICAgLy8gRklYTUUgOiBkZXBsYWNlciBsZSBzZXJpYWxpemVyIGRhbnMgdW4gYXV0cmUgb2JqZXRcbiAgICAgICAgICAgICAgLy8gdmFyIG9TZXJpYWxpemVyID0gbmV3IFhNTFNlcmlhbGl6ZXIoKTtcbiAgICAgICAgICAgICAgLy8gdmFyIHNYTUwgPSBvU2VyaWFsaXplci5zZXJpYWxpemVUb1N0cmluZyhkb2MpO1xuICAgICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgICAgICRzY29wZS51cGxvYWRlZCA9IHRydWU7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIGZyLnJlYWRBc1RleHQoZmlsZSk7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgfVxuXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnQ3Jlb2xFZGl0JykuY29udHJvbGxlcignVmFyaWFibGVzQ3RybCcsIFsnJHNjb3BlJywgJyRtb2RhbCcsICdlb2x2YXJzJywgZnVuY3Rpb24oJHNjb3BlLCAkbW9kYWwsIGVvbHZhcnMpe1xuXG4gICAgJHNjb3BlLmVvbHZhcnMgPSBlb2x2YXJzO1xuXG4gICAgLy8gJHNjb3BlLnJlbW92ZUZpbGVCeUluZGV4ID0gZW9sZmlsZXMucmVtb3ZlRmlsZUJ5SW5kZXg7XG4gICAgLy8gdmFyIGNyZWF0ZURpYWxvZ09wdHMgPSB7XG4gICAgLy8gICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL0ZpbGVDcmVhdGUuaHRtbCcsXG4gICAgLy8gICAgIGNvbnRyb2xsZXI6IFsnJHNjb3BlJywgJyRtb2RhbEluc3RhbmNlJywnc2NvcGVQYXJlbnQnLCAnZW9sZmlsZXMnLFxuICAgIC8vICAgICAgICAgZnVuY3Rpb24oJHNjb3BlLCAkbW9kYWxJbnN0YW5jZSxzY29wZVBhcmVudCwgZW9sZmlsZXMpIHtcbiAgICAvLyAgICAgICAgICAgICAvL0NvbnRyb2xsZXIgZGUgbGEgZmVuw6p0cmUuIElsIGRvaXQgcHJlbmQgZW4gcGFyYW3DqHRyZSB0b3VzIGxlcyDDqWzDqG1lbnRzIGR1IFwicmVzb2x2ZVwiLlxuICAgIC8vICAgICAgICAgICAgICRzY29wZS5uZXdGaWxlID0gXCJcIjtcbiAgICAvLyAgICAgICAgICAgICAkc2NvcGUuZmlsZVBhdGggPSBcIlwiO1xuICAgIC8vICAgICAgICAgICAgICRzY29wZS5zYXZlID0gZnVuY3Rpb24oKSB7XG4gICAgLy8gICAgICAgICAgICAgICAgIC8vT24gcGV1dCDDqWdhbGVtZW50IGZhaXJlIGFwcGVsIMOgIHVuIHNlcnZpY2UgZGUgbm90cmUgYXBwbGljYXRpb24uXG4gICAgLy8gICAgICAgICAgICAgICAgIGVvbGZpbGVzLm5ld0ZpbGUoe2ZpbGVOYW1lOiAkc2NvcGUubmV3RmlsZSwgZmlsZVBhdGg6JHNjb3BlLm5ld1BhdGh9KTtcbiAgICAvLyAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAvLyAgICAgICAgICAgICB9O1xuICAgIC8vICAgICAgICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgLy8gICAgICAgICAgICAgfTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgcmVzb2x2ZToge1xuICAgIC8vICAgICAgICAgLy8gRklYTUUgZG9uJ3QgZXZlbiBuZWVkIGEgJ3Jlc29sdmUnIG5vdy4gcmVtb3ZlIGl0LlxuICAgIC8vICAgICAgICAgc2NvcGVQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiAkc2NvcGU7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9O1xuICAgIC8vXG4gICAgLy8gJHNjb3BlLmZpbGVDcmVhdGVXaWRnZXQgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJG1vZGFsLm9wZW4oY3JlYXRlRGlhbG9nT3B0cyk7XG4gICAgLy8gfTtcbiAgICAvLyB2YXIgZWRpdERpYWxvZ09wdHMgPSB7XG4gICAgLy8gICAgIHRlbXBsYXRlVXJsOiAndGVtcGxhdGVzL0ZpbGVFZGl0Lmh0bWwnLFxuICAgIC8vICAgICBjb250cm9sbGVyOiBbJyRzY29wZScsICckbW9kYWxJbnN0YW5jZScsJ3Njb3BlUGFyZW50JywgJ2VvbGZpbGVzJyxcbiAgICAvLyAgICAgICAgIGZ1bmN0aW9uKCRzY29wZSwgJG1vZGFsSW5zdGFuY2UsIHNjb3BlUGFyZW50LCBlb2xmaWxlcykge1xuICAgIC8vICAgICAgICAgICAgIC8vQ29udHJvbGxlciBkZSBsYSBmZW7DqnRyZS4gSWwgZG9pdCBwcmVuZCBlbiBwYXJhbcOodHJlIHRvdXMgbGVzIMOpbMOobWVudHMgZHUgXCJyZXNvbHZlXCIuXG4gICAgLy8gICAgICAgICAgICAgJHNjb3BlLm5ld0ZpbGUgPSBcIlwiO1xuICAgIC8vICAgICAgICAgICAgICRzY29wZS5maWxlUGF0aCA9IFwiXCI7XG4gICAgLy8gICAgICAgICAgICAgJHNjb3BlLnNhdmUgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgLy9PbiBwZXV0IMOpZ2FsZW1lbnQgZmFpcmUgYXBwZWwgw6AgdW4gc2VydmljZSBkZSBub3RyZSBhcHBsaWNhdGlvbi5cbiAgICAvLyAgICAgICAgICAgICAgICAgZW9sZmlsZXMuZWRpdEZpbGVCeUluZGV4KCk7IC8ve2ZpbGVOYW1lOiAkc2NvcGUubmV3RmlsZSwgZmlsZVBhdGg6JHNjb3BlLm5ld1BhdGh9KTtcbiAgICAvLyAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICAvLyAgICAgICAgICAgICB9O1xuICAgIC8vICAgICAgICAgICAgICRzY29wZS5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgJG1vZGFsSW5zdGFuY2UuZGlzbWlzcygnY2FuY2VsJyk7XG4gICAgLy8gICAgICAgICAgICAgfTtcbiAgICAvLyAgICAgICAgIH1cbiAgICAvLyAgICAgXSxcbiAgICAvLyAgICAgcmVzb2x2ZToge1xuICAgIC8vICAgICAgICAgc2NvcGVQYXJlbnQ6IGZ1bmN0aW9uKCkge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiAkc2NvcGU7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAvLyB9O1xuICAgIC8vICRzY29wZS5lZGl0RmlsZUJ5SW5kZXggPSBmdW5jdGlvbigpIHtcbiAgICAvLyAgICAgJG1vZGFsLm9wZW4oZWRpdERpYWxvZ09wdHMpO1xuICAgIC8vIH07XG59XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnQ3Jlb2xFZGl0JykuZmFjdG9yeSgnZG9tcGFyc2VyJywgW2Z1bmN0aW9uKCl7XG4gICAgdmFyIGluc3RhbmNpYXRlRmlsZXNGcm9tRG9tID0gZnVuY3Rpb24oeG1sU3RyKXtcbiAgICAgICAgdmFyIHBhcnNlciA9IG5ldyBET01QYXJzZXIoKTtcbiAgICAgICAgdmFyIGRvY3VtZW50ID0gcGFyc2VyLnBhcnNlRnJvbVN0cmluZyh4bWxTdHIsICdhcHBsaWNhdGlvbi94bWwnKTtcbiAgICAgICAgcmV0dXJuIGxvYWRGaWxlc0Zyb21Eb20oZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJmaWxlXCIpKTtcbiAgICB9O1xuICAgIHZhciBsb2FkRmlsZXNGcm9tRG9tID0gZnVuY3Rpb24oZmlsZUVsZW1lbnRzKXtcbiAgICAgICAgdmFyIGRvbWZpbGVzID0gW107XG4gICAgICAgIGZvcih2YXIgaT0wO2k8ZmlsZUVsZW1lbnRzLmxlbmd0aDtpKyspe1xuICAgICAgICAgICAgZmlsZUVsZW1lbnQgPSBmaWxlRWxlbWVudHNbaV07XG4gICAgICAgICAgICBpZiAoZmlsZUVsZW1lbnQuaGFzQXR0cmlidXRlcygpKSB7XG4gICAgICAgICAgICAgICAgdmFyIGF0dHJzID0gZmlsZUVsZW1lbnQuYXR0cmlidXRlcztcbiAgICAgICAgICAgICAgICB2YXIgZmlsZWF0dHJzID0ge307XG4gICAgICAgICAgICAgICAgZm9yKHZhciBqPWF0dHJzLmxlbmd0aCAtIDE7IGogPj0gMDsgai0tKSB7XG4gICAgICAgICAgICAgICAgICAgIGZpbGVhdHRyc1thdHRyc1tqXS5uYW1lXSA9IGF0dHJzW2pdLnZhbHVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBkb21maWxlcy5wdXNoKGZpbGVhdHRycyk7XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgIC8vIEZJWE1FIGRvIHNvbWV0aGluZyAtPiBzaG91bGQgbm90IGhhcHBlblxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkb21maWxlcztcbiAgICB9O1xuICAgIHZhciBkb21wYXJzZXJBUEkgPSB7XG4gICAgICAgIGxvYWRGaWxlczogaW5zdGFuY2lhdGVGaWxlc0Zyb21Eb21cbiAgICB9O1xuICAgIHJldHVybiBkb21wYXJzZXJBUEk7XG59XSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnQ3Jlb2xFZGl0Jykuc2VydmljZSgnZW9sZmlsZXMnLCBmdW5jdGlvbihkb21wYXJzZXIpe1xuICAgIC8vIEZJWE1FIDogbWFrZSB1bml0dGVzdHMgd2l0aCB0aGlzXG4gICAgLy8gdmFyIGxvYWRGaWxlcyA9IGZ1bmN0aW9uIGxvYWRGaWxlcygpe1xuICAgIC8vICAgICAgICAgcmV0dXJuIFt7XG4gICAgLy8gICAgICAgICAgICAgICAgIG5hbWU6J250cC5jb25mJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgcGF0aDogJy9ldGMvJ1xuICAgIC8vICAgICAgICAgICAgIH0se1xuICAgIC8vICAgICAgICAgICAgICAgICBuYW1lOiAnbnRwZGF0ZScsXG4gICAgLy8gICAgICAgICAgICAgICAgIHBhdGg6ICcvZXRjL2RlZmF1bHQvJ1xuICAgIC8vICAgICAgICAgICAgIH0se1xuICAgIC8vICAgICAgICAgICAgICAgICBuYW1lOiAnaG9zdCcsXG4gICAgLy8gICAgICAgICAgICAgICAgIHBhdGg6ICcvZXRjL3N0cmFuZ2UvJ1xuICAgIC8vICAgICAgICAgICAgIH0se1xuICAgIC8vICAgICAgICAgICAgICAgICBuYW1lOiAnYWN0aXZlX3RhZ3MnLFxuICAgIC8vICAgICAgICAgICAgICAgICBwYXRoOiAnL3Vzci9zaGFyZS9lcmEvYmFja2VuZC9kYXRhLydcbiAgICAvLyAgICAgICAgICAgICB9XTtcbiAgICAvLyAgICAgfTtcbiAgICAvLyB2YXIgZmlsZXMgPSBsb2FkRmlsZXMoKTtcbiAgICBcbiAgICB0aGlzLmZpbGVzID0gW107XG4gICAgdGhpcy5uZXdGaWxlID0gZnVuY3Rpb24gKG5ld0ZpbGUpe1xuICAgICAgICB0aGlzLmZpbGVzLnB1c2gobmV3RmlsZSk7XG4gICAgfTtcbiAgICB0aGlzLnJlbW92ZUZpbGVCeUluZGV4ID0gZnVuY3Rpb24oaW5kZXgpe1xuICAgICAgICB0aGlzLmZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfTtcblxufSk7XG4iLCJyZXF1aXJlKCcuL2ZpbGVzJykgO1xucmVxdWlyZSgnLi92YXJpYWJsZXMnKSA7XG5yZXF1aXJlKCcuL2RvbXBhcnNlcicpIDtcbiIsImFuZ3VsYXIubW9kdWxlKCdDcmVvbEVkaXQnKS5mYWN0b3J5KCdlb2x2YXJzJywgW2Z1bmN0aW9uKCl7XG4gICAgdmFyIGxvYWRWYXJzID0gZnVuY3Rpb24gKCl7XG4gICAgICAgICAgICByZXR1cm4gW3tcbiAgICAgICAgICAgICAgICAgICAgbmFtZTonbnRwLmNvbmYnLFxuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnL2V0Yy8nXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdudHBkYXRlJyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJy9ldGMvZGVmYXVsdC8nXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdob3N0JyxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJy9ldGMvc3RyYW5nZS8nXG4gICAgICAgICAgICAgICAgfSx7XG4gICAgICAgICAgICAgICAgICAgIG5hbWU6ICdhY3RpdmVfdGFncycsXG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICcvdXNyL3NoYXJlL2VyYS9iYWNrZW5kL2RhdGEvJ1xuICAgICAgICAgICAgICAgIH1dO1xuICAgICAgICB9O1xuICAgIHZhciB2YXJpYWJsZXMgPSBsb2FkVmFycygpO1xuXG4gICAgdmFyIFZhcnNNYW5hZ2VyQVBJID0ge1xuICAgICAgICB2YXJpYWJsZXM6IHZhcmlhYmxlc1xuICAgICAgICAvLyBuZXdWYXI6IGZ1bmN0aW9uIChuZXdWYXJJdGVtKXtcbiAgICAgICAgLy8gICAgIHZhcnMucHVzaCh7XG4gICAgICAgIC8vICAgICAgIG5hbWU6IG5ld1Zhckl0ZW0udmFyTmFtZSxcbiAgICAgICAgLy8gICAgICAgdHlwZTogbmV3VmFySXRlbS52YXJUeXBlXG4gICAgICAgIC8vICAgICB9KTtcbiAgICAgICAgLy8gfSxcbiAgICAgICAgLy8gcmVtb3ZlVmFyQnlJbmRleDogZnVuY3Rpb24oaW5kZXgpIHtcbiAgICAgICAgLy8gICAgIGZpbGVzLnNwbGljZShpbmRleCwgMSk7XG4gICAgICAgIC8vIH0sXG4gICAgICAgIC8vIGVkaXRWYXJCeUluZGV4OiBmdW5jdGlvbihpbmRleCl7XG4gICAgICAgIC8vICAgICB2YXJzW2luZGV4XS52YXJOYW1lID0gJ2VkaXRlJztcbiAgICAgICAgLy8gICAgIHZhcnNbaW5kZXhdLnZhcnR5cGUgPSAnZWRpdGVkZmlsZXR5cGUnO1xuICAgICAgICAvLyB9XG4gICAgfTtcbiAgICByZXR1cm4gVmFyc01hbmFnZXJBUEk7XG59XSk7XG4iXX0=
