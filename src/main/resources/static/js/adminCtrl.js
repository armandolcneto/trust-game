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
	$scope.criarUsuario = criarUsuario;
	
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
		if(!$scope.novoExperimento.id){
			$scope.criarExperimento();
		}
		
		if(tipo == "investidor"){
			tipo = "INV"
		}
		else{
			tipo = "GER"
		}
		

		var inData  = {'jogo': $scope.novoExperimento, 'tipo': tipo};
//		$http.post('http://' + window.location.host + '/criarUsuario', inData). 	
//			success(function(data, status, headers, config) {
//					if(data.perfil.tipo == 'investidor')
//						jogador1 = data.perfil;
//					else
//						jogador2 = data.perfil;
//			}).
//			error(function(data, status, headers, config) {
//				console.log("não deu :-(");
//		});
//	}
		$http({url : 'http://' + window.location.host + '/criarUsuario', method : "POST", data : tipo}). 
		success(function(data, status, headers, config) {
			console.log("deu certo");
		}).
		error(function(data, status, headers, config) {
			console.log("não deu :-(");
		});
		console.log("ACERTOOOOO MISERAVEL");
	}
	
	$scope.criarExperimento = function() {
	
	$scope.novoExperimento.id = null;
	$scope.novoExperimento.tipoJogo = "S";
	$scope.novoExperimento.montante = 10;
	$scope.novoExperimento.qtdpessoas = 2;
	$scope.novoExperimento.multiplicador = 3;
	$scope.novoExperimento.conversaoMoeda = 0.45;
		
	
	$http({url : 'http://' + window.location.host + '/criarExperimento', method : "POST", data : $scope.novoExperimento}). 
		success(function(data, status, headers, config) {
			console.log(data);
			console.log("ACERTOOOOO MISERAVEL");
			//$scope.novoExperimento = data;
		}).
		error(function(data, status, headers, config) {
			console.log("não deu experimento");
		});
		
	}
	
});