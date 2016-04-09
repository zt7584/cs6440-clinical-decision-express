angular.module('app.routes',
    ['ui.router'])
.config(function ($stateProvider, $urlRouterProvider) {
    $stateProvider
        .state('patient-info', {
            url: '/',
            views: {
                "main" : {
                    templateUrl: 'templates/patient-info.tpl.html',
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
