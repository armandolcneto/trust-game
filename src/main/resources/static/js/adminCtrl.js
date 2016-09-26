'use strict'
var app = angular.module('trustGameApp',[]);
app.controller('adminCtrl', function($scope, $http) {
	
  
	$scope.experimentos = [];
	$scope.novo = false;
	$scope.buscarInstrumentos = function(){
		$http({
			url: $location.url()+'buscarExperimentos',
			method: "POST"
		})
		.then(function(response) {
			$scope.experimentos = response.data;
		});

	};
	
	$scope.update = function (experimento){
		
		
	};
	
	
	
	
});

