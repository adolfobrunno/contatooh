var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

module.exports = function(){

	var schema = mongoose.Schema({
		nome: {
			type: String,
			required: true
		},
		email: {
			type: String,
			index: {unique: true}
		},
		facebookId: {
			type: String
		},
		inclusao: {
			type: Date,
			default: Date.now
		}
	});

	schema.plugin(findOrCreate);

	return mongoose.model('Usuario', schema);

}