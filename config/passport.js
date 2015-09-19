var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;

module.exports = function(){

	var Usuario = mongoose.model('Usuario');

	passport.use(new FacebookStrategy({
		clientID: '1584903918437641',
	    clientSecret: '93e9ccfff177b53293f551965382a4de',
	    callbackURL: "http://localhost:3000/auth/facebook/callback",
	    enableProof: false
	}, function(accessToken, refreshToken, profile, done){
		console.log('------------------------');
		console.log(profile);
		console.log('------------------------');

		Usuario.findOrCreate(
			{"email": profile.emails[0].value || null},
			{"facebookId": profile.id, "nome": profile.displayName},
			function(err, usuario){
				if(err){
					console.log(err);
					return done(err);
				}
				return done(null, usuario);
			}
		)
	}));

	passport.use(new GitHubStrategy({
		clientID: '917d293b6ba7f6994751',
		clientSecret: '94c6fe6b1493e1230b68fa4f7f0ecab64af12801',
		callbackURL: 'http://localhost:3000/auth/github/callback'
	}, function(accessToken, refreshToken, profile, done){
		console.log('------------------------');
		console.log(profile);
		console.log('------------------------');

		Usuario.findOrCreate(
			{"email": profile.emails[0].value || null},
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
