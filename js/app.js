// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
//Stripe.setPublishableKey('fillMePlease');
document.addEventListener("deviceready", function(){navigator.splashscreen.hide();

    // Get a reference to the plugin.
   

}, false);
var mymodule=angular.module('starter', ['ionic' ,'starter.controllers','ngCordova','vsGoogleAutocomplete','angular-svg-round-progress','ion-datetime-picker'])

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
                       }                           }) ;
})

.config(function($stateProvider, $urlRouterProvider,$ionicConfigProvider) {
 //$ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');
     if (!ionic.Platform.isIOS()) {
         $ionicConfigProvider.scrolling.jsScrolling(false);
       }
      // $ionicConfigProvider.views.maxCache(0);
    $stateProvider

    .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller:'menucontroller'
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
    .state('app.actif', {
               url: '/actif',
               views: {
               'menuContent': {
               templateUrl: 'templates/actif.html',
               controller: 'actifCtrl'
               }
               }
               })
         .state('app.circuit2', {
                                       url: '/circuit2?id',
                                       views: {
                                       'menuContent': {
                                       templateUrl: 'templates/circuit2.html',
                                       controller:'circuitCtrl2'
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
                                          url: '/resultRecherche?source&destination&lat&lng',
                                          views: {
                                          'menuContent': {
                                          templateUrl: 'templates/resultRecherche.html',
                                            controller:"resultatRechercheCtrl"
                                          }
                                          }
                                          })
  .state('app.waiting', {
                                              url: '/waiting/:id/:dep/:arr/:lat/:lng/:dateTime/:price',
                                              views: {
                                              'menuContent': {
                                              templateUrl: 'templates/waiting.html',
                                                controller:"waitingCtrl"
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
                                                 templateUrl: 'templates/profil.html',
                                                  controller:"inscription2Ctrl"
                                                 }
                                                 }
                                                 })
        .state('app.payement', {
               url: '/payement',
               views: {
               'menuContent': {
               templateUrl: 'templates/payement.html',
               controller:"profilCtrl"
               }
               }
               })
  .state('app.communique', {
                 url: '/communique',
                 views: {
                 'menuContent': {
                 templateUrl: 'templates/communique.html'
                 }
                 }
                 })
   .state('app.Fidelite', {
                  url: '/Fidelite',
                  views: {
                  'menuContent': {
                  templateUrl: 'templates/Fidelite.html'
                  }
                  }
                  })
      .state('app.propos', {
                      url: '/propos',
                      views: {
                      'menuContent': {
                      templateUrl: 'templates/propos.html'
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
