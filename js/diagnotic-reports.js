var app = angular.module('diagnostic-reports', []);

app.controller("DiagnosticReportsController", ["$scope", "FHIRService", "ElasticService",
    function($scope, FHIRService, ElasticService) {
        FHIRService.fetchDiagnosticReports(function(data) {
            $scope.diagnosticReports = data.entry;
            populateEncounterStatistics($scope.diagnosticReports);
        });

        var populateEncounterStatistics = function(diagnosticReports) {
            $scope.encounterLabels = [];
            $scope.encounterData = [];
            $scope.performerLabels = [];
            $scope.performerData = [];
            diagnosticReports.forEach(function(dr) {
                addIfNotExisted($scope.encounterLabels, $scope.encounterData, dr.resource.encounter.display);
                addIfNotExisted($scope.performerLabels, $scope.performerData, dr.resource.performer.display);
            });
        }

        var addIfNotExisted = function(array, cnt, str) {
            var idx = array.indexOf(str);
            if (idx === -1) {
                array.push(str);
                cnt.push(1);
            }
            else {
                cnt[idx] += 1;
            }
        }
    }
]);