
function verificarAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('Não autorizado!');
	}
}

module.exports = function (app) {
	
  var controller = app.controllers.contato;

  app.route('/contatos')
  	.get(verificarAutenticacao, controller.listaContatos)
  	.post(verificarAutenticacao, controller.salvaContato)

  app.route('/contatos/:id')
	.get(verificarAutenticacao, controller.obtemContato)
	.delete(verificarAutenticacao, controller.removeContato);
};
