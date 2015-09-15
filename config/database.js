var mongoose = require('mongoose');

module.exports = function(uri){

	mongoose.connect(uri, {server: {poolSize: 5}});
	mongoose.set('debud', true);

	mongoose.connection.on('connected', function(){
		console.log('[mongoose] Conexão aberta em ' + uri);
	})

	mongoose.connection.on('disconnect', function(){
		console.log('[mongoose Conexão encerrada.');
	})

	mongoose.connection.on('error', function(err){
		console.log('[mongoose] Ocorreu um erro: ' + err);
	})

	process.on('SIGINT', function(){
		mongoose.connection.close(function(){
			console.log('[mongoose] Conexão encerrada devido ao fechamento da aplicação.');
			process.exit(0);
		})
	})

}