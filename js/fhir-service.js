var fhirService = angular.module("fhir-service", []);

fhirService.provider("FHIRService", [
    function () {
        this.$get = ["$http", function ($http) {
            return {
                getPatientById: function (id, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        GET_PATIENT_BY_ID
                            .replace(ID_HOLDER, id)
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            callbackFunc(false);
                        })
                },
                fetchPatients: function (url, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        url
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                fetchDiagnosticReportById: function (id, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        FETCH_DIAGNOSTIC_REPORT_BY_ID
                            .replace(ID_HOLDER, id)
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                fetchDiagnosticReports: function (url, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        url
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                fetchObservations: function (url, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        url
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                fetchObservationById: function (id, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        FETCH_OBSERVATION_BY_ID
                            .replace(ID_HOLDER, id)
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                getEncounterById: function (id, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        GET_ENCOUNTER_BY_ID
                            .replace(ID_HOLDER, id)
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                getPractitionerById: function (id, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        GET_PRACTITIONER_BY_ID
                            .replace(ID_HOLDER, id)
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                getConditionById: function (id, callbackFunc) {
                    delete $http.defaults.headers.common['Authorization'];
                    $http.get(
                        GET_CONDITION_BY_ID
                            .replace(ID_HOLDER, id)
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                }
            }
        }];
    }
]);
