var app = angular.module('trustGameApp', []);

app.controller('adminCtrl', function($scope,$http,$location) {
  
	$scope.experimentos = [];
	$scope.novoExperimento = [];
	$scope.novo = false;
	$scope.jogador1 = [];
	$scope.jogador2 = [];
	carregarPagina();
	$scope.jogador1.id = 0;
	$scope.jogador2.id = 0;
	
	function carregarPagina() {
		$http.get('http://'+window.location.host+'/buscarExperimentos').success( function(response) {
			$scope.experimentos = response;
		});
	}
	
	function camposPreenchidos(){
		if ($scope.jogador1.id > 0 && $scope.jogador2.id > 0){
			return true;
		}
		else{
			return false;
		}
		
	}
	
	function criarUsuario(tipo){
		if(!$scope.novoExperimento){
			$scope.criarExperimento();
		}
		var inData  = {'jogo': $scope.novoExperimento, 'tipo': tipo};
		$http.post('http://' + window.location.host + '/criarUsuario', inData). 	
			success(function(data, status, headers, config) {
					if(data.perfil.tipo == 'investidor')
						jogador1 = data.perfil;
					else
						jogador2 = data.perfil;
			}).
			error(function(data, status, headers, config) {
				console.log("não deu :-(");
		});
	}
	
	$scope.criarExperimento = function() {
	
	$scope.novoExperimento.id = null;
//		if($scope.tipo == "S")
			$scope.novoExperimento.qtdpessoas = 2;
//		else
//			$scope.novoExperimento.qtdpessoas = 10;
		$scope.novoExperimento.mutiplicador = 3;
		$scope.novoExperimento.conversaoMoeda = 0.45;
		$scope.novoExperimento.montante = 10;	
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