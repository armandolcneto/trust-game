var app = angular.module('trustGameApp', []);

app.controller('adminCtrl', function($scope,$http,$location) {
  
	$scope.experimentos = [];
	$scope.novoExperimento = [];
	$scope.novo = false;
	$scope.jogador1 = [];
	$scope.jogador2 = [];
	$scope.novoJogador = [];
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
		}else{
			tipo = "ADM"
		}
		
		$scope.novoJogador.id = null;
		$scope.novoJogador.configJogo = $scope.novoExperimento;
		$scope.novoJogador.tipo = tipo;
		$scope.novoJogador.saldoAcumulado = 0;
	

		$http({url : 'http://' + window.location.host + '/criarUsuario', method : "POST", data : $scope.novoJogador}). 
		success(function(data, status, headers, config) {
			console.log("deu certo");
		}).
		error(function(data, status, headers, config) {
			console.log("não deu :-(");
		});
		
	}
	
	$scope.criarExperimento = function() {
	
		$scope.novoExperimento.id = null;
		$scope.novoExperimento.tipoJogo = "S";
		$scope.novoExperimento.montante = 10;
		$scope.novoExperimento.qtdpessoas = 2;
		$scope.novoExperimento.multiplicador = 3;
		$scope.novoExperimento.conversaoMoeda = 0.45;
			
		
		$http({url : 'http://' + window.location.host + '/criarExperimento', method : "POST", data : $scope.novoExperimento}). 
			then(function(data, status, headers, config) {
				console.log(data);
				console.log("ACERTOOOOO MISERAVEL");
				//$scope.novoExperimento = data;
			}),(function(data, status, headers, config) {
				console.log("não deu experimento");
			});
		
	}
	
});