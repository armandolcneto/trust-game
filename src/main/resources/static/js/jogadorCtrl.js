angular
		.module("trustGameApp")
		.controller(
				"jogadorCtrl",
				function($scope, $http, $location) {

					$scope.instrumentos = [];
					$scope.qtdMarcados = 0;
					$scope.isCheck = false;
					$scope.tipoDoJogo = true;
					$scope.optionsJogador1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
					$scope.repasseJogador1 = [];
					$scope.round = 0

					$scope.enviouA == undefined

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
							$scope.disableButton = true;
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
						$scope.stompClient
								.connect(
										{},
										function(frame) {
											$scope.setConnected(true);
											console.log('Connected: ' + frame);
											$scope.stompClient
													.subscribe(
															'/topic/greetings',
															function(greeting) {
																$scope
																		.showGreeting(JSON
																				.parse(greeting.body).content);
															});
											$scope.stompClient
													.subscribe(
															'/topic/greetings3',
															function(greeting3) {
																$scope
																		.showGreeting3(JSON
																				.parse(greeting3.body).content);
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
						$scope.stompClient
								.send("/app/hello2", {},
										JSON
												.stringify({
													'valorEnviado' : $(
															"#valorEnviadoA")
															.val() * 3
												}));
						$scope.stompClient
								.send("/app/hello3", {},
										JSON
												.stringify({
													'valorEnviado' : $(
															"#valorEnviadoA")
															.val() * 3
												}));
					}

					$scope.showGreeting = function(message) {
						if ($scope.round <= 5) {
							$("#greetings").append(
									"<tr><td>[ Fim do " + $scope.round
											+ "º Round</td><td> " + message
											+ " ]</td></tr>");
							$scope.disableButton = false;
						}
					}
					$scope.showGreeting3 = function(message) {
						$scope.round += 1
						if ($scope.round <= 5) {
							$("#greetings").append(
									"<tr><td>[ Inicio do " + $scope.round
											+ "º Round</td><td> " + message
											+ " ]</td></tr>");
						} else {
							$("#greetings").append(
									"<tr><td></td><td>Fim do Jogo!</td></tr>");
						}
					}
				});