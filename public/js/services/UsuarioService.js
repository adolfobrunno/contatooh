angular.module('contatooh').factory('Usuario',
	function($resource){
		return $resource('/usuario/logado');
	}
)