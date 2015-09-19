angular.module('contatooh').controller('UsuarioController', function($scope, Usuario){
	
	Usuario.get(function(usuario){
		$scope.usuario = usuario;
	})

	$scope.alterar = function(){

		console.log('alterar usuario');
		console.log($scope.usuario);

		$scope.usuario.$save()
			.then(function(){
				$scope.mensagem = {texto: 'Contato salvo com sucesso!'};
			})
			.catch(function(err){
				$scope.mensagem = {texto: 'Erro ao salvar usuário.'};
				console.log(err);
			});
	}

})