angular.module('contatooh').controller('ContatoController', function($scope, $routeParams, Contato){
	
	$scope.idContato = $routeParams.idContato;
	$scope.tiposTelefone = ['Celular', 'Casa', 'Trabalho', 'Outro'];

	if($routeParams.idContato){

		Contato.get({id: $routeParams.idContato},
		function(contato){
			$scope.contato = contato;
			$scope.telefones = contato.telefones;
		}, function(err){
			$scope.mensagem = {texto: 'Não foi possível obter o contato'}
			console.log(err);
		})
	
	} else{
		$scope.contato = new Contato();
	}

	$scope.salva = function(){
		console.log('salvar')
		$scope.contato.$save()
			.then(function(){
				$scope.mensagem = {texto: 'Contato salvo com sucesso!'};
				$scope.contato = new Contato();
			})
			.catch(function(err){
				$scope.mensagem = {texto: 'Erro ao salvar contato.'};
				console.log(err);
			});
	}

	Contato.query(function(contatos){
		$scope.contatos = contatos;
	})
})