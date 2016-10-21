'use strict';
/*global angular*/
// Declare app level module which depends on views, and components
angular.module('tagyoink', [
  'ngRoute',
  'tagyoink.main'
]).
config(['$routeProvider',function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/'});
}]).run(function($rootScope){
  $rootScope.api_base_url = 'http://'+window.location.hostname+':8080';
  //$rootScope.api_base_url = 'https://afternoon-everglades-78580.herokuapp.com';
});
