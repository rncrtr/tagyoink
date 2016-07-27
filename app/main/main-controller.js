'use strict';
/*global angular*/
/*global $*/ 
angular.module('tagyoink.main', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/', {
    templateUrl: 'main/main.html',
    controller: 'MainCtrl'
  });
}])

.controller('MainCtrl', ['$rootScope','$scope','$http','$location','$routeParams',function($rootScope,$scope,$http,$location,$routeParams) {
  $scope.search = function(){
    $scope.loader = true;
    var q = $scope.q;
    // console.log(q);
    var kwlist = [];
    $scope.keywords = '';
    $http({
      url: $rootScope.api_base_url+"/api/search",
      method: 'POST',
      data: {query:q}
    }).then(function(result){
      if(result.status==200){
        console.log(result);
        $scope.keywords = result.data;
        $scope.keywords.forEach(function(el){
          kwlist += el;
        });
        //console.log(kwlist);
        kwlist = kwlist.replace(/\.\.\./g,'');
        kwlist = kwlist.split(',');
        kwlist = kwlist.sort();
        var dupeless = kwlist.filter(function(item, pos) {
          return kwlist.indexOf(item) == pos;
        });
        var cleaned = cleanArray(dupeless);
        console.log(cleaned);
        $scope.keywords = cleaned;
        $scope.loader = false;
        // console.log($scope.keywords);
      }else{
        console.log(result.status);
      }
    });
  }
  
  
  function cleanArray(actual) {
    var newArray = new Array();
    for (var i = 0; i < actual.length; i++) {
      if (actual[i]) {
        newArray.push(actual[i]);
      }
    }
    return newArray;
  }
  
}]);
