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
	$scope.optionsJogador1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	$scope.repasseJogador1 = [];
	$scope.buscarInstrumentos = function() {
		$http({
			url : $location.url() + 'buscarExperimentos',
			method : "POST"
		}).then(function(response) {
			$scope.experimentos = response.data;
		});

	};

	$scope.update = function(experimento) {

	};

	$scope.assinarDespacho = function() {
		usSpinnerService.spin('spinner-1');
		$scope.instrumentosSelecionados = [];
		var i = 0;
		while (i < $scope.instrumentos.length) {
			if ($scope.instrumentos[i].check == true) {
				$scope.instrumentosSelecionados.push($scope.instrumentos[i]);
			}
			i++;
		}
		$http({
			url : $location.absUrl() + 'assinarDespacho',
			method : "POST",
			data : $scope.instrumentosSelecionados
		}).then(function(response) {
			$scope.mostrarSucesso = true;
			$scope.qtdMarcados = 0;
			$scope.unCheckAll();
			usSpinnerService.stop('spinner-1');
			$scope.buscarInstrumentos();

		});

	};

	$scope.iteraTermos = function() {
		if ($scope.instrumentos.length < ($scope.numTermos + 10)) {
			$scope.numTermos = $scope.instrumentos.length;
		} else {
			$scope.numTermos += 10;
		}
	}

	$scope.checkAll = function() {
		usSpinnerService.spin('spinner-1');
		var i = 0;
		while (i < $scope.instrumentos.length) {
			$scope.instrumentos[i].check = true;
			i++;
		}
		$scope.numTermos = $scope.instrumentos.length;
		$scope.qtdMarcados = $scope.instrumentos.length;
		$scope.isCheck = true;
		usSpinnerService.stop('spinner-1');
	};

	$scope.unCheckAll = function() {
		var i = 0;
		while (i < $scope.instrumentos.length) {
			$scope.instrumentos[i].check = false;
			i++;
		}
		$scope.qtdMarcados = 0;
		$scope.isCheck = false;
	};

	$scope.existeMarcado = function() {
		var state = false;
		$scope.qtdMarcados = 0;
		angular.forEach($scope.instrumentos, function(value, i) {
			if (value.check === true) {
				state = true;
				$scope.qtdMarcados += 1;
			}
		});
		$scope.isCheck = state;
	};

	$scope.imprimir = function(event) {
		console.log("teste");
	};

	angular.element(document).ready(function() {
		usSpinnerService.spin('spinner-1');
		$scope.buscarInstrumentos();
		$scope.mostrarSucesso = false;
		$scope.$on('directiveOK', function(event, args) {
		});
		$("form").on('submit', function(e) {
			e.preventDefault();
		});
		$("#connect").click(function() {
			$scope.connect();
		});
		$("#disconnect").click(function() {
			$scope.disconnect();
		});
		$("#send").click(function() {
			$scope.sendName();
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

	$scope.sendName = function() {
		$scope.stompClient.send("/app/hello", {}, JSON.stringify({
			'valorEnviado' : $("#valorEnviado").val()
		}));
	}

	$scope.showGreeting = function(message) {
		$("#greetings").append("<tr><td>" + message + "</td></tr>");
	}
}