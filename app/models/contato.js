var mongoose = require('mongoose');
var Usuario = require('./usuario');

// retorna uma 'classe' Contato

module.exports = function(){

	var Telefone = mongoose.Schema({
		tipo: {type: String},
		numero: {type: String, required: true}
	})

	mongoose.model('Telefone', Telefone);

	var schema = mongoose.Schema({
		nome: {type: String, required: true},
		email: {type: String, required: true, index:{unique: true}},
		telefones: {type: [Telefone]},
		emergencia: {type: mongoose.Schema.ObjectId, ref: 'Contato'},
		usuario: {type: mongoose.Schema.ObjectId, ref: 'Usuario'}
	});


	return mongoose.model('Contato', schema);

}