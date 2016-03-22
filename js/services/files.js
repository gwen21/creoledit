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
