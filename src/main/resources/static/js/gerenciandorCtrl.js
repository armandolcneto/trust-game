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
					$scope.round = 0
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
									'valorEnviado' : $("#valorEnviadoB").val()
								}));
						$scope.stompClient.send("/app/hello4", {}, JSON
								.stringify({
									'valorEnviado' : $("#valorEnviadoB").val()
								}));
					}

					$scope.showGreeting = function(message) {
						$scope.round += 1
						if ($scope.round <= 5) {
							$("#greetings2").append(
									"<tr><td>{ Inicio do "+$scope.round+"º Round</td><td> " +
									"Valor Recebido do Jogador A: R$"+ message+",00" + "</td></tr>");
							$scope.optionsJogador2 = [];
							$scope.optionsJogador2 = $scope.generateOptions(message);
							$('#valorEnviadoB').change();
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
							var dataObj = {
									id : null,
									usuario : 2,
									envioJogador : parseFloat(message),
									tempo : 1,
									roundJogo : $scope.round,
									tipoJogador : 'INV'
									
							};

							$http({url: 'http://'+window.location.host+'/transferencia', method: "POST", data: dataObj}).
							success(function(data, status, headers, config) {
								console.log("deu certo");
							}).
							error(function(data, status, headers, config) {
								console.log("data.token " + data.token);
							});
						}	
					}
				});