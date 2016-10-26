angular
		.module("trustGameApp")
		.controller(
				"gerenciandorCtrl",
				function($scope, $http, $location) {

					$scope.instrumentos = [];
					$scope.qtdMarcados = 0;
					$scope.isCheck = false;
					$scope.tipoDoJogo = true;
					$scope.enviouB = true;
					$scope.round = 0;
					$scope.saldoAcumuladoB = 0;
					$scope.optionsJogador2 = [];
					$scope.repasseJogador2 = [];

					$scope.generateOptions = function(value){
						var array = [];
						for(var i=0;i < value;i++){
							array.push(i+1);
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
						$scope.stompClient
								.connect(
										{},
										function(frame) {
											$scope.setConnected(true);
											console.log('Connected: ' + frame);
											$scope.stompClient
													.subscribe(
															'/topic/greetings2',
															function(greeting2) {
																$scope
																		.showGreeting(JSON
																				.parse(greeting2.body).content);
															});
											$scope.stompClient
													.subscribe(
															'/topic/greetings4',
															function(greeting4) {
																$scope
																		.showGreeting4(JSON
																				.parse(greeting4.body).content);
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
						$scope.stompClient.send("/app/hello", {}, JSON
								.stringify({
									'valorEnviado' : $("#valorEnviadoB").val(),
									'user': "Euler"
								}));
//						$scope.stompClient.send("/app/hello4", {}, JSON
//								.stringify({
//									'valorEnviado' : $("#valorEnviadoB").val(),
//									'user': "Euler"
//								}));
					}

					$scope.showGreeting = function(message) {
						var obj =  JSON.parse(message, function(k, v ){
							console.log(k); 
							return v;
						});
						$scope.round += 1;
						if ($scope.round <= 5) {
							$("#greetings2").append(
									"<tr><td>"+$scope.round+"º Round</td><td> " +
									"Valor Recebido do Jogador A: R$"+ obj.valor+",00" + "</td></tr>");
							$scope.optionsJogador2 = [];
							$scope.optionsJogador2 = $scope.generateOptions(obj.valor);
							$('#valorEnviadoB').change();
							$scope.saldoAcumuladoB += parseFloat(message);
							var usuarioB = {id : 2, username: 'armando.neto', password : '123456'};
							var jogo = {id : 1, tipoJogo: 'S', montante : 10.00, qtdpessoas : 1, mutiplicador : 3, conversaoMoeda : 0.45};
							
							var dataObj2 = {
									id : 3,
									usuario : usuarioB,
									conifgJofo : jogo,
									tipoPerfil : 'INV',
									saldoAcumulado : $scope.saldoAcumuladoB
									
							};

							$http({url: 'http://'+window.location.host+'/saldoAcumulado', method: "POST", data: dataObj2}).
							success(function(data, status, headers, config) {
								console.log("deu certo");
							}).
							error(function(data, status, headers, config) {
								console.log("não deu :-(");
							});
							if($scope.round == 5) {
								$("#greetings2").append(
										"<tr><td></td><td>Fim do Jogo!</td></tr>");
							}
						}
					}
					$scope.showGreeting4 = function(message) {
						if ($scope.round <= 5) {
							$("#greetings2").append(
									"<tr><td>Fim do "+$scope.round+"º Round</td><td> " + 
									"Valor Enviado para o Jogador A: R$"+ message+",00" + " }</td></tr>");

							if ($scope.round == 5){
								$("#greetings2").append(
								"<tr><td align=center>Fim do Jogo!</td></tr>");
							}
							var usuarioB = {id : 2, username: 'armando.neto', password : '123456'};
							var dataObj = {
									id : null,
									usuario : usuarioB,
									envioJogador : parseFloat(message),
									tempo : 1,
									roundJogo : $scope.round,
									tipoJogador : 'B'
									
							};

							$http({url: 'http://'+window.location.host+'/transferencia', method: "POST", data: dataObj}).
							success(function(data, status, headers, config) {
								console.log("deu certo");
							}).
							error(function(data, status, headers, config) {
								console.log("não deu :-(");
							});
						}	
					}
				
					$scope.showCanal= function(){
						console.log($scope.stompClient.ws);
					}
				});