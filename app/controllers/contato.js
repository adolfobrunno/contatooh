module.exports = function(){


	var controller = {};
	
	var contatos = [
		{_id: 1, nome: 'Adolfo Brunno', email: 'adolfo.brunno.ba@gmail.com'},
		{_id: 2, nome: 'Mariana Lima', email: 'marianaglima.to@gmail.com'}
	]
		

	controller.listaContatos = function(req, res){
		res.json(contatos);
	}

	controller.obterContato = function(req, res){

		var idContato = req.params.id;
		var contato = contatos.filter(function(contato){
			return contato._id == idContato;
		})[0];

		contato ? res.json(contato) : res.status(404).send('Contato não encontrado!');

	}

	return controller;

}