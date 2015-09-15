angular.module('contatooh').controller('ContatosController', function($scope){

	$scope.total = 0;
	$scope.contatos = [
		{_id: 1, nome: 'Adolfo Brunno', email: 'adolfo.brunno.ba@gmail.com'},
		{_id: 2, nome: 'Mariana Lima', email: 'marianaglima.to@gmail.com'}
	]
	$scope.filtro = '';

	$scope.incrementa = function(){
		$scope.total ++;
	}
})