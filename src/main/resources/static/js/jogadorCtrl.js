'use strict'
var app = angular.module('trustGameApp', [ 'ngAnimate', 'angularSpinner' ]);

app.directive('dynamic', function($compile, $timeout) {
	return {
		restrict : 'A',
		replace : true,
		link : function(scope, ele, attrs) {
			var func = function() {
				scope.$watch(attrs.dynamic, function(dynaProp) {
					ele.html(dynaProp);
					$compile(ele.contents())(scope);
					scope.$broadcast('directiveOK', true);
				});
			}
			$timeout(func, 0);
		}
	};
});

app.service('mainService', function() {
	return {
		safeApply : function($scope, fn, e1) {
			var phase = $scope.$root.$$phase;
			if (phase == '$apply' || phase == '$digest') {
				if (fn && typeof fn === 'function') {
					fn(e1);
				}
			} else {
				$scope.$apply(fn);
			}
		},
	};
});

app.controller('JogadorCtrl', JogadorCtrl);
function JogadorCtrl($scope, $http, $compile, $location, $rootScope,
		usSpinnerService, mainService) {

	$scope.instrumentos = [];
	$scope.qtdMarcados = 0;
	$scope.isCheck = false;
	$scope.tipoDoJogo = true;
	$scope.enviouA = true;
	$scope.enviouB = true;
	$scope.optionsJogador1 = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
			15 ];
	$scope.repasseJogador1 = [];

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
			$scope.enviouA = false;
		});
		$("#sendB").click(function() {
			$scope.sendNameB();
			$scope.enviouB = false;
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
		$("#greetings").append("<tr><td>" + message + "</td></tr>");
	}
}