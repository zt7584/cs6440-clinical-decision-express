var appModule = angular.module('app',
    ['ui.router',
     'app.routes',
     'fhir-service',
     'patient-info',
		 'elasticui',
     'elastic-service',
		 'base64']);
		 
appModule.constant('euiHost', 'http://383841da62cb454fa7ad4d51c9685e7c.us-west-1.aws.found.io:9200');

