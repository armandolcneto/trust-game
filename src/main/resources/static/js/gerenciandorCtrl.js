angular.module("trustGameApp").controller("gerenciandorCtrl", function($scope, $http, $location) {

	$scope.tipoDoJogo = true;
	$scope.optionsJogador2 = [];
	$scope.repasseJogador2 = [];
	$scope.round = 0;
	$scope.saldoAcumuladoB = 0;
	$scope.saldoRodadaB = 0;
	$scope.msgsaldoRodada = "Aguarde o envio do jogador A para fazer seu envio!";
	$scope.Rodadas = false;
	$scope.proxima = false;
	$scope.valorEnviadoA ="";
	$scope.valorRecebidoA ="";
	$scope.msgBook = false;
	
    var myParam = queryObj();
	
	function queryObj() {
	    var result = {}, keyValuePairs = location.href.slice(1).split("&");
	    keyValuePairs.forEach(function(keyValuePair) {
	        keyValuePair = keyValuePair.split('=');
	        result[decodeURIComponent(keyValuePair[0])] = decodeURIComponent(keyValuePair[1]) || '';
	    });
	    return result;
	}
	
	$scope.idJogo = parseInt(myParam.jogo);
	$scope.idPerfil = parseInt(myParam.perfil);
	$scope.tipoJogador =myParam.tipo;
	$scope.cmbBook =myParam.book;
	
	//$scope.perfil = perfil;
	
	function showBookKeeping(){
//		if ($scope.Rodadas > 10){
//			if (perfil.bookKepping)
//			{	
//				return true;
//				
//			}
//			else{
//				return false;
//			}
//		}
//		else{
//			return false;
//		}
	}
	
	$scope.generateOptions = function(value) {
		var array = [];
		var i = 0;
		array.push(i);
		for (var i = 0; i < value; i++) {
			array.push(i + 1);
		}
		return array;
	}
	$scope.update = function(experimento) {

	};

	angular.element(document).ready(function() {
		$("form").on('submit', function(e) {
			e.preventDefault();
		});
		$("#connect").click(function() {
			$scope.connect();
		});
		$("#disconnect").click(function() {
			$scope.disconnect();
		});
		$("#sendB").click(function() {
			$scope.sendNameB();
		});
	});

	$scope.stompClient = null;

	$scope.setConnected = function(connected) {
		$("#connect").prop("disabled", connected);
		$("#disconnect").prop("disabled", !connected);
		if (connected) {
			$("#conversation").show();
		} else {
			$("#conversation").hide();
		}
		$("#greetings2").html("");
	}

	$scope.connect = function() {
		var socket = new SockJS('/gs-guide-websocket');
		$scope.stompClient = Stomp.over(socket);
		$scope.stompClient.connect({},function(frame) {
			$scope.setConnected(true);
			console.log('Connected: ' + frame);
			$scope.stompClient.subscribe('/topic/greetings2',
				function(greeting2) {
					$scope.showGreeting(JSON.parse(greeting2.body).content);
				});
		});
	}
	
	$scope.disconnect = function() {
		if ($scope.stompClient != null) {
			$scope.stompClient.disconnect();
		}
		$scope.setConnected(false);
		console.log("Disconnected");
	}

	$scope.sendNameB = function() {
		
		if ($("#valorEnviadoB").val() != '? undefined:undefined ?' && $("#valorEnviadoB").val() != '? object:null ?'){
			$scope.stompClient.send("/app/hello", {}, JSON.stringify({
				'valorEnviado' : $("#valorEnviadoB").val(),
				'id_perfil': $scope.idPerfil,
				'nome' : "Jogador B",
				'grupo': "B",
				'destino' : "http://"+window.location.host+"/gerenciador.html/id=5",
				'book' : $("#bookKepping").val()
			}));	
			
			$scope.saldoAcumuladoB -= parseFloat($("#valorEnviadoB").val());
			$scope.saldoRodadaB -= parseFloat($("#valorEnviadoB").val());
			//$scope.msgsaldoRodada = "Saldo do "+$scope.round+"º Round: R$ "+$scope.saldoRodadaB+",00";
			$scope.valorEnviadoA = "Valor Enviado para o Jogador A: $ "+$("#valorEnviadoB").val()+",00";
			//Saldo Acumulado de B
			var jogo = {id : $scope.idJogo, tipoJogo : 'S', montante : 10.00, qtdpessoas : 1, mutiplicador : 3, conversaoMoeda : 0.45};
			var dataObj2 = {
				id : $scope.idPerfil,
				conifgJofo : jogo,
				tipoPerfil : $scope.tipoJogador,
				saldoAcumulado : $scope.saldoAcumuladoB
			};
			
			$http({url : 'http://' + window.location.host + '/saldoAcumulado', method : "POST", data : dataObj2}).
			success(function(data, status, headers, config) {
				console.log("deu certo");
			}).
			error(function(data, status, headers, config) {
				console.log("não deu :-(");
			});
			
			if ($scope.round < 20) {
				$scope.msgsaldoRodada = "Aguarde o envio do jogador A para fazer seu envio!";
			}else{
				$scope.desabilitaBotao = true;
				$scope.msgsaldoRodada = "Fim do Jogo!";
				$scope.valorRecebidoA = "Saldo do Jogador B: $"+$scope.saldoAcumuladoB+",00";
				$scope.valorEnviadoA = "";
			}
			
			$scope.optionsJogador2 = [];
			
			$scope.desabilitaBotao = true;
			$scope.proxima = true;
	   }
	}

	$scope.showGreeting = function(message) {
		var obj = JSON.parse(message, function(k, v) { 
			console.log(k);
			return v;
		});
		
		$scope.round += 1;
		$scope.saldoRodadaB = 0;
		
		if ($scope.round <= 20) {
			$("#greetings2").append("<tr><td>" + $scope.round + "º Round</td></tr>" /*- Agora é a sua vez de jogar!</td><td> "+ 
					"Valor Recebido do Jogador A: R$" + obj.valor + ",00" + "</td></tr>"*/);
			
			
			//carregar combo do jogador B
			$scope.optionsJogador2 = [];
			$scope.optionsJogador2 = $scope.generateOptions(obj.valor);
			$('#valorEnviadoB').change();
			$scope.valorRecebidoA = "Valor Recebido pelo o Jogador A: $ "+obj.valor+",00";
			$scope.proxima = false;
			$scope.desabilitaBotao = false;
			//Saldo Acumulado de B
			$scope.saldoAcumuladoB += parseFloat(obj.valor);
			$scope.saldoRodadaB += parseFloat(obj.valor);
			//$scope.Rodadas = "Rounds";
			$scope.msgsaldoRodada = "";
			//Saldo do {{round}}&ordm; Round: R$ {{saldoRodadaB}},00
			var jogo = {id : $scope.idJogo, tipoJogo : 'S', montante : 10.00, qtdpessoas : 1, mutiplicador : 3, conversaoMoeda : 0.45};
			var dataObj2 = {
				id : $scope.idPerfil,
				conifgJofo : jogo,
				tipoPerfil : $scope.tipoJogador,
				saldoAcumulado : $scope.saldoAcumuladoB
			};
			
			$http({url : 'http://' + window.location.host + '/saldoAcumulado', method : "POST", data : dataObj2}).
			success(function(data, status, headers, config) {
				console.log("deu certo");
			}).
			error(function(data, status, headers, config) {
				console.log("não deu :-(");
			});
		
			// trânferencia do valor que A enviou
			var perfilA = {
					id : obj.id_perfil,
					conifgJofo : jogo,
					tipoPerfil : 'INV',
					saldoAcumulado : $scope.saldoAcumuladoB
				};
			var dataObj = {
				id : null,
				perfilJogador : perfilA,
				envioJogador : parseFloat(obj.valor),
				tempo : 1,
				roundJogo : $scope.round,
				tipoJogador : obj.grupo,
				conifgJofo : jogo,
				saldoAcumulado : $scope.saldoAcumuladoB

			};

			$http({url : 'http://' + window.location.host + '/transferencia', method : "POST", data : dataObj}). 
			success(function(data, status, headers, config) {
				console.log("deu certo");
			}).
			error(function(data, status, headers, config) {
				console.log("não deu :-(");
			});
			
			if ($scope.round > 10){
				if ($scope.cmbBook == 'true'){
					if($scope.round == 11){
						$scope.msgBook = true;
					}else{
						$scope.msgBook = false;
					}
					$scope.Rodadas = true;
				
					// Book Kepping do jogador A
					 var perfilB = {
							id : obj.id_perfil,
							conifgJofo : jogo,
							tipoPerfil : 'INV',
							saldoAcumulado : $scope.saldoAcumuladoB
						};
					var dataObj3 = {
						id : null,
						perfilJogador : perfilA,
						book : obj.book,
						roundJogo : $scope.round,
						conifgJofo : jogo
					};
							
					 $http({url: 'http://'+window.location.host+'/bookKepping', method:"POST", data: dataObj3}).
					 success(function(data, status, headers, config) {
						 console.log("deu certo");
					 }).
					 error(function(data, status, headers, config) {
						 console.log("não deu :-(");
					 });
				}	 
			}	 
			 
			 $scope.fimround = "";
			 
		}
	}

	$scope.showCanal = function() {
		console.log($scope.stompClient.ws);
	}
	
});

//CODIGOS COMENTADOS -------------verificar se vão ser usados!!

//$scope.stompClient
// .subscribe(
// '/topic/greetings4',
// function(greeting4) {
// $scope
// .showGreeting4(JSON
// .parse(greeting4.body).content);
// });


//$scope.stompClient.send("/app/hello4", {}, JSON
// .stringify({
// 'valorEnviado' : $("#valorEnviadoB").val(),
// 'user': "Euler"
// }));

//$scope.showGreeting4 = function(message) {
// if ($scope.round <= 5) {
// $("#greetings2").append(
// "<tr><td>Fim do "+$scope.round+"º Round</td><td> " +
// "Valor Enviado para o Jogador A: R$"+ message+",00" + "
// }</td></tr>");
//
// if ($scope.round == 5){
// $("#greetings2").append(
// "<tr><td align=center>Fim do Jogo!</td></tr>");
// }
// var usuarioB = {id : 2, username: 'armando.neto',
// password : '123456'};
// var dataObj = {
// id : null,
// usuario : usuarioB,
// envioJogador : parseFloat(message),
// tempo : 1,
// roundJogo : $scope.round,
// tipoJogador : 'B'
//									
// };
//
// $http({url:
// 'http://'+window.location.host+'/transferencia', method:
// "POST", data: dataObj}).
// success(function(data, status, headers, config) {
// console.log("deu certo");
// }).
// error(function(data, status, headers, config) {
// console.log("não deu :-(");
// });
// }
// }