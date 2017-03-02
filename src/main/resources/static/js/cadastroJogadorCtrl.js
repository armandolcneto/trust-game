angular.module("trustGameApp").controller("cadastroJogadorCtrl",function($scope,$http,$location){
	
	$scope.tipoDoJogo = true;
	$scope.ativado = "ativado";
	carregarPagina();
	
	function carregarPagina() {
		$http.get('http://'+window.location.host+'/todasFormacaoAcademica').success( function(response) {
			$scope.formacoes = response;
		});
		
		$http.get('http://'+window.location.host+'/todasAtuacaoProfissional').success( function(response) {
			$scope.atuacoes = response;
		});
	}
	
	//Salvar Dados Pessoais
	$scope.salvarDadosPessoais = function () { 
		
		var jogo = {id : $scope.jogoId, tipoJogo: 'S', montante : 10.00, qtdpessoas : 1, mutiplicador : 3, conversaoMoeda : 0.45};
		var perfil = {
				id : $scope.perfilJogador,
				conifgJofo : jogo,
				tipoPerfil : $scope.tipoJogador,
				saldo_acumulado : parseFloat(0)
		};
		
		var dataObj2 = {
			id : null,
			nome : $scope.nome,
			dataNascimento : Date.parse($scope.dataNascimento),
			sexo : $scope.sexo,
			experiencia : parseInt($scope.experiencia),
			formacaoAcedemica : $scope.formacaoAcademica,
			atuacaoProfissional : $scope.atuacaoProfissional,
			perfilJogador : perfil
		};
		
		$http({url : 'http://' + window.location.host + '/cadastroJogador', method : "POST", data : dataObj2}).
		success(function(data, status, headers, config) {
			if ($scope.tipoJogador == 'ADM'){
				window.location.href = 'http://' + window.location.host + '/jogador/'+$scope.perfilJogador+'/'+$scope.jogoId+'/'+$scope.tipoJogador;
			}else{
				window.location.href = 'http://' + window.location.host + '/gerenciador/'+$scope.perfilJogador+'/'+$scope.jogoId+'/'+$scope.tipoJogador;
			}
		}).
		error(function(data, status, headers, config) {
			console.log("não deu :-(");
		});
	}	

});

