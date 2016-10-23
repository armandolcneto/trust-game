var app = angular.module('trustGameApp', []);

app.controller('adminCtrl', function($scope,$http,$location) {
  
	$scope.experimentos = [];
	$scope.novoExperimento = [];
	$scope.novo = false;
	carregarPagina();
	
	function carregarPagina() {
		$http.get('http://'+window.location.host+'/buscarExperimentos').success( function(response) {
			$scope.experimentos = response;
		});
	}
	
});