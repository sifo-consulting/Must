var mymodule=angular.module('starter.controllers', [])

 .controller('menucontroller', function($scope, $ionicModal, $rootScope,$ionicHistory) {
             try{$rootScope.side_menu = document.getElementsByTagName("ion-side-menu")[0];

             $scope.siderAction=function(){

             if($ionicHistory.currentStateName()== "app.rechercheMap"){

             if($rootScope.side_menu.style.visibility=="hidden")
            $rootScope.side_menu.style.visibility = "visible";
             else if($rootScope.side_menu.style.visibility=="visible")
             $rootScope.side_menu.style.visibility = "hidden";
             }};
             $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromParams, toParams) {
                            if (toState.name != "app.rechercheMap") {
                            $rootScope.side_menu.style.visibility = "visible";
                            }else if(toState.name == "app.rechercheMap"){
                            $rootScope.side_menu.style.visibility = "hidden";
                            }
                            });}catch(e){
              alert(e);
             }

             })


.controller('circuitCtrl', function($scope, $ionicModal, $ionicHistory) {$scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                                                                                  viewData.enableBack = false;
                                                                                  }); })


.controller('resultatRechercheCtrl', function($scope) { $scope.$on('$ionicView.beforeEnter', function (event, viewData) {
                                                          viewData.enableBack = true;
                                                        });})


  .controller('rechercheMapCtrl', function(Markers,$scope,$rootScope, $ionicLoading, $ionicSideMenuDelegate,$cordovaGeolocation,$ionicModal) {
               try{
              $ionicModal.fromTemplateUrl('templates/reserverDirect.html', {
                                     scope: $scope,
                                    animation: 'slide-in-up'
                                   }).then(function(modal) {
                                  $scope.modal = modal;
                              });
 $scope.closeModel = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.showModel = function() {
    $scope.modal.show();
  };
    var posOptions = {timeout: 10000, enableHighAccuracy: false};

              $rootScope.side_menu.style.visibility = "hidden";
              $scope.$watch(function () {
                            return $ionicSideMenuDelegate.getOpenRatio();
                            }, function (newValue, oldValue) {
                            if (newValue == 0) {
                            $scope.hideLeft = true;
                            } else {
                            $scope.hideLeft = false;
                            }
                            });

                      var div = document.getElementById("map");

                                        // Initialize the map view
                       $scope.map = window.plugin.google.maps.Map.getMap(div);
                    // Wait until the map is ready status.
              $cordovaGeolocation.getCurrentPosition(posOptions).then(getPosReady , function(err) {
                                                                      alert("noposition"+err);
                                                                      getPosReady(new plugin.google.maps.LatLng(17.422858, -12.085065));
                                                 });






              function getPosReady(position) {
              try{

              // Move to the position with animation
               $scope.map.animateCamera({
                                target: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                zoom: 2,
                                tilt: 10,
                                bearing: 10,
                                duration: 3000
                                }, function() {

                                // Add a maker
                                 $scope.map.addMarker({
                                              position: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                                              title: "Welecome to \n" +
                                              "Cordova GoogleMaps plugin for iOS and Android",
                                              snippet: "This plugin is awesome!",
                                             'icon': {
                                             'url': 'file:///android_asset/www/img/icone-map.png'
                                              },
                                              animation: plugin.google.maps.Animation.BOUNCE
                                              }, function(marker) {
                                                 marker.setDraggable(true);
                                              // Show the info window
                                              //marker.showInfoWindow();

                                              // Catch the click event

                                               marker.on(plugin.google.maps.event.MARKER_DRAG_END, function() {

                                                                                                 marker.getPosition(function(latLng) {
                                                                                                       marker.setTitle(latLng.toUrlValue());
                                                                                                       marker.showInfoWindow();
                                                                                                     });

                                                                                                      });
                                              marker.on(plugin.google.maps.event.INFO_CLICK, function() {

                                                        // To do something...
                                                        alert("Hello world!");

                                                        });
                                                      } );
                                         $scope.generateMarker();
                                });

              }catch(e){alert(e);}}
              var createMarker = function (info){try{ return $scope.map.addMarker({
                                                                              position: new plugin.google.maps.LatLng(info.lat,info.longg),
                                                                              title: info.title,
                                                                              id:info.id,
                                                                              snippet: "<strong>This plugin is awesome!</strong>",
                                                                              'icon': {
                                                                              'url': 'file:///android_asset/www/img/icone-scooter.png'
                                                                              },
                                                                              animation: plugin.google.maps.Animation.BOUNCE
                                                                              },
                                                                              function(marker) {

                                                                              // Show the info window
                                                                             // marker.showInfoWindow();

                                                                              // Catch the click event
                                                                              marker.on(plugin.google.maps.event.MARKER_CLICK, function(marker) {

                                                                                        // To do something...
                                                                                        alert(marker.id+"Hello world!"+marker.getTitle() );
                                                                                        });
                                                                              marker.on(plugin.google.maps.event.INFO_CLICK, function(marker) {

                                                                                        // To do something...
                                                                                        alert("Hello world!"+marker.getTitle());
                                                                                $scope.showModel();

                                                                                        });
                                                                              } );
                                                                              }catch(e){
                                                                                            alert("yyyy "+e);
                                                                                            }
              };

              $scope.generateMarker=function(){
              try{ $scope.markers = [];
              $scope.markers=Markers.getMarkers();


              for (i = 0; i < $scope.markers.length; i++){

           createMarker($scope.markers[i]);
                                        }}catch(e){
              alert("xxx "+e);
              }};
              
              
              
    $scope.centerOnMe = function() {
        if(!$scope.map) {
          return;
        }

        $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
        });

        navigator.geolocation.getCurrentPosition(function(pos) {
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
        }, function(error) {
          alert('Unable to get location: ' + error.message);
        });
      };
              }catch(e){
              alert(e);
              }
       
      
    });
