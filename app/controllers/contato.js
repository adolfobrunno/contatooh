var contatos = []

var sanitize = require('mongo-sanitize');
var Usuario = require('./usuario')

module.exports = function(app){

	var Controller = {};
	var Contato = app.models.contato;


	Controller.listaContatos = function(req, res){

		Contato.find({'usuario': req.user}).populate('emergencia').exec()
			.then(function(contatos){
				res.json(contatos);
			},
			function(err){
				console.log(err);
				res.status(500).json(err);
			})
	};

	Controller.obtemContato = function(req, res){

		var _id = sanitize(req.params.id);
		Contato.findById(_id).exec()
			.then(function(contato){
				if(!contato){ throw new Error('Contato não encontrado.') }
				res.json(contato);
			}, function(err){
				console.log(err);
				res.status(404).json(err);
			})

	};

	Controller.removeContato = function(req, res){

		var _id = sanitize(req.params.id);
		Contato.remove({"_id": _id}).exec()
			.then(function(){
				res.end();
			}, function(err){
				return console.error(err);
			})

	};

	Controller.salvaContato = function(req, res){

		var _id = sanitize(req.body._id);

		var dados = new Contato();
		dados.nome = req.body.nome;
		dados.email = req.body.email;
		dados.emergencia = req.body.emergencia || null;
		dados.telefones = req.body.telefones;
		dados.usuario = req.user;
		console.log('----------------------')
		console.log('Dados: ' + dados);
		console.log('----------------------')

		if(_id){
			Contato.findByIdAndUpdate(_id, dados).exec()
				.then(function(contato){
					res.json(contato);
				}, function(err){
					console.log(err);
					res.status(500).json(err);
				})
		}else{
			Contato.create(dados)
				.then(function(contato){
					res.status(201).json(contato);
				}, function(err){
					console.log(err);
					res.status(500).json(err);
				})
		}

	};

	return Controller;
}