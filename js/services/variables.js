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
