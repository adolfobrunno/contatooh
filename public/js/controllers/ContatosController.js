angular.module('contatooh').controller('ContatosController', function($scope, Contato){

	$scope.contatos = []
	$scope.filtro = '';
	$scope.mensagem = {texto: ''};

	function buscaContatos(){
		Contato.query(
		function(contatos){
			$scope.contatos = contatos;
			$scope.mensagem = {};
		},
		function(err){
			console.log(err);
			$scope.mensagem = {texto: 'Não foi possível obter a lista.'}
		})	
	}

	$scope.remove = function(contato){
		console.log(contato);
		Contato.delete({id: contato._id}, buscaContatos, 
			function(err){
				console.log(err);
				$scope.mensagem = {texto: 'Não foi possível remover contato.'}
			});
	}

	buscaContatos();

	

	
})