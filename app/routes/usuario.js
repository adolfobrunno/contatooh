function verificarAutenticacao(req, res, next){
	if(req.isAuthenticated()){
		return next();
	}else{
		res.status('401').json('Não autorizado!');
	}
}

module.exports = function(app){


	var Controller = app.controllers.usuario;

	app.route('/usuario/logado')
		.get(verificarAutenticacao, Controller.pegarLogado)
		.post(verificarAutenticacao, Controller.salvarUsuario);

}