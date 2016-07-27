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
  $rootScope.api_base_url = 'https://tag-yoink-rncrtr.c9users.io';
});