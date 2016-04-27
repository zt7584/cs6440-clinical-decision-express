angular.module('app.routes',
    ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('index', {
            url: '/',
            views: {
                "main" : {
                    templateUrl: 'templates/main.html',
                    controller: 'MainController'
                }
            }
        })
        .state('patient-info', {
            url: '/pi',
            views: {
                "main" : {
                    templateUrl: 'templates/patient-info.html',
                    controller: 'PatientInfoController'
                }
            }
        })
        .state('diagnostic-reports', {
            url: '/dr',
            views: {
                "main" : {
                    templateUrl: 'templates/diagnostic-reports-list.html',
                    controller: 'DiagnosticReportsController'
                }
            }
        });

    $urlRouterProvider.otherwise('/');
});
