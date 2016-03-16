'use strict';
/*global angular*/
angular.module('plotlets.plots', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plots', {
    templateUrl: 'plots/plots-list.html',
    controller: 'PlotsCtrl'
  });
}])

.controller('PlotsCtrl', ['$rootScope','$scope','$http','$location',function($rootScope,$scope,$http,$location) {
  if(window.sessionStorage.getItem('userid')){
    var user_id = window.sessionStorage.getItem('userid');
    $http({
      url: "https://academic-llama-k80v.imrapid.io/plots",
      method: 'GET',
      data: {'user_id': user_id}
    }).then(function(result){
      if(result.status==200 && result.message == 'missing'){
        $rootScope.alert.display = true;
        $rootScope.alert.message = 'No plots to display.'
      }else{
        $scope.plots = result;
      }
    });
  }else{
    $location.path('/login');
  }
}]);
