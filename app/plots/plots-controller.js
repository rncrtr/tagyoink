'use strict';
/*global angular*/
angular.module('plotlets.plots', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/plots', {
    templateUrl: 'plots/plots-list-view.html',
    controller: 'PlotsCtrl'
  })
  .when('/plots/:id',{
    templateUrl: 'plots/plots-detail-view.html',
    controller: 'PlotsCtrl'
  });
}])

.controller('PlotsCtrl', ['$rootScope','$scope','$http','$location','dataService',function($rootScope,$scope,$http,$location,dataService) {
  $scope.showPlotAddForm = false;
  if(window.sessionStorage.getItem('userid')){
    $scope.userid = window.sessionStorage.getItem('userid')
    getPlotData($scope.userid);
  }else{
    $location.path('/login');
  }
  
  function getPlotData(userid){
    $http({
      url: $rootScope.api_base_url+"/api/plots/",
      method: 'GET',
      data: {'userid':userid}
    }).then(function(result){
      if(result.status==200 && result.data == 'missing'){
        $scope.plots = "No plots to display.";
      }else{
        $scope.plots = result.data;
      }
    });
  }
  
  $scope.savePlot = function(){
    $http({
      url: $rootScope.api_base_url+"/api/plots/",
      method: 'POST',
      data: {'name':$scope.plot_add.name,'desc':$scope.plot_add.desc,'userid': $scope.userid}
    }).then(function(result){
      if(result.status==200){
        $scope.showPlotAddForm = false;
        getPlotData($scope.userid);
      }
    });
  }
  
  $scope.viewPlot = function(id){
    $location.path('/plots/'+id);
  }
  
  $scope.editPlot = function(id){

  }
  
  $scope.deletePlot = function(id){
    $http({
      url: $rootScope.api_base_url+"/api/plots/"+id,
      method: 'DELETE'
    }).then(function(result){
      if(result.status==200){

      }
    }); 
  }
}]);