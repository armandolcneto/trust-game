angular.module("trustGameApp").controller("gerenciandorCtrl",function($scope,$http,$location){

	$scope.instrumentos = [];
	$scope.qtdMarcados = 0;
	$scope.isCheck = false;
	$scope.tipoDoJogo = true;
	$scope.optionsJogador1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
			15 ];
	$scope.repasseJogador1 = [];

	$scope.update = function(experimento) {

	};

	angular.element(document).ready(function() {

		$scope.enviouA = true;
		$scope.enviouB = true;

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
			$scope.enviouA = false;
			$scope.enviouB = true;
		});
		$("#sendB").click(function() {
			$scope.sendNameB();
			$scope.enviouB = false;
			$scope.enviouA = true;
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
		$("#greetings2").html("");
	}

	$scope.connect = function() {
		var socket = new SockJS('/gs-guide-websocket');
		$scope.stompClient = Stomp.over(socket);
		$scope.stompClient.connect({}, function(frame) {
			$scope.setConnected(true);
			console.log('Connected: ' + frame);
			$scope.stompClient
					.subscribe('/topic/greetings',
							function(greeting) {
								$scope
										.showGreeting(JSON
												.parse(greeting.body).content);
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
		$scope.stompClient.send("/app/hello", {}, JSON.stringify({
			'valorEnviado' : $("#valorEnviadoA").val() * 3
		}));
	}

	$scope.sendNameB = function() {
		$scope.stompClient.send("/app/hello", {}, JSON.stringify({
			'valorEnviado' : $("#valorEnviadoB").val()
		}));
	}
	
	$scope.showGreeting = function(message) {
		console.log("enviouA=" + $scope.enviouA + "enviouB" + $scope.enviouB);
		if($scope.enviouA == false || $scope.enviouA == undefined){
			$("#greetings2").append("<tr><td>" + message + "</td></tr>");
		}
		if($scope.enviouB == false){
			$("#greetings").append("<tr><td>" + message + "</td></tr>");
		}
	}
});