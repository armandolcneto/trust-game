'use strict'
var app = angular.module('trustGameApp', ['ngAnimate', 'angularSpinner']);

app.directive('dynamic', function ($compile, $timeout) {
	return {
		restrict: 'A',
		replace: true,
		link: function (scope, ele, attrs) {
			var func = function(){
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
		safeApply: function ($scope, fn, e1) {
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

app.controller('HomeController', HomeController);


function HomeController ($scope, $http, $compile, $location, $rootScope, usSpinnerService, mainService) {
	angular.element(document).ready(function () {
		usSpinnerService.spin('spinner-1');
		$scope.mostrarSucesso = false;
		$scope.$on('directiveOK', function (event, args) {
		});
		 $("form").on('submit', function (e) {
	         e.preventDefault();
	     });
	     $( "#connect" ).click(function() { $scope.connect(); });
	     $( "#disconnect" ).click(function() { $scope.disconnect(); });
	     $( "#send" ).click(function() { $scope.sendName(); });
	});
	
	$scope.stompClient = null;

	$scope.setConnected = function (connected) {
	     $("#connect").prop("disabled", connected);
	     $("#disconnect").prop("disabled", !connected);
	     if (connected) {
	         $("#conversation").show();
	     }
	     else {
	         $("#conversation").hide();
	     }
	     $("#greetings").html("");
	 }

	$scope.connect = function () {
	     var socket = new SockJS('/gs-guide-websocket');
	     $scope.stompClient = Stomp.over(socket);
	     $scope.stompClient.connect({}, function (frame) {
	    	 $scope.setConnected(true);
	         console.log('Connected: ' + frame);
	         $scope.stompClient.subscribe('/topic/greetings', function (greeting) {
	        	 $scope.showGreeting(JSON.parse(greeting.body).content);
	         });
	     });
	 }

	$scope.disconnect = function () {
	     if ($scope.stompClient != null) {
	    	 $scope.stompClient.disconnect();
	     }
	     $scope.setConnected(false);
	     console.log("Disconnected");
	 }

	$scope.sendName = function () {
		$scope.stompClient.send("/app/hello", {}, JSON.stringify({'name': $("#name").val()}));
	 }

	$scope.showGreeting = function (message) {
	     $("#greetings").append("<tr><td>" + message + "</td></tr>");
	 }	 	
}

