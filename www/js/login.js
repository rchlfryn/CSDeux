angular.module('login', [])

.controller('LoginCtrl', ['$scope', 'LoginService', '$ionicPopup', '$state', '$ionicHistory', function($scope, LoginService, $ionicPopup, $state, $ionicHistory) {
  $scope.$on('$ionicView.beforeEnter', function(e) {
    // console.log((window.localStorage.getItem('password')) === 'cs89')
    if ((window.localStorage.getItem('password')) === 'cs89') {
      // Won't let you go back to login page after success
      $ionicHistory.nextViewOptions({ disableBack: true });
      $state.go('app.staff');
    } else {
      $state.go('app.login');
    }
  });

  $scope.data = {};

  $scope.login = function() {
    console.log('password', $scope.data.password)
    LoginService.loginUser($scope.data.password).success(function(data) {
      // Won't let you go back to login page after success
      $ionicHistory.nextViewOptions({ disableBack: true });
      $state.go('app.staff');
    }).error(function(data) {
      var alertPopup = $ionicPopup.alert({
        title: "CS Staff Only",
        template: 'This information has been blocked for privacy of campers.'
      });
    });
  }
}])


.service('LoginService', function($q) {
  return {
    loginUser: function(pw) {
      var deferred = $q.defer();
      var promise = deferred.promise;

      if (pw == 'cs89') {
        window.localStorage.setItem('password', pw);
        console.log('pasword saved')
        deferred.resolve('Welcome!');
      } else {
        deferred.reject('Wrong credentials.');
      }
      promise.success = function(fn) {
        promise.then(fn);
        return promise;
      }
      promise.error = function(fn) {
        promise.then(null, fn);
        return promise;
      }
      return promise;
    }
  }
});
