'use strict';
/*global angular*/
angular.module('plotlets.dataService', ['ngRoute'])
.factory('dataService', ['$http','$rootScope',function($http,$rootScope) {
  var url = '';
  var CALL_BACK = '?callback=JSON_CALLBACK';
  var micro_headers = {
    "Accept":"application/json",
    "Content-Type":"application/json",
    "Cache-Control":"no-cache"
  };

  // accessible methods
  var service = {
    getRest: getRest
  };
  return service;

  function getRest(url,method, params){
    return $http({
      method: method.toUpperCase(),
      url: $rootScope.api_base_url+url,
      timeout: 25000,
      headers: micro_headers,
      data: params
    }).then(function(result){
      if(result.length > 0){
        return result.data;
      }
    });
  }
}]);