angular.module('contatooh').controller('ContatoController', function($scope, $routeParams){
	
	console.log($routeParams.idContato);
	$scope.idContato = $routeParams.idContato;
})