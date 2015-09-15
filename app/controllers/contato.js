var contatos = [
	{_id: 1, nome: 'Adolfo Brunno', email: 'adolfo.brunno.ba@gmail.com'},
	{_id: 2, nome: 'Mariana Lima', email: 'marianaglima.to@gmail.com'}
]

var ID_CONTATO_INC = 2;

module.exports = function(){

	var controller = {};

	controller.listaContatos = function(req, res) {
		res.json(contatos);
	};

	controller.obtemContato = function(req, res) {

		var idContato = req.params.id;
		var contato = contatos.filter(function(contato) {
			return contato._id == idContato;
		})[0];
		contato ? 
		res.json(contato) : 
		res.status(404).send('Contato não encontrado');
	};

	controller.removeContato = function(req, res) {

		var idContato = req.params.id;
		contatos = contatos.filter(function(contato) {
			return contato._id != idContato;
		});
		res.status(204).end();
	};

	controller.salvaContato = function(req, res) {

		var contato = req.body;
		contato = contato._id ?
		atualiza(contato) :
		adiciona(contato);
		res.json(contato);
	};

	function adiciona(contatoNovo) {

		contatoNovo._id = ++ID_CONTATO_INC;;
		contatos.push(contatoNovo);
		return contatoNovo;
	}

	function atualiza(contatoAlterar) {

		contatos = contatos.map(function(contato) {
			if(contato._id == contatoAlterar._id) {
				contato = contatoAlterar;
			}
			return contato;
		});
		return contatoAlterar;
	}

	return controller;
}