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
