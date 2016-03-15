'use strict';
/*global angular*/
angular.module('plotlets.plots', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plots', {
    templateUrl: 'plots/plots-list.html',
    controller: 'PlotsCtrl'
  });
}])

.controller('PlotsCtrl', [function($http) {
  $http({
    url: "academic-llama-k80v.imrapid.io/stories",
    method: 'GET'
  }).then(result){
    console.log(result);
  };


}]);

//////////////