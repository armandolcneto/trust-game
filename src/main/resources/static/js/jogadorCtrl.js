angular.module("trustGameApp").controller("jogadorCtrl", function($scope, $http, $location) {

	$scope.tipoDoJogo = true;
	$scope.optionsJogador1 = [ 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
	$scope.repasseJogador1 = [];
	$scope.round = 0;
	$scope.saldoAcumuladoA = 0;
	$scope.saldoRodadaA = 10;
	$scope.montante = 10;
	$scope.saldotransferenciaA = 0;
	$scope.msgsaldoRodada = "Envie um valor para o jogador B e aguarde o retorno!";
	$scope.montanteRodada = "Montante Inicial por Rounds: ";
	$scope.msgsaldoRodada2 = "Valor Enviado para o Jogador B: ";
	$scope.Rodadas = false;
	$scope.proxima = false;
	$scope.valorEnviadoB ="";
	$scope.valorRecebidoB =""; 
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
		$("#sendA").click(function() {
			$scope.sendNameA();
			$scope.sendA = "disabled";
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
		$("#greetings").html("");
	}

	$scope.connect = function() {
		var socket = new SockJS('/gs-guide-websocket');
		$scope.stompClient = Stomp.over(socket);
		$scope.stompClient.connect({},function(frame) {
			$scope.setConnected(true);
			console.log('Connected: ' + frame);
			$scope.stompClient.subscribe('/topic/greetings',
				function(greeting) {
					$scope.showGreeting(JSON.parse(greeting.body).content);
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

	$scope.sendNameA = function() {
		
		if ($("#valorEnviadoA").val() != '? undefined:undefined ?'){
			
			$scope.stompClient.send("/app/hello2", {}, JSON.stringify({
				'valorEnviado' : $("#valorEnviadoA").val() * 3,
				'id_perfil': $scope.idPerfil,
				'nome' : "Jogador A",
				'grupo': "A",
				'destino' : "http://"+window.location.host+"/gerenciador.html/id=6",
				'book' : $("#bookKepping").val()
			}));
			
			$scope.montante = 10;
			$scope.msgsaldoRodada = "";
			$scope.montanteRodada = "Montante Inicial por Rounds: ";
		    $scope.valorEnviadoB = "Valor Enviado para o Jogador B: $ "+$("#valorEnviadoA").val()+",00";
			
			   if ($scope.round >= 1) {
				    $scope.saldoRodadaA = 10;
				    $scope.saldoRodadaA -= parseFloat($("#valorEnviadoA").val());
					$scope.saldoAcumuladoA += $scope.saldoRodadaA
			   }
				if ($scope.round == 0){
					 $scope.saldoRodadaA -= parseFloat($("#valorEnviadoA").val());
					 $scope.saldoAcumuladoA += $scope.saldoRodadaA
				}else{
					$scope.msgsaldoRodada2 = "Saldo do "+$scope.round+"º Round: ";
				}
				if ($scope.round > 0 && $scope.round < 19){
					$scope.fimround = "Fim do "+$scope.round+"º round - Espere o envio do jogador B!";
				}else{
					if ($scope.round > 0){
						$scope.fimround = "Última rodada do jogo!";
					}	
				}
				
				//saldo acumulado de A
				var jogo = {id : $scope.idJogo, tipoJogo: 'S', montante : 10.00, qtdpessoas : 1, mutiplicador : 3, conversaoMoeda : 0.45};
				var dataObj2 = {
					id : $scope.idPerfil,
					conifgJofo : jogo,
					tipoPerfil : $scope.tipoJogador,
					saldoAcumulado : $scope.saldoAcumuladoA		
				};
		
				$http({url: 'http://'+window.location.host+'/saldoAcumulado', method: "POST", data: dataObj2}).
				success(function(data, status, headers, config) {
					console.log("deu certo");
				}).
				error(function(data, status, headers, config) {
					console.log("não deu :-(");
				});
			//}
				$scope.desabilitaBotao = true;
				$scope.proxima = false;
	   }
	}

	$scope.showGreeting = function(message) {
		var obj =  JSON.parse(message, function(k, v){
			console.log(k); 
			return v;
		});
		
		$scope.round += 1;
				
		if ($scope.round <= 20) {
			$("#greetings").append("<tr><td>"+$scope.round + "º Round</td></tr>" /*- Agora é a sua vez de jogar!</td><td> "+ 
					"Valor Recebido do Jogador B: R$"+ obj.valor+",00"+ "</td></tr>"*/);
			
			 $scope.valorRecebidoB = "Valor Recebido pelo o Jogador B: $ "+obj.valor+",00";
			 $scope.proxima = true;
			 $scope.desabilitaBotao = false;
			//saldo acumulado de A
			$scope.saldoAcumuladoA += parseFloat(obj.valor);
			$scope.saldoRodadaA += parseFloat(obj.valor);
			$scope.saldotransferenciaA += parseFloat(obj.valor);
			$scope.msgsaldoRodada2 = "Saldo do "+$scope.round+"º Round: ";
			var jogo = {id : $scope.idJogo, tipoJogo: 'S', montante : 10.00, qtdpessoas : 1, mutiplicador : 3, conversaoMoeda : 0.45};
			var dataObj2 = {
				id : $scope.idPerfil,
				conifgJofo : jogo,
				tipoPerfil : $scope.tipoJogador,
				saldoAcumulado : $scope.saldoAcumuladoA		
			};

			$http({url: 'http://'+window.location.host+'/saldoAcumulado', method: "POST", data: dataObj2}).
			success(function(data, status, headers, config) {
				console.log("deu certo");
			}).
			error(function(data, status, headers, config) {
				console.log("não deu :-(");
			});
			
			// tranferencia do jogador B
			var perfilB = {
					id : obj.id_perfil,
					conifgJofo : jogo,
					tipoPerfil : 'ADM',
					saldoAcumulado : $scope.saldotransferenciaA
				};
			var dataObj = {
				id : null,
				perfilJogador : perfilB,
				envioJogador : parseFloat(obj.valor),
				tempo : 1,
				roundJogo : $scope.round,
				tipoJogador : obj.grupo,
				conifgJofo : jogo,
				saldoAcumulado : $scope.saldotransferenciaA
			};
					
			 $http({url: 'http://'+window.location.host+'/transferencia', method:"POST", data: dataObj}).
			 success(function(data, status, headers, config) {
				 console.log("deu certo");
			 }).
			 error(function(data, status, headers, config) {
				 console.log("não deu :-(");
			 });
			 
			 if ($scope.round > 9){
				 if ($scope.cmbBook == 'true'){
					 $scope.Rodadas = true;
					 if ($scope.round == 10){
						 $scope.msgBook = true;
					 }else{
						 $scope.msgBook = false;
					 }
				 }
			 }		
			 if ($scope.round > 10){
				 if ($scope.cmbBook == 'true'){
					// Book Kepping do jogador B
					 var perfilB = {
							id : obj.id_perfil,
							conifgJofo : jogo,
							tipoPerfil : 'ADM',
							saldoAcumulado : $scope.saldoAcumuladoA
						};
					var dataObj3 = {
						id : null,
						perfilJogador : perfilB,
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
			 
			 if ($scope.round == 20){
				 $scope.desabilitaBotao = true;
				 $scope.msgsaldoRodada = "Fim do Jogo!";
				 $scope.valorEnviadoB = "Saldo do Jogador A: $"+$scope.saldoAcumuladoA+",00";
				 $scope.valorRecebidoB = "";
			 }else{
				 $scope.msgsaldoRodada = "Envie um valor para o jogador B e aguarde o retorno!";
			 }
		}
	}

	
	$scope.showCanal= function(){
		console.log($scope.stompClient.ws);
	}
	
});

//CODIGOS COMENTADOS -------------verificar se vão ser usados!!

//$scope.stompClient
//.send("/app/hello3", {},
//		JSON
//				.stringify({
//					'valorEnviado' : $("#valorEnviadoA").val() * 3,
//					'user': "Euler"
//				}));

//$scope.showGreeting3 = function(message) {
//if ($scope.round <= 5) {
//	$("#greetings").append(
//			"<tr><td>{ Inicio do " + $scope.round
//					+ "º Round</td><td> " + 
//					"Valor Enviado para o Jogador B: R$"+ message+",00" + "</td></tr>");
//	var usuarioA = {id : 1, username: 'anderson.pereira', password : '123456'};
//	var dataObj = {
//			id : null,
//			usuario : usuarioA,
//			envioJogador : parseFloat(message),
//			tempo : 1,
//			roundJogo : $scope.round,
//			tipoJogador : 'A'
//			
//	};
//
//	$http({url: 'http://'+window.location.host+'/transferencia', method: "POST", data: dataObj}).
//	success(function(data, status, headers, config) {
//		console.log("deu certo");
//	}).
//	error(function(data, status, headers, config) {
//		console.log("não deu :-(");
//	});
//	
//} 
//}