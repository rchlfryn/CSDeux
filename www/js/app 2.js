// Ionic Starter App
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js

'use strict';

angular.module('starter', [
  'ionic',
  'ionic.service.core',
  'controllers',
  'ngCordova',
  'contact',
  'maps',
  'login',
  'search'
])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    // if (window.cordova && window.cordova.plugins.Keyboard) {
    //   cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //   cordova.plugins.Keyboard.disableScroll(true);
    // }
    // if (window.StatusBar) {
    //   // org.apache.cordova.statusbar required
    //   StatusBar.styleDefault();
    // }

    // Push notifications 
    // var push = new Ionic.Push({
    //   "debug": true
    // });
    // console.log('hello world')
    // push.register(function(token) {
    //   console.log("My Device token:",token.token);
    //   push.saveToken(token);  // persist the token in the Ionic Platform
    // });

  });
})

.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
  $stateProvider

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'LoginCtrl'
      }
    }
  })

  .state('app.home', {
    url: '/home',
    views: {
      'menuContent': {
        templateUrl: 'templates/home.html'
      }
    }
  })

  .state('app.session-groups', {
    url: '/session-groups',
    views: {
      'menuContent': {
        templateUrl: 'templates/session-groups.html',
        controller: 'sessionGrpCtrl'
      }
    }
  })

  .state('app.travel-groups', {
    url: '/travel-groups',
    views: {
      'menuContent': {
        templateUrl: 'templates/travel-groups.html',
        controller: 'travelGrpCtrl'
      }
    }
  })

  .state('app.schedule', {
    url: '/schedule',
    views: {
      'menuContent': {
        templateUrl: 'templates/schedule.html',
        controller: 'calCtrl'
      }
    }
  })

  .state('app.guide_campers', {
    url: '/guide_campers',
    views: {
      'menuContent': {
        templateUrl: 'templates/guide_campers.html'
      }
    }
  })

  .state('app.sessions', {
    url: '/sessions',
    views: {
      'menuContent': {
        templateUrl: 'templates/sessions.html'
      }
    }
  })
  .state('app.map', {
    url: '/map',
    views: {
      'menuContent': {
        templateUrl: 'templates/map.html'
      }
    }
  })

  .state('app.games', {
    url: '/games',
    views: {
      'menuContent': {
        templateUrl: 'templates/games.html',
        controller: 'gameCtrl'
      }
    }
  })

// Staff inner menu
  .state('app.staff', {
    url: '/staff',
    views: {
      'menuContent': {
        templateUrl: 'templates/staff.html'
      }
    }
  })
  .state('app.guide-staff', {
    url: '/staff/guide-staff',
    views: {
      'menuContent': {
        templateUrl: 'templates/staff/guide-staff.html'
      }
    }
  })
  .state('app.sa-travel-groups', {
    url: '/staff/sa-travel-groups',
    views: {
      'menuContent': {
        templateUrl: 'templates/staff/sa-travel-groups.html',
        controller: 'travelGrpCtrl'
      }
    }
  })
  .state('app.staff-list', {
    url: '/staff/staff-list',
    views: {
      'menuContent': {
        templateUrl: 'templates/staff/staff-list.html',
        controller: 'contactApp'
      }
    }
  })

  .state('app.campers', {
    url: '/staff/campers',
    views: {
      'menuContent': {
        templateUrl: 'templates/staff/campers.html',
        controller: 'campersCtrl'

      }
    }
  })


  // Camp sessions in inner menu
  .state('app.angle_play', {
      url: '/sessions/angle_play',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/angle-play.html'
        }
      }
    })
    .state('app.breakaways', {
      url: '/sessions/breakaways',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/breakaways.html'
        }
      }
    })
    .state('app.cross_man', {
      url: '/sessions/cross_man',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/cross-mgt.html'
        }
      }
    })
    .state('app.deep_ser', {
      url: '/sessions/deep_ser',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/deep-services.html'
        }
      }
    })
    .state('app.distrib', {
      url: '/sessions/distrib',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/distribution.html'
        }
      }
    })
    .state('app.eval', {
      url: '/sessions/eval',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/eval.html'
        }
      }
    })
    .state('app.ext_dive', {
      url: '/sessions/ext_dive',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/ext-dive.html'
        }
      }
    })
    .state('app.flank_play', {
      url: '/sessions/flank_play',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/flank-play.html'
        }
      }
    })
    .state('app.handling', {
      url: '/sessions/handling',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/handling.html'
        }
      }
    })
    .state('app.low_dive', {
      url: '/sessions/low_dive',
      views: {
        'menuContent': {
          templateUrl: 'templates/sessions/low-dive.html'
        }
      }
    })

  .state('app.passback', {
    url: '/sessions/passback',
    views: {
      'menuContent': {
        templateUrl: 'templates/sessions/passbacks.html'
      }
    }
  })

  //Game Rules
  .state('app.clean', {
    url: '/games/clean',
    views: {
      'menuContent': {
        templateUrl: 'templates/games/clean.html',
        controller: 'gameCtrl'
      }
    }
  })
  .state('app.fixture', {
    url: '/games/fixture',
    views: {
      'menuContent': {
        templateUrl: 'templates/games/fixture.html',
        controller: 'calCtrl'
      }
    }
  })
  .state('app.stans_game', {
    url: '/games/stans_game',
    views: {
      'menuContent': {
        templateUrl: 'templates/games/stans_game.html',
        controller: 'gameCtrl'
      }
    }
  })

  .state('app.tkw', {
    url: '/games/tkw',
    views: {
      'menuContent': {
        templateUrl: 'templates/games/tkw.html',
        controller: 'gameCtrl'
      }
    }
  })
  .state('app.roster', {
    url: '/games/roster',
    views: {
      'menuContent': {
        templateUrl: 'templates/games/roster.html',
        controller: 'rosterCtrl'
      }
    }
  })


  //Maps
  .state('app.aerial', {
    url: '/maps/aerial',
    views: {
      'menuContent': {
        templateUrl: 'templates/maps/aerial.html',
        controller: 'MapCtrl'
      }
    }
  })

  .state('app.fields', {
    url: '/maps/fields',
    views: {
      'menuContent': {
        templateUrl: 'templates/maps/fields.html'
      }
    }
  })

  .state('app.stans', {
    url: '/maps/stans',
    views: {
      'menuContent': {
        templateUrl: 'templates/maps/stans.html'
      }
    }
  })

  .state('app.tkw_fields', {
    url: '/maps/tkw_fields',
    views: {
      'menuContent': {
        templateUrl: 'templates/maps/tkw_fields.html'
      }
    }
  });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');

});
