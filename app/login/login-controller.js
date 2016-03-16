'use strict';
/*global angular*/
angular.module('plotlets.login', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'login/login-view.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', ['$scope','$http','md5','$location',function($scope,$http,md5,$location) {
  $scope.login = function(){
    var password_hash = md5.createHash($scope.password || '');
    var login_data = {'email':$scope.email, 'password':password_hash};
    $http({
      url: "https://academic-llama-k80v.imrapid.io/login",
      method: 'POST',
      data: login_data
    }).then(function(result){
      console.log(result.status);
      if(result.status==200){
        $location.path('/plots');
        window.sessionStorage.setItem('userid',$scope.email);
      }
    });
  }
}]);
