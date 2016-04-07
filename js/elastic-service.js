var elasticService = angular.module("elastic-service", []);

elasticService.provider("ElasticService", [
  function() {
    this.$get = ["$http", "$base64", function($http, $base64) {
      return {
        putBulk: function(index, type, id, data) {
					$http.defaults.headers.common.Authorization = 'Basic ' + $base64.encode('admin:admin');
          $http.put(
            PUT_JSON
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
        }
      }
    }];
  }
]);
