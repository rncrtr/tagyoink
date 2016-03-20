'use strict';
/*global angular*/
// Declare app level module which depends on views, and components
angular.module('plotlets', [
  'ngRoute',
  'angular-md5',
  'plotlets.plots',
  'plotlets.signup',
  'plotlets.login',
  'plotlets.dataService'
]).
config(['$routeProvider',function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/plots'});
}]).run(function($rootScope){
  $rootScope.api_base_url = 'https://plotlets-rncrtr.c9users.io';
  
  if(window.sessionStorage.getItem('userid')){
    $rootScope.userid = window.sessionStorage.getItem('userid');
  }
});