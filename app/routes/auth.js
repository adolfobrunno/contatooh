var passport = require('passport');

module.exports = function(app){

	app.get('/auth/github', passport.authenticate('github'));
	app.get('/auth/github/callback', passport.authenticate('github', {successRedirect: '/'}));

	app.get("/auth/facebook"
		, passport.authenticate("facebook"
			, { scope : ["email", "user_location"
				, "user_hometown", "user_birthday"]}
				)
		);
	app.get('/auth/facebook/callback'
		, passport.authenticate('facebook'
			, { failureRedirect: '/login' })
			, function(req, res) {
		    	res.redirect('/');
			}
		);
	app.get('/logout', function(req, res){
		req.logOut();
		res.redirect('/');
	})
}