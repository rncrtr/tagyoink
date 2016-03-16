'use strict';
/*global angular*/
/*global $scope*/
/*global md5 */ 
angular.module('plotlets.signup', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/signup', {
    templateUrl: 'signup/signup-view.html',
    controller: 'SignupCtrl'
  });
}])

.controller('SignupCtrl', ['$http','$scope','md5','$location',function($http,$scope,md5,$location) {
  $scope.signup = function(){
    if($scope.password == $scope.password_confirm){
        var password_hash = md5.createHash($scope.password || '');
        var login_data = {'email':$scope.email, 'password':password_hash};
        $http({
          url: "https://academic-llama-k80v.imrapid.io/signup",
          method: 'POST',
          data: login_data
        }).then(function(result){
          console.log(result.status);
          if(result.status==200){
            $location.path('/login');
          }else if(result.status!=200){
            if(confirm('Your email is already in the system. Would you like to login?')){
              $location.path('/login');
            }
          }
        });
    }
  }
}]);