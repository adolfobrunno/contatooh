var MongoClient = require('mongodb').MongoClient;

var usuario = {_id: ObjectId('1'), nome: 'Adolfo', email: 'adolfo.brunno.ba@gmail.com'}

var contatos = [
{nome: 'xyz', email: 'xyz@test.com', usuario: usuario},
{nome: 'xyz2', email: 'xyz2@test.com', usuario: usuario}
];

MongoClient.connect('mongodb://127.0.0.1:27017/contatooh_test', 
	function(err,db){
		if(err) throw err;

		db.dropDatabase(function(erro){
			if(erro) return console.log(erro);
			console.log('Conectado com sucesso');
			db.collection('usuarios').insert(usuario, 
				function(err, inserted){
					if(err) return console.log(err);
					console.log('Usuario inserido');
					db.collection('contatos').insert(contatos,
						function(err, inserted){
							if(err) return console.log(err);
							console.log('Banco populado com sucesso');
							process.exit(0);
						});
				});
			
		})
	})