var mymodule=angular.module('starter.controllers', [])

 .controller('menucontroller', function($scope, $ionicModal, $rootScope,$ionicHistory) {
             $rootScope.side_menu = document.getElementsByTagName("ion-side-menu")[0];
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
                            }
                            });

             })

.controller('loginCtrl', function($scope, $ionicModal, $ionicHistory) {})

.controller('inscriptionCtrl', function($scope, $ionicModal) {})
.controller('inscription2Ctrl', function($scope, $ionicModal, $ionicHistory) {$ionicHistory.nextViewOptions({
                                                                                                            disableBack: true
                                                                                                            });})

  .controller('rechercheMapCtrl', function($scope,$rootScope, $ionicLoading, $ionicSideMenuDelegate,$cordovaGeolocation) {
               try{
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
                                         $scope.map.addEventListener(window.plugin.google.maps.event.MAP_READY, onBtnClicked);
                   
              var posOptions = {timeout: 10000, enableHighAccuracy: false};
              $cordovaGeolocation
              .getCurrentPosition(posOptions)
              .then(onBtnClicked , function(err) {
                    // error
                    });
              
              
              function onBtnClicked(position) {
             
             
              // Move to the position with animation
               $scope.map.animateCamera({
                                target: {lat: position.coords.latitude, lng:position.coords.longitude},
                                zoom: 17,
                                tilt: 60,
                                bearing: 140,
                                duration: 5000
                                }, function() {
                                
                                // Add a maker
                                 $scope.map.addMarker({
                                              position: {lat: 37.422359, lng: -122.084344},
                                              title: "Welecome to \n" +
                                              "Cordova GoogleMaps plugin for iOS and Android",
                                              snippet: "This plugin is awesome!",
                                              animation: plugin.google.maps.Animation.BOUNCE
                                              }, function(marker) {
                                              
                                              // Show the info window
                                              marker.showInfoWindow();
                                              
                                              // Catch the click event
                                              marker.on(plugin.google.maps.event.INFO_CLICK, function() {
                                                        
                                                        // To do something...
                                                        alert("Hello world!");
                                                        
                                                        });
                                              });
                                });
             
              }      $scope.centerOnMe = function() {
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
      
      $scope.clickTest = function() {
        alert('Example of infowindow with ng-click')
              };
              }catch(e){
              alert(e);
              }
      
    });
