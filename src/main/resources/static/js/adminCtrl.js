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
	$scope.criarExperimento = function() {
	
//		$scope.novoExperimento.id = null;
//		if($scope.tipo == "S")
//			$scope.novoExperimento.qtdpessoas = 2;
//		else
//			$scope.novoExperimento.qtdpessoas = 10;
//		$scope.novoExperimento.mutiplicador = 3;
//		$scope.novoExperimento.conversaoMoeda = 0.45;
//		$scope.novoExperimento.montante = 10;
//		
//		$http({url : 'http://' + window.location.host + '/criarExperimento', method : "POST", data : $scope.novoExperimento}). 
//		success(function(data, status, headers, config) {
//			console.log("deu certo");
//		}).
//		error(function(data, status, headers, config) {
//			console.log("não deu :-(");
//		});
		console.log("ACERTOOOOO MISERAVEL");
	}
	
});