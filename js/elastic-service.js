var elasticService = angular.module("elastic-service", []);

elasticService.provider("ElasticService", [
  function() {
    this.$get = ["$http", "$base64", function($http, $base64) {
      return {
        putSingle: function(index, type, id, data) {
					$http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode(USERNAME + ':' + PASSWORD);
          $http.put(
            PUT_JSON_SINGLE
						.replace(INDEX_HOLDER, index)
						.replace(TYPE_HOLDER, type)
						.replace(ID_HOLDER, id),
						data
          )
          .success(function(data) {
            console.log(data);
          })
          .error(function(error) {
            console.log(error);
          })
        },
				
      }
    }];
  }
]);
