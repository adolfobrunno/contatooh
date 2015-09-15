angular.module('contatooh', ['ngRoute'])
.config(function($routeProvider) {
	
	$routeProvider
	.when('/contatos', {
		templateUrl: 'partials/contatos.html',
		controller: 'ContatosController'
	})
	.when('/contato/:idContato', {
		templateUrl: 'partials/contato.html',
		controller: 'ContatoController'	
	})
	.otherwise({redirectTo: '/contatos'})

});