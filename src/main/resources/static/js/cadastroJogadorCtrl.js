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
				saldo_acumulado : 0
		}
		
		var dataObj2 = {
			id : null,
			nome : $scope.nome,
			dataNascimento : $scope.dataNascimento,
			sexo : $scope.sexo,
			experiencia : $scope.experiencia,
			formacaoAcedemica : $scope.formacaoAcademica,
			atuacaoProfissional : $scope.atuacaoProfissional,
			perfilJogador : perfil
		};
		
		$http({url : 'http://' + window.location.host + '/cadastroJogador', method : "POST", data : dataObj2}).
		success(function(data, status, headers, config) {
			console.log("deu certo");
		}).
		error(function(data, status, headers, config) {
			console.log("não deu :-(");
		});
	}	

});

