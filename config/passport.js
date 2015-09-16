var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');

module.exports = function(){

	var Usuario = mongoose.model('Usuario');

	passport.use(new GitHubStrategy({
		clientID: '917d293b6ba7f6994751',
		clientSecret: '94c6fe6b1493e1230b68fa4f7f0ecab64af12801',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done){

		Usuario.findOrCreate(
			{"login": profile.username},
			{"nome": profile.username},
			function(err, usuario){
				if(err){
					console.log(err);
					return done(err);
				}
				return done(null, usuario);
			}
		)
	}));

	passport.serializeUser(function(usuario, done){
		done(null, usuario._id);
	})

	passport.deserializeUser(function(id, done){
		Usuario.findById(id).exec()
			.then(function(usuario){
				done(null, usuario);
			})
	})
}
