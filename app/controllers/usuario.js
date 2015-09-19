var sanitize = require('mongo-sanitize');

module.exports = function(app){

	var Controller = {};
	var Usuario = app.models.usuario;

	Controller.pegarLogado = function(req, res){
		Usuario.findById(req.user.id).exec()
			.then(function(usuario){
				if(!usuario){ throw new Error('Usuário não encontrado.') }
				res.json(usuario);
			}, function(err){
				console.log(err);
				res.status(404).json(err);
			})
	}

	Controller.salvarUsuario = function(req, res){

		var _id = sanitize(req.body._id);

		var dados = {
			"nome": req.body.nome,
			"email": req.body.email || null
		};

		if(_id){
			Usuario.findByIdAndUpdate(_id, dados).exec()
				.then(function(contato){
					res.json(contato);
				}, function(err){
					console.log(err);
					res.status(500).json(err);
				})
		}
	}


	return Controller;


}