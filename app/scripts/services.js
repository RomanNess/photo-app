angular.module('photoApp.services', [])
  .value('version', '0.1')
  .factory('galleryService', [
    "$http",
    "$rootScope",
    "$route",
    "config",
    function ($http, $rootScope, $route, config) {
      var model =
      {
        userList: [],
        selectedUser: 1,
        reload: function () {
          $rootScope.$broadcast('galleryService.change');
          $route.reload();
        }
      };

      $http.get(config.webservice + "/users")
        .success(function(data, status) {
          model.userList = data;
        })
        .error(function(data, status) {
          console.log("GET /users failed: " + status);
        });

      //console.log(model)

      return model;
    }
  ])
  .factory('config', [function () {
    return {
      webservice: window.location.protocol + '//' + window.location.hostname + ':8080/photo-server',
      debug: true
    };

  }]);