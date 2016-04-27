var app = angular.module('patient-info', []);

app.controller("PatientInfoController", ["$scope", "$state", "$uibModal", "FHIRService", "ElasticService", "CDEDataProvider",
    "MessageModalProvider",
    function ($scope, $state, $uibModal, FHIRService, ElasticService, CDEDataProvider, MessageModalProvider) {

        /*
         * Patient Related Information
         */
        $scope.curPatient = CDEDataProvider.getCurrentPatient();
        if (false === $scope.curPatient) {
            MessageModalProvider.error("No Patient To Display! Redirect To Patient Search Page!")
            return;
        }

        var getPatientName = function (patient) {
            return patient.name[0].given.join(" ") + " " + patient.name[0].family.join(" ");
        }

        var getPatientAddress = function (patient) {
            return patient.address[0].line + ", " + patient.address[0].city + ", "
                + patient.address[0].state + " " + patient.address[0].postalCode;
        }
        $scope.curPatientName = getPatientName($scope.curPatient);
        $scope.curPatientAddress = getPatientAddress($scope.curPatient);

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
        if (CDEDataProvider.getSymptomKeywords()) {
            $scope.symptomKeywords = CDEDataProvider.getSymptomKeywords();
        } else {
            $scope.symptomKeywords = [];
        }

        var getDisplayText = function(copy) {
            var displayText = copy.keyword;
            if (copy.high_bounds === MAX) {
                displayText += " [ > " + copy.low_bounds.toFixed(1) + " (" + copy.unit + ")]";
            }
            else if (copy.low_bounds === 0) {
                displayText += " [ < " + copy.high_bounds.toFixed(1) + " (" + copy.unit + ")]"
            }
            else {
                displayText += " [ > " + copy.low_bounds.toFixed(1) + " And < " + copy.high_bounds.toFixed(1) + " (" + copy.unit + ")]";
            }
            return displayText;
        }

        var buildSymptomKeywordCopy = function(item) {
            if (item !== undefined) {
                var copy = {};
                copy.field = item.field;
                copy.keyword = item.keyword;
                copy.low_bounds = item.low_bounds;
                copy.high_bounds = item.high_bounds;
                copy.unit = item.unit;
                copy.displayText = getDisplayText(copy);
                return copy;
            }
        }

        var containsSymptomKeyword = function(item) {
            for (var iter = 0; iter < $scope.symptomKeywords.length; iter++) {
                if (item.keyword.toLowerCase() === $scope.symptomKeywords[iter].keyword.toLowerCase()) {
                    return true;
                }
            }
            return false;
        }

        var updateSymptomKeyword = function(item) {
            for (var iter = 0; iter < $scope.symptomKeywords.length; iter++) {
                if (item.keyword.toLowerCase() === $scope.symptomKeywords[iter].keyword) {
                    $scope.symptomKeywords[iter].low_bounds = item.low_bounds;
                    $scope.symptomKeywords[iter].high_bounds = item.low_bounds;
                    $scope.symptomKeywords[iter].displayText = getDisplayText($scope.symptomKeywords[iter]);
                    break;
                }
            }
            return false;
        }

        $scope.AddSymptomKeyword = function () {
            if ($scope.selectedSymptomKeyword !== undefined) {
                if (containsSymptomKeyword($scope.selectedSymptomKeyword)) {
                    MessageModalProvider.error("Symptom Keyword Already Existed!");
                    $scope.symptomKeyword = "";
                    $scope.selectedSymptomKeyword = undefined;
                } else {
                    $scope.symptomKeywords.push(buildSymptomKeywordCopy($scope.selectedSymptomKeyword));
                    CDEDataProvider.storeSymptomKeywords($scope.symptomKeywords);
                    $scope.symptomKeyword = "";
                    $scope.selectedSymptomKeyword = undefined;
                }
            } else {
                MessageModalProvider.error("No Symptom Keyword Selected!");
            }
        }
        $scope.RemoveSymptomKeyword = function (index) {
            $scope.symptomKeywords.splice(index, 1);
            CDEDataProvider.storeSymptomKeywords($scope.symptomKeywords);
        }

        var getFilteredSymptomKeywords = function(str) {
            var filteredResult = [];
            for (var iter = 0; iter < VITAL_SIGNS.length; iter++) {
                if (VITAL_SIGNS[iter].keyword.toLowerCase().indexOf(str.toLowerCase()) !== -1) {
                    filteredResult.push(VITAL_SIGNS[iter]);
                }
            }
            return filteredResult;
        }

        $scope.getSymptomKeywords = function(str) {
            var filteredResult = getFilteredSymptomKeywords(str);
            if (filteredResult.length > 5) {
                return filteredResult.slice(0, 5);
            }
            return filteredResult;
        }

        $scope.onSelect = function(item) {
            $scope.selectedSymptomKeyword = item;
        }

        $scope.searchDiagnosticReport = function() {
            if ($scope.symptomKeywords.length === 0) {
                MessageModalProvider.error("No Symptom Keywords Added!");
                return;
            }
            CDEDataProvider.storeSymptomKeywords($scope.symptomKeywords);
            $state.go('diagnostic-reports');
        }

        $scope.EditSymptomKeyword = function(vitalsign) {
            $uibModal.open({
                templateUrl: 'templates/symptom-keyword-modal.html?bust=' + Math.random().toString(36).slice(2),
                controller: 'SymptomKeywordController',
                resolve: {
                    vitalsign: function() {
                        return vitalsign;
                    }
                }
            }).result.then(function(result) {
                updateSymptomKeyword(result);
                vitalsign.displayText = getDisplayText(result);
            });
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
        //var hash = {};
        //var typeStr = "";
        //var codeStr = "";
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
        //      FHIRService.fetchObservationById(allArr[iter], function (data) {
        //          var observation = data.entry[0].resource;
        //          if (observation.component !== undefined) {
        //              for (var iii = 0; iii < observation.component.length; iii++) {
        //                  var coding = observation.component[iii].code.coding;
        //                  var valueQuantity = observation.component[iii].valueQuantity;
        //                  if (coding !== undefined && valueQuantity !== undefined) {
        //                      for (var ii = 0; ii < coding.length; ii++) {
        //                          if (false == hash.hasOwnProperty(coding[ii].code)) {
        //                              hash[coding[ii].code] = {};
        //                              hash[coding[ii].code].count = 1;
        //                              hash[coding[ii].code].unit = valueQuantity.unit;
        //                              hash[coding[ii].code].total = valueQuantity.value;
        //                              hash[coding[ii].code].avg = hash[coding[ii].code].total / hash[coding[ii].code].count;
        //                              typeStr += coding[ii].display + ",";
        //                              codeStr += coding[ii].code + ",";
        //                          } else {
        //                              hash[coding[ii].code].count += 1;
        //                              hash[coding[ii].code].total += valueQuantity.value;
        //                              hash[coding[ii].code].avg = hash[coding[ii].code].total / hash[coding[ii].code].count;
        //                          }
        //                      }
        //                  }
        //              }
        //              //console.log(JSON.stringify(hash));
        //              //console.log(hash);
        //              console.log(typeStr + "###" + codeStr);
        //              //ElasticService.putSingle('fhir', 'observation', observation.id, observation);
        //          }
        //          process(iter + 1);
        //      });
        //  } else {
        //      console.log(JSON.stringify(hash));
        //      console.log(hash);
        //      console.log(typeStr);
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

app.controller("SymptomKeywordController", ["$scope", "$uibModalInstance", "vitalsign",
    function($scope, $uibModalInstance, vitalsign) {
        $scope.vitalsign = vitalsign;

        $scope.Save = function(vitalsign) {
            $uibModalInstance.close(vitalsign);
        }

        $scope.Cancel = function() {
            $uibModalInstance.dismiss('cancel');
        }
    }
]);