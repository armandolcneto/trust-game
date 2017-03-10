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
	
	$scope.resetForm = function ()
    {
		$scope.novoExperimento.nome = "";
		$scope.jogador1.id = 0;
		$scope.jogador1.comBookKeeping = false;
		$scope.jogador2.id = 0;
		$scope.jogador2.comBookKeeping = false;
		
	}
	
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
		if(!$scope.novoExperimento.id || $scope.novoExperimento.id < 0){
			$scope.novoexperimento();
		}
		
		if(tipo == "investidor"){
			tipo = "INV"
			var dataObj2 = {
				id : null,
				conifgJofo : $scope.novoExperimento,
				tipoPerfil : tipo,
				saldoAcumulado : 0.00,
				comBookKeeping : $scope.jogador1.comBookKeeping};
		}else{
			tipo = "ADM"
			var dataObj2 = {
				id : null,
				conifgJofo : $scope.novoExperimento,
				tipoPerfil : tipo,
				saldoAcumulado : 0.00,
				comBookKeeping : $scope.jogador2.comBookKeeping};
			
		}
		
		
	

		$http({url : 'http://' + window.location.host + '/criarUsuario', method : "POST", data : dataObj2}). 
		success(function(result) {
			if(result.tipoPerfil == "INV"){
				$scope.jogador1 = result;
			}else{
				$scope.jogador2 = result;
			}
				
		}).
		error(function(result) {
			console.log("não deu :-(");
		});
		
	}
	
	$scope.novoexperimento = function() {
	
		var jogo = {id : null, 
				tipoJogo : 'S',
				nome : $scope.novoExperimento.nome,
				montante : 10.00, 
				qtdpessoas : 1, 
				mutiplicador : 3, 
				conversaoMoeda : 0.45};
		
			
		
		$http({url : 'http://' + window.location.host + '/novoexperimento', method : "POST", data : jogo}). 
			then(function(result) {
				$scope.novoExperimento = result.data;
				console.log(result.data);
				//$scope.novoExperimento = data;
			}),(function(data, status, headers, config) {
				console.log("não deu experimento");
			});
		
	}
	
});