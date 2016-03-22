var app = angular.module('patient-info', []);

app.controller("PatientInfoController", ["$scope", "FHIRService",
  function($scope, FHIRService) {
    $scope.SearchPatientById = function(id) {
      FHIRService.getPatientById(id, function(data) {
        $scope.curPatient = data.entry[0].resource;
        $scope.curPatientName = getPatientName($scope.curPatient);
        $scope.curPatientAddress = getPatientAddress($scope.curPatient);
      });
    }

    var getPatientName = function(patient) {
      return patient.name[0].given.join(" ") + " " + patient.name[0].family.join(" ");
    }

    var getPatientAddress = function(patient) {
      return patient.address[0].line + ", " + patient.address[0].city + ", " 
        + patient.address[0].state + " " + patient.address[0].postalCode;
    }
  }
]);