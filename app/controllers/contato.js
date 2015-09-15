var contatos = []

module.exports = function(app){

	var controller = {};
	var Contato = app.models.contato;


	controller.listaContatos = function(req, res){

		Contato.find().populate('emergencia').exec()
			.then(function(contatos){
				res.json(contatos);
			},
			function(err){
				console.log(err);
				res.status(500).json(err);
			})
	};

	controller.obtemContato = function(req, res){

		var _id = req.body._id;
		Contato.findById(_id).exec()
			.then(function(contato){
				if(!contato){ throw new Error('Contato não encontrado.') }
				res.json(contato);
			}, function(err){
				console.log(err);
				res.status(404).json(err);
			})

	};

	controller.removeContato = function(req, res){

		var _id = req.params.id;
		Contato.remove({"_id": _id}).exec()
			.then(function(){
				res.end();
			}, function(err){
				return console.error(err);
			})



	};

	controller.salvaContato = function(req, res){

		var _id = req.body._id;

		req.body.emergencia = req.body.emergencia || null;

		if(_id){
			Contato.findByIdAndUpdate(_id, req.body).exec()
				.then(function(contato){
					res.json(contato);
				}, function(err){
					console.log(err);
					res.status(500).json(err);
				})
		}else{
			Contato.create(req.body)
				.then(function(contato){
					res.status(201).json(contato);
				}, function(err){
					console.log(err);
					res.status(500).json(err);
				})
		}

	};

	return controller;
}