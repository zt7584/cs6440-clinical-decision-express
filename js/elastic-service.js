var elasticService = angular.module("elastic-service", []);

elasticService.provider("ElasticService", [
    function () {
        this.$get = ["$http", "$base64", function ($http, $base64) {
            return {
                /*
                 * For PUT: id is required
                 */
                putSingle: function (index, type, id, data) {
                    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(USERNAME + ':' + PASSWORD);
                    $http.put(
                        PUT_JSON_SINGLE
                            .replace(INDEX_HOLDER, index)
                            .replace(TYPE_HOLDER, type)
                            .replace(ID_HOLDER, id),
                        data
                    )
                        .success(function (data) {
                            console.log(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                /*
                 * For POST: elastic search will generate an unique id if id is not passed in
                 */
                postSingle: function (index, type, id, data) {
                    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(USERNAME + ':' + PASSWORD);
                    $http.post(
                        PUT_JSON_SINGLE
                            .replace(INDEX_HOLDER, index)
                            .replace(TYPE_HOLDER, type)
                            .replace(ID_HOLDER, id),
                        data
                    )
                        .success(function (data) {
                            console.log(data);
                        })
                        .error(function (error) {
                            console.log(error);
                        })
                },
                searchObservations: function (query, callbackFunc) {
                    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(USERNAME + ':' + PASSWORD);
                    $http.post(
                        SEARCH_RESOURCE
                            .replace(INDEX_HOLDER, "fhir")
                            .replace(TYPE_HOLDER, "observation"),
                        query
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            callbackFunc(error);
                        })
                },
                searchDiagnosticReports: function (query, callbackFunc) {
                    $http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(USERNAME + ':' + PASSWORD);
                    $http.post(
                        SEARCH_RESOURCE
                            .replace(INDEX_HOLDER, "fhir")
                            .replace(TYPE_HOLDER, "diagnosticreport"),
                        query
                    )
                        .success(function (data) {
                            callbackFunc(data);
                        })
                        .error(function (error) {
                            callbackFunc(error);
                        })
                },
            }
        }];
    }
]);
