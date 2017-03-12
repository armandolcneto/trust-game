angular.module("trustGameApp").controller("cadastroJogadorCtrl",function($scope,$http,$location){
	
	$scope.tipoDoJogo = true;
	$scope.entrou = false;
	$scope.entrouDados = false;
	$scope.ativado = "ativado";
	$scope.perfis = {};
	$scope.dados = {};
	carregarPagina();
	
	function carregarPagina() {
		$http.get('http://'+window.location.host+'/todasFormacaoAcademica').success( function(response) {
			$scope.formacoes = response;
		});
		
		$http.get('http://'+window.location.host+'/todasAtuacaoProfissional').success( function(response) {
			$scope.atuacoes = response;
		});
		
		$http.get('http://'+window.location.host+'/todosPerfis').success( function(todosPerfis) {
			$scope.perfis = todosPerfis;
		});
		
		$http.get('http://'+window.location.host+'/dadosJogador').success( function(dadosJogador) {
			$scope.dados = dadosJogador;
		});
	}
	
	//Salvar Dados Pessoais
	$scope.salvarDadosPessoais = function () { 
		
		angular.forEach($scope.dados, function(dados) {
			if(dados.perfilJogador.id == $scope.perfilJogador){
				$scope.entrouDados = true;
			}
		});
		
		if ($scope.entrouDados == false){
			
			angular.forEach($scope.perfis, function(perfil) {
				if(perfil.id == $scope.perfilJogador){
					$scope.jogoId = perfil.conifgJofo.id;
					$scope.tipoJogador = perfil.tipoPerfil;
					$scope.cmbBook = perfil.comBookKeeping;
					$scope.entrou = true;
				}
			});
	
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
				if ($scope.tipoJogador == 'INV'){
					window.location.href = 'http://' + window.location.host + '/jogador&'+'perfil='+$scope.perfilJogador+'&jogo='+$scope.jogoId+'&tipo='+$scope.tipoJogador+'&book='+$scope.cmbBook;
				}else{
					window.location.href = 'http://' + window.location.host + '/gerenciador&'+'perfil='+$scope.perfilJogador+'&jogo='+$scope.jogoId+'&tipo='+$scope.tipoJogador+'&book='+$scope.cmbBook;
				}
			}).
			error(function(data, status, headers, config) {
			    if ($scope.entrou == false){
			    	alert('Perfil não encontrado');
			    }else{
			    	alert('Preencha todos os campos para prosseguir para o jogo!');
			    }
			});
		}else{
			alert('Dados pessoais já cadastrado para esse perfil');
			window.location.href = 'http://' + window.location.host + '/cadastroJogador'
		}
		
	}	

});

