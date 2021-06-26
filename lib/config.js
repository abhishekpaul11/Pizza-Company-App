/*
 * Configuration settings for the API
 *
 */ 

//dependencies

//container
var environments = {};

//staging environment
environments.staging = {
    'httpPort' : 3000,
    'httpsPort' : 3001,
    'envName' : 'staging',
    'hashingSecret' : 'ThisIsASecret',
    'stripe': 'sk_test_4eC39HqLyjWDarjtT1zdp7dc:',
    'mailGun': {
        'domain':'sandbox0e7c75697fc24a4a88aeafad0c86a7cc.mailgun.org',
        'api': '505ed858160b13c7e639f79ee15c19c3-6ae2ecad-2277094d'
    },
    'templateGlobals' : {
        'appName' : 'Pizza Company',
        'companyName' : 'NotARealCompany, Inc.',
        'yearCreated': '2018',
        'baseUrl' : 'http://localhost:3000/'
    }
}

//production environment
environments.production = {
    'httpPort' : 5000,
    'httpsPort' : 5001,
    'envName' : 'production',
    'hashingSecret' : 'ThisIsASecret',
    'stripe': 'sk_test_4eC39HqLyjWDarjtT1zdp7dc:',
    'mailGun': {
        'domain':'sandbox0e7c75697fc24a4a88aeafad0c86a7cc.mailgun.org',
        'api': '505ed858160b13c7e639f79ee15c19c3-6ae2ecad-2277094d'
    },
    'templateGlobals' : {
        'appName' : 'Pizza Company',
        'companyName' : 'NotARealCompany, Inc.',
        'yearCreated': '2018',
        'baseUrl' : 'http://localhost:5000/'
    }
}

//get the passed environment from CLI (default to an empty string)
var passedEnvironment = typeof(process.env.ENV_NAME) == 'string' ? process.env.ENV_NAME.toLowerCase() : '';

//choose the environment to use (default to 'staging')
var environmentToUse = typeof(environments[passedEnvironment]) == 'object' ? environments[passedEnvironment] : environments.staging;

//export container
module.exports = environmentToUse;