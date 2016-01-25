exports.config = {
	seleniumAddress: 'http://127.0.0.1:4444/wd/hub'
	,specs: [
		'spec/auth.spec.js'
		,'spec/settings.spec.js'
		,'spec/submarket.spec.js'
		,'spec/store.spec.js'
		,'spec/order.spec.js'
	]
	,allScriptsTimeout: 20000
	,onPrepare: function() {

		require('jasmine-reporters');

		var mkdirp = require('mkdirp')
        	,reportsDir = 'reports/'

        mkdirp.sync(reportsDir)

	    jasmine.getEnv().addReporter(
	    	new jasmine.JUnitXmlReporter(reportsDir, true, true, 'report.')
	    );
	},rootElement:'#app'

}