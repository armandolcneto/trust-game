angular.module("trustGameApp").controller("cadastroJogadorCtrl",function($scope,$http,$location){
	
	$scope.tipoDoJogo = true;
	$scope.ativado = "ativado";
	carregarPagina();
	
	function carregarPagina() {
		$http.post('http://'+window.location.host+'/todasFormacaoAcademica').success( function(response) {
			$scope.formacoes = response;
		});
		
		$http.post('http://'+window.location.host+'/todasAtuacaoProfissional').success( function(response) {
			$scope.atuacoes = response;
		});
	}
});

