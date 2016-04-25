var app = angular.module('patient-info', []);

app.controller("PatientInfoController", ["$scope", "$state", "FHIRService", "ElasticService",
    function ($scope, $state, FHIRService, ElasticService) {

        /*
         * Patient Related Information
         */
        $scope.searchParam = 'Patient-16687';

        $scope.SearchPatientById = function (id) {
            FHIRService.getPatientById(id, function (data) {
                $scope.curPatient = data.entry[0].resource;
                $scope.curPatientName = getPatientName($scope.curPatient);
                $scope.curPatientAddress = getPatientAddress($scope.curPatient);
                //ElasticService.putSingle('patients', 'patient', $scope.curPatient.id, $scope.curPatient);
            });
        }

        var getPatientName = function (patient) {
            return patient.name[0].given.join(" ") + " " + patient.name[0].family.join(" ");
        }

        var getPatientAddress = function (patient) {
            return patient.address[0].line + ", " + patient.address[0].city + ", "
                + patient.address[0].state + " " + patient.address[0].postalCode;
        }

        $scope.PutPatientIntoElasticSearch = function (startId, endId) {
            for (var iter = startId; iter <= endId; iter++) {
                FHIRService.getPatientById(iter, function (data) {
                    var patient = data.entry[0].resource;
                    ElasticService.putSingle('patients', 'patient', patient.id, patient);
                });
            }
        }

        /*
         * Symptom Keyword
         */
        $scope.symptomKeywords = [];
        $scope.AddSymptomKeyword = function (keyword) {
            if (keyword !== "") {
                $scope.symptomKeywords.push(keyword);
                $scope.symptomKeyword = "";
            }
        }
        $scope.RemoveSymptomKeyword = function (index) {
            $scope.symptomKeywords.splice(index, 1);
        }

        $scope.searchDiagnosticReport = function() {
            // TODO: Need to cache information of current page
            $state.go('diagnostic-reports');
        }

        /*
         * Just For Importing Data Purpose:
         * Try to load Diagnostic Report
         */

        /*var ids = "";
         var ImportDiagnosticReportToElasticSearch = function(url) {
         FHIRService.fetchDiagnosticReports(url, function(data) {
         var nextUrl = "";
         for (var iter = 0; iter < data.link.length; iter++){
         if (data.link[iter].relation === 'next') {
         nextUrl = data.link[iter].url;
         break;
         }
         }
         for (var iter = 0; iter < data.entry.length; iter++){
         //ElasticService.postSingle('fhir', 'diagnosticreport', "", data.entry[iter]);
         ids += data.entry[iter].resource.id + ",";
         }
         if (nextUrl !== "") {
         ImportDiagnosticReportToElasticSearch(nextUrl);
         console.log(nextUrl);
         } else {
         console.log(ids);
         }
         });
         }
         ImportDiagnosticReportToElasticSearch(FETCH_ALL_PATIENTS);*/

        /*
         * Just For Importing Data Purpose:
         * Finished importing patient, observation and diagnostic report data
         */

        //var allArr = [];
        //var process = function(iter) {
        //  if (iter < allArr.length) {
        //    if (allArr[iter] === "") {
        //      process(iter + 1);
        //      return;
        //    }
        //    // Get Patient by id
        //    /*FHIRService.getPatientById(allArr[iter], function(data) {
        //      var patient = data.entry[0].resource;
        //      ElasticService.putSingle('fhir', 'patient', patient.id, patient);
        //      process(iter + 1);
        //    });*/
        //    /*FHIRService.fetchDiagnosticReportById(allArr[iter], function(data) {
        //      var diagnosticreport = data.entry[0].resource;
        //      ElasticService.putSingle('fhir', 'diagnosticreport', diagnosticreport.id, diagnosticreport);
        //      process(iter + 1);
        //    });*/
        //    FHIRService.fetchObservationById(allArr[iter], function(data) {
        //      var observation = data.entry[0].resource;
        //      ElasticService.putSingle('fhir', 'observation', observation.id, observation);
        //      process(iter + 1);
        //    });
        //  }
        //}
        //var importData = function(What) {
        //  for (var iter = 0; iter < What.length; iter++) {
        //    var arr = What[iter].split(",");
        //    allArr = allArr.concat(arr);
        //  }
        //  console.log(allArr.length);
        //  process(0);
        //}
        //importData(OB);
    }
]);