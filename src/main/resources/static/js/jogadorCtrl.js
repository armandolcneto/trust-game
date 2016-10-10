angular.module("trustGameApp").controller("jogadorCtrl",function($scope,$http,$location){
	
	$scope.tipoDoJogo = true;
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

