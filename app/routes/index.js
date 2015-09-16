module.exports = function(app){

	app.get('/', function(req, res){
		var login = '';
		if(req.user){
			console.log(req.user);
			login = req.user.login;
		}
		res.render('index', {'usuarioLogado': login});
	})

}