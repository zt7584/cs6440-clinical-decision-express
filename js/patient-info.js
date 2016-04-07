var app = angular.module('patient-info', []);

app.controller("PatientInfoController", ["$scope", "FHIRService", "ElasticService",
  function($scope, FHIRService, ElasticService) {
    $scope.SearchPatientById = function(id) {
      FHIRService.getPatientById(id, function(data) {
        $scope.curPatient = data.entry[0].resource;
        $scope.curPatientName = getPatientName($scope.curPatient);
        $scope.curPatientAddress = getPatientAddress($scope.curPatient);
				ElasticService.putSingle('patients', 'patient', $scope.curPatient.id, $scope.curPatient);
      });
    }

    var getPatientName = function(patient) {
      return patient.name[0].given.join(" ") + " " + patient.name[0].family.join(" ");
    }

    var getPatientAddress = function(patient) {
      return patient.address[0].line + ", " + patient.address[0].city + ", " 
        + patient.address[0].state + " " + patient.address[0].postalCode;
    }

    $scope.PutPatientIntoElasticSearch = function(startId, endId) {
      for (var iter = startId; iter <= endId; iter++) {
        FHIRService.getPatientById(iter, function(data) {
          var patient = data.entry[0].resource;
          ElasticService.putSingle('patients', 'patient', patient.id, patient);
        });
      }
    }
  }
]);