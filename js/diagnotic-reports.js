var app = angular.module('diagnostic-reports', []);

app.controller("DiagnosticReportsController", ["$scope", "$uibModal", "FHIRService", "ElasticService",
    function($scope, $uibModal, FHIRService, ElasticService) {
        FHIRService.fetchDiagnosticReports(FETCH_DIAGNOSTIC_REPORTS, function(data) {
            $scope.diagnosticReports = data.entry;
            populateEncounterStatistics($scope.diagnosticReports);
        });

        $scope.openDiagnosticReportDetails = function(diagnosticReport) {
            $uibModal.open({
                templateUrl: 'templates/diagnostic-reports-details.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'DiagnosticReportDetailsController',
                resolve: {
                    diagnosticReport: function() {
                        return diagnosticReport.resource;
                    }
                }
            });
        }

        /*
         * The following code is used to generate some data for graph
         */
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

app.controller("DiagnosticReportDetailsController", ["$scope", "$uibModalInstance", "$uibModal", "diagnosticReport", "FHIRService",
    function($scope, $uibModalInstance, $uibModal, diagnosticReport, FHIRService) {
        $scope.diagnosticReport = diagnosticReport;

        $scope.openPatientDetails = function(patientId) {
            FHIRService.getPatientById(patientId, function(data) {
                $uibModal.open({
                    templateUrl: 'templates/patient-details.html?bust=' + Math.random().toString(36).slice(2),
                    controller: 'PatientDetailsController',
                    resolve: {
                        patient: function() {
                            return data.entry[0].resource;
                        }
                    }
                });
            });
        }

        $scope.openEncounterDetails = function(encounterId) {
            FHIRService.getEncounterById(encounterId, function(data) {
                $uibModal.open({
                    templateUrl: 'templates/encounter-details.html?bust=' + Math.random().toString(36).slice(2),
                    controller: 'EncounterDetailsController',
                    resolve: {
                        encounter: function() {
                            return data.entry[0].resource;
                        }
                    }
                });
            });
        }

        $scope.openPerformerDetails = function(performerId) {
            FHIRService.getPractitionerById(performerId, function(data) {
                $uibModal.open({
                    templateUrl: 'templates/practitioner-details.html?bust=' + Math.random().toString(36).slice(2),
                    controller: 'PractitionerDetailsController',
                    resolve: {
                        practitioner: function() {
                            return data.entry[0].resource;
                        }
                    }
                });
            });
        }

        $scope.Cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    }
]);

app.controller("PatientDetailsController", ["$scope", "$uibModalInstance", "patient",
    function($scope, $uibModalInstance, patient) {
        $scope.patient = patient;
        $scope.patientName = getPatientName(patient);
        $scope.patientAddress = getPatientAddress(patient);

        $scope.Cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    }
]);

app.controller("PractitionerDetailsController", ["$scope", "$uibModalInstance", "practitioner",
    function($scope, $uibModalInstance, practitioner) {
        $scope.practitioner = practitioner;


        $scope.Cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    }
]);

app.controller("EncounterDetailsController", ["$scope", "$uibModalInstance", "$uibModal", "encounter", "FHIRService",
    function($scope, $uibModalInstance, $uibModal, encounter, FHIRService) {
        $scope.encounter = encounter;

        $scope.openPatientDetails = function(patientId) {
            FHIRService.getPatientById(patientId, function(data) {
                $uibModal.open({
                    templateUrl: 'templates/patient-details.html?bust=' + Math.random().toString(36).slice(2),
                    controller: 'PatientDetailsController',
                    resolve: {
                        patient: function() {
                            return data.entry[0].resource;
                        }
                    }
                });
            });
        }

        $scope.openParticipantDetails = function(participantId) {

        }

        $scope.openConditionDetails = function(participantId) {

        }

        $scope.openLocationDetails = function(participantId) {

        }

        $scope.openOrganizationDetails = function(participantId) {

        }

        $scope.Cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    }
]);