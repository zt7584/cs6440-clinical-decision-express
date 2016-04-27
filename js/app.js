var appModule = angular.module('app',
    ['ui.router',
        'app.routes',
        'chart.js',
        'fhir-service',
        'main',
        'patient-info',
        'diagnostic-reports',
        'elasticui',
        'elastic-service',
        'base64',
        'ui.bootstrap']);

appModule.constant('euiHost', 'http://383841da62cb454fa7ad4d51c9685e7c.us-west-1.aws.found.io:9200');

appModule.service('CDEDataStore', ['$window', function ($window) {
    return {
        get: function (key) {
            if ($window.localStorage[CDE_DATA_STORE_PREFIX + key]) {
                var cart = angular.fromJson($window.localStorage[CDE_DATA_STORE_PREFIX + key]);
                return JSON.parse(cart);
            }
            return false;
        },
        set: function (key, val) {
            if (val === undefined) {
                $window.localStorage.removeItem(CDE_DATA_STORE_PREFIX + key);
            } else {
                $window.localStorage[CDE_DATA_STORE_PREFIX + key] = angular.toJson(val);
            }
            return $window.localStorage[CDE_DATA_STORE_PREFIX + key];
        }
    }
}]);

appModule.provider('CDEDataProvider', function () {
    this.$get = ['CDEDataStore', function (CDEDataStore) {
        return {
            setCurrentPatient: function (patient) {
                CDEDataStore.set('patient', JSON.stringify(patient));
            },
            getCurrentPatient: function () {
                return CDEDataStore.get('patient');
            },
            storeSymptomKeywords: function(keywords) {
                CDEDataStore.set('skwords', JSON.stringify(keywords));
            },
            getSymptomKeywords: function () {
                return CDEDataStore.get('skwords');
            }
        }
    }];
});

appModule.controller("MessageModalController", ["$scope", "$uibModalInstance", "text", "mode",
    function($scope, $uibModalInstance, text, mode) {
        $scope.data = {};
        $scope.data.text = text;
        $scope.data.mode = mode;
        if (mode === 'success') {
            $scope.data.title = "Success";
        }
        else if (mode === 'info') {
            $scope.data.title = "Info";
        }
        else if (mode === 'warning') {
            $scope.data.title = "Warning";
        }
        else if (mode === 'danger') {
            $scope.data.title = "Error";
        }
        $scope.close = function(){
            $uibModalInstance.dismiss('cancel');
        };
    }
]);

appModule.provider('MessageModalProvider', function() {
    this.$get = ['$uibModal', function ($uibModal) {
        return {
            general: function(displayText, mode, closeCallBack, dismissCallBack) {
                var modalInstance = $uibModal.open({
                    templateUrl: 'templates/message-modal.html?bust=' + Math.random().toString(36).slice(2),
                    controller: 'MessageModalController',
                    resolve: {
                        text: function() {
                            return displayText;
                        },
                        mode: function() {
                            return mode
                        }
                    }
                });
                modalInstance.result.then(closeCallBack, dismissCallBack);
            },
            success: function(displayText, closeCallBack, dismissCallBack) {
                this.general(displayText, 'success', closeCallBack, dismissCallBack);
            },
            info: function(displayText, closeCallBack, dismissCallBack) {
                this.general(displayText, 'info', closeCallBack, dismissCallBack);
            },
            warning: function(displayText, closeCallBack, dismissCallBack) {
                this.general(displayText, 'warning', closeCallBack, dismissCallBack);
            },
            error: function(displayText, closeCallBack, dismissCallBack) {
                this.general(displayText, 'danger', closeCallBack, dismissCallBack);
            }
        }
    }]
});

appModule.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val);
    };
});

