'use strict';

angular.module('controllers', [])

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

.controller('AppCtrl', ['getDataSvc', '$scope', '$ionicModal', '$timeout', '$http', function(getDataSvc, $scope, $ionicModal, $timeout, $http) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:

  // Camp date data
  var campLiveUrl = 'http://rachelfryan.com/CampShutout/camps.json';
  var campLocalUrl = "js/json/camps.json";
  $scope.data = [];
  $scope.$on('$ionicView.enter', function(e) {
    getDataSvc.GetData(campLiveUrl, campLocalUrl).then(function(jsonData) {
      $scope.data = jsonData;
    });
  });

  $scope.openPage = function(site) {
    window.open(site, '_system', 'location=yes');
  }
  $scope.doRefresh = function() {
    getDataSvc.GetData(campLiveUrl, campLocalUrl).then(function(jsonData) {
      $scope.data = jsonData;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

}])

// ------ Session group ------------
.controller('sessionGrpCtrl', function($scope, $timeout, getDataSvc) {
  // Session groups
  var sessionLiveUrl = 'http://rachelfryan.com/CampShutout/session_groups.json';
  var sessionLocalUrl = "js/json/session_groups.json";

  $scope.day = "";
  $scope.names = [];
  $scope.$on('$ionicView.enter', function(e) {
    getDataSvc.GetData(sessionLiveUrl, sessionLocalUrl).then(function(jsonData) {
      $scope.day = jsonData.day;
      $scope.names = jsonData.results;
    });
  });


  $scope.doRefresh = function() {
    getDataSvc.GetNewData(sessionLiveUrl, sessionLocalUrl).then(function(jsonData) {
      $scope.day = jsonData.day;
      $scope.names = jsonData.results;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  // Toggle for groups
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    // console.log(group)
    return $scope.shownGroup === group;
  };

})

// ------ Travel groups ------------
.controller('travelGrpCtrl', function($scope, $timeout, getDataSvc) {
  // Travel groups
  var travelLiveUrl = 'http://rachelfryan.com/CampShutout/travel_groups.json';
  var travelLocalUrl = "js/json/travel_groups.json";

  // Updates travel groups
  $scope.day = "";
  $scope.names = [];
  $scope.$on('$ionicView.enter', function(e) {
    getDataSvc.GetData(travelLiveUrl, travelLocalUrl).then(function(jsonData) {
      $scope.day = jsonData.day;
      $scope.names = jsonData.results;
    });
  });

  $scope.doRefresh = function() {
    getDataSvc.GetNewData(travelLiveUrl, travelLocalUrl).then(function(jsonData) {
      $scope.day = jsonData.day;
      $scope.names = jsonData.results;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
  // $scope.clearGroup = function() {
  //   console.log($scope.names[0].kids[0].isChecked, $scope.camper)
  //   angular.forEach($scope.names.kids.isChecked, function (n) {
  //     console.log('here')
  //   });
  // };
  // Toggle for groups
  $scope.toggleGroup = function(group) {
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
      // $scope.clearGroup();
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    // console.log(group)
    return $scope.shownGroup === group;
  };

})

// ----Campers list -------
.controller('campersCtrl', function($scope, $timeout, getDataSvc) {
  // Camper data
  var campersLiveUrl = 'http://rachelfryan.com/CampShutout/campers.json';
  var campersLocalUrl = "js/json/campers.json";

  // Updates session groups
  $scope.names = [];
  $scope.$on('$ionicView.enter', function(e) {
    getDataSvc.GetData(campersLiveUrl, campersLocalUrl).then(function(names) {
      $scope.names = names;
    });
  });

  $scope.search = function(row) {
    return !!((row.fname.indexOf($scope.query || '') !== -1 || row.room.indexOf($scope.query || '') !== -1));
  };

  $scope.doRefresh = function() {
    getDataSvc.GetNewData(campersLiveUrl, campersLocalUrl).then(function(names) {
      $scope.names = names;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.clearSearch = function() {
    $scope.search = '';
  };
})

// ----Roster for competitions -------
.controller('rosterCtrl', function($scope, $timeout, getDataSvc) {
  // Camper data
  var rosterLivelUrl = 'http://rachelfryan.com/CampShutout/roster.json';
  var rosterLocalUrl = "js/json/roster.json";

  // Updates session groups
  $scope.names = [];
  $scope.$on('$ionicView.enter', function(e) {
    getDataSvc.GetData(rosterLivelUrl, rosterLocalUrl).then(function(names) {
      $scope.names = names;
    });
  });

  $scope.search = function(row) {
    return !!((row.fname.indexOf($scope.query || '') !== -1 || row.room.indexOf($scope.query || '') !== -1));
  };

  $scope.doRefresh = function() {
    getDataSvc.GetNewData(rosterLivelUrl, rosterLocalUrl).then(function(names) {
      $scope.names = names;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.clearSearch = function() {
    $scope.search = '';
  };
})

// ------ Schedule page ------------
.controller('calCtrl', function($scope, $filter, $timeout, getDataSvc) {
  // $scope.currDate = Number(new Date("July 25, 2017 23:59:59"));
  $scope.currDate = Number(new Date());
  // $scope.intDate = 1468254600000;

  // Data files
  var calLiveUrl = 'http://rachelfryan.com/CampShutout/cal.json';
  var calLocalUrl = "js/json/cal.json";

  $scope.cal = [];
  $scope.$on('$ionicView.enter', function(e) {
    getDataSvc.GetData(calLiveUrl, calLocalUrl).then(function(jsonData) {
      $scope.cal = jsonData;
    });
  });

  $scope.doRefresh = function() {
    $scope.currDate = Number(new Date());
    getDataSvc.GetNewData(calLiveUrl, calLocalUrl).then(function(jsonData) {
      $scope.cal = jsonData;
      // Stop the ion-refresher from spinning
      $scope.$broadcast('scroll.refreshComplete');
    });
  };
})

.filter('timeConvert', function() {
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, optional1, optional2) {
    var output = new Date(input);
    var realoutput;

    var hours = output.getHours();
    var minutes = output.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    realoutput = hours + ':' + minutes + ' ' + ampm;

    // Do filter work here
    return realoutput;
  }
})

.filter('timeNumber', function() {
  // In the return function, we must pass in a single parameter which will be the data we will work on.
  // We have the ability to support multiple other parameters that can be passed into the filter optionally
  return function(input, optional1, optional2) {
    var realoutput = Number(new Date(input));
    return realoutput;
  }
})


// Game rules controllers
.controller('gameCtrl', ['$scope', function($scope) {
  $scope.toggleGroup = function(group) {
    // console.log(group)
    if ($scope.isGroupShown(group)) {
      $scope.shownGroup = null;
    } else {
      $scope.shownGroup = group;
    }
  };
  $scope.isGroupShown = function(group) {
    return $scope.shownGroup === group;
  };
}]);
