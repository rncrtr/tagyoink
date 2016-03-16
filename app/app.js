'use strict';
/*global angular*/
// Declare app level module which depends on views, and components
angular.module('plotlets', [
  'ngRoute',
  'angular-md5',
  'plotlets.plots',
  'plotlets.signup',
  'plotlets.login'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/plots'});
}]).run(function($rootScope){
  $rootScope.alert = {display: false, message: 'all quiet on the home front'};
});
