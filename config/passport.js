var passport = require('passport');
var GitHubStrategy = require('passport-github').Strategy;
var mongoose = require('mongoose');
var FacebookStrategy = require('passport-facebook').Strategy;
var config = require('./config')();

module.exports = function(){

	var Usuario = mongoose.model('Usuario');

	passport.use(new FacebookStrategy({
		clientID: config.facebookClientID,
	    clientSecret: config.facebookClientSecret,
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
		clientID: config.githubClientID,
		clientSecret: config.githubClientSecret,
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
