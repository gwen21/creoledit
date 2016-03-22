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
