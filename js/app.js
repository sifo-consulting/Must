// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
var mymodule=angular.module('starter', ['ionic' ,'starter.controllers','ngCordova'])

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

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
 //$ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');
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

   .state('app.codeValidation', {
        url: '/codeValidation',
        views: {
          'menuContent': {
            templateUrl: 'templates/codeValidation.html',
            controller: 'codeValidationCtrl'
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
      .state('app.reserver', {
                     url: '/reserver',
                     views: {
                     'menuContent': {
                     templateUrl: 'templates/reserver.html'
                     }
                     }
                     })
                       .state('app.rechercheMap2', {
               url: '/rechercheMap2',
               views: {
               'menuContent': {
               templateUrl: 'templates/rechercheMap2.html',
               controller:'circuitCtrl'
               }
               }
               })
         .state('app.circuit2', {
                                       url: '/circuit2',
                                       views: {
                                       'menuContent': {
                                       templateUrl: 'templates/circuit2.html'
                                       }
                                       }
                                       })
        .state('app.circuit', {
                                url: '/circuit',
                                views: {
                                'menuContent': {
                                templateUrl: 'templates/circuit.html',
                                controller:'circuitCtrl'
                                }
                                }
                                })
         .state('app.historique', {
                                 url: '/historique',
                               views: {
                              'menuContent': {
                             templateUrl: 'templates/historique.html'
                             }
                               }
                           })
   .state('app.resultRecherche', {
                                          url: '/resultRecherche',
                                          views: {
                                          'menuContent': {
                                          templateUrl: 'templates/resultRecherche.html',
                                          controller:"resultatRechercheCtrl"
                                          }
                                          }
                                          })
    .state('app.avis2', {
                                             url: '/avis2',
                                             views: {
                                             'menuContent': {
                                             templateUrl: 'templates/avis2.html'
                                             }
                                             }
                                             })
  .state('app.avis', {
                                              url: '/avis',
                                              views: {
                                              'menuContent': {
                                              templateUrl: 'templates/avis.html'
                                              }
                                              }
                                              })



 .state('app.suivre2', {
                                             url: '/suivre2',
                                             views: {
                                             'menuContent': {
                                             templateUrl: 'templates/suivre2.html'
                                             }
                                             }
                                             })

         .state('app.plaindre', {
                                         url: '/plaindre',
                                         views: {
                                         'menuContent': {
                                         templateUrl: 'templates/plaindre.html'
                                         }
                                         }
                                         })
            .state('app.profil', {
                                                 url: '/profil',
                                                 views: {
                                                 'menuContent': {
                                                 templateUrl: 'templates/profil.html'
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
  $urlRouterProvider.otherwise('/app/login');
});
