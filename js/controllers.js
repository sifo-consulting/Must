var mymodule=angular.module('starter.controllers', [])

 
.controller('loginCtrl', function($scope, $ionicModal, $timeout) {})
.controller('inscriptionCtrl', function($scope, $ionicModal, $timeout) {})
.controller('inscription2Ctrl', function($scope, $ionicModal, $timeout) {})
  .controller('rechercheMapCtrl', function($scope, $ionicLoading, $timeout) {
               try{
             $timeout(function() {  
                      
                      var div = document.getElementById("map");
                                        
                                        // Initialize the map view
                       $scope.map = window.plugin.google.maps.Map.getMap(div);
                      
                     
                                        // Wait until the map is ready status.
                                         $scope.map.addEventListener(window.plugin.google.maps.event.MAP_READY, onBtnClicked);
                      },3000);
              
              function onMapReady() {
              var button = document.getElementById("button");
              button.addEventListener("click", onBtnClicked);
              }
              
              function onBtnClicked() {
              alert(1);
             
              // Move to the position with animation
               $scope.map.animateCamera({
                                target: {lat: 37.422359, lng: -122.084344},
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
