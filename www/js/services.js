angular.module('starter.services', [])

    .service('APIInterceptor', function ($rootScope, $q) {
        var service = this;

        service.responseError = function (response) {
            if (response.status === 401) {
                $rootScope.$broadcast('unauthorized');
            }
            return $q.reject(response);
        };
    })
    // Main service to get all data from files
    .factory('getDataSvc', function($http) {
      var data = [];
      // Type = file name
      return {
        GetData: function(live, local) {
          return $http.get(live).then(function(response) {
            data = response.data;
            // console.log(data)
            return data;
          });
        },
        GetNewData: function(live, local) {
          return $http.get(live).then(function(response) {
            data = response.data;
            // console.log(data)
            return data;
          });
        }
      }
    })

    .service('ScoresModel', function ($http, Backand) {
        var service = this,
            baseUrl = '/1/objects/',
            objectName = 'scores/';

        function getUrl() {
            return Backand.getApiUrl() + baseUrl + objectName;
        }

        function getUrlForId(id) {
            return getUrl() + id;
        }

        service.all = function () {
            return $http.get(getUrl());
        };

        service.fetch = function (id) {
            return $http.get(getUrlForId(id));
        };

        service.create = function (object) {
            return $http.post(getUrl(), object);
        };

        service.update = function (id, object) {
            return $http.put(getUrlForId(id), object);
        };

        service.delete = function (id) {
            return $http.delete(getUrlForId(id));
        };
    });
