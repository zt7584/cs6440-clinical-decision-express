var app = angular.module('main', []);

app.controller("MainController", ["$scope", "$state", "FHIRService", "CDEDataProvider", "MessageModalProvider",
    function ($scope, $state, FHIRService, CDEDataProvider, MessageModalProvider) {
        var PT_ARR = undefined;

        var getFilteredPatientID = function(str) {
            if (PT_ARR === undefined) {
                PT_ARR = PT[10].split(",");
            }
            var filteredResult = [];
            for (var iter = 0; iter < PT_ARR.length; iter++) {
                if (PT_ARR[iter] !== "" && PT_ARR[iter].toLowerCase().indexOf(str.toLowerCase()) !== -1) {
                    filteredResult.push(PT_ARR[iter]);
                }
            }
            return filteredResult;
        }

        $scope.getPatientID = function(str) {
            var filteredResult = getFilteredPatientID(str);
            if (filteredResult.length > 5) {
                return filteredResult.slice(0, 5);
            }
            return filteredResult;
        }

        $scope.SearchPatientById = function(patientId) {
            FHIRService.getPatientById(patientId, function (data) {
                if (false === data || data.total === 0) {
                    MessageModalProvider.error("No Patient Found! Please Try Again!");
                }
                else {
                    // Store the patient object into cache
                    CDEDataProvider.setCurrentPatient(data.entry[0].resource);
                    $state.go('patient-info');
                }
            });
        }
    }
]);