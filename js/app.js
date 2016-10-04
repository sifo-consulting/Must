// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var mymodule=angular.module('starter', ['ionic' ,'starter.controllers'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
                
                     
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html'
  })

  .state('app.login', {
    url: '/login',
    views: {
      'menuContent': {
        templateUrl: 'templates/login.html',
        controller: 'loginCtrl'
      }
    }
  })

  .state('app.inscription', {
      url: '/inscription',
      views: {
        'menuContent': {
          templateUrl: 'templates/inscription.html',
          controller: 'inscriptionCtrl'
        }
      }
    })
    .state('app.inscription2', {
      url: '/inscription2',
      views: {
        'menuContent': {
          templateUrl: 'templates/inscription2.html',
          controller: 'inscription2Ctrl'
        }
      }
    })
        .state('app.circuit', {
               url: '/circuit',
               views: {
               'menuContent': {
               templateUrl: 'templates/circuit.html'
               }
               }
               })
  .state('app.rechercheMap', {
    url: '/rechercheMap',
    views: {
      'menuContent': {
        templateUrl: 'templates/rechercheMap.html',
        controller: 'rechercheMapCtrl'
      }
    }
  });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/circuit');
});
