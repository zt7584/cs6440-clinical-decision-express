var fhirService = angular.module("fhir-service", []);

fhirService.provider("FHIRService", [
  function() {
    this.$get = ["$http", function($http) {
      return {
        getPatientById: function(id, callbackFunc) {
          $http.get(
            GET_PATIENT_BY_ID
            .replace(ID_HOLDER, id)
          )
          .success(function(data) {
            callbackFunc(data);
          })
          .error(function(error) {
            console.log(error);
          })
        },
        fetchDiagnosticReports: function(callbackFunc) {
          $http.get(
              FETCH_DIAGNOSTIC_REPORTS
          )
          .success(function(data) {
            callbackFunc(data);
          })
          .error(function(error) {
            console.log(error);
          })
        }
      }
    }];
  }
]);
