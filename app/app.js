'use strict';
/*global angular*/
// Declare app level module which depends on views, and components
angular.module('plotlets', [
  'ngRoute',
  'plotlets.plots',
  'plotlets.version'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/plots'});
}]);
