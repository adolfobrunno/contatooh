exports.config = {
	specs: ['../test/e2e/**/*Spec.js'],
	onPrepare: function(){
		browser.driver.get('http://localhost:3000/#/auth');
		browser.driver.findElement(by.id('entrar-github')).click();
		browser.driver.findElement(by.id('login_field')).sendKeys('adolfo.brunno.ba@gmail.com');
		browser.driver.findElement(by.id('password')).sendKeys('abba84652');
		browser.driver.findElement(by.name('commit')).click();
	}
}