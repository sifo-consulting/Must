var mymodule = angular.module('starter.controllers', [])

.controller('menucontroller', function($scope, $ionicModal, $rootScope,$state,sessionService,$ionicSideMenuDelegate,user,sessionService) {
    try {
            function backgroundposition(value){
            /* var bgGeo = window.BackgroundGeolocation;
             var myNum=sessionService.getNum();
             $scope.item={};
             //This callback will be executed every time a geolocation is recorded in the background.
             var callbackFn = function(location, taskId) {
             var coords = location.coords;
             $scope.item.lat=coords.latitude ;
             $scope.item.lng=coords.longitude;
             $scope.item.checked=1;
             var actifPromise =  user.setActif($scope.item,myNum);
             actifPromise.then(function(response){  },function(error){alert(error);});
             
             // Must signal completion of your callbackFn.
             bgGeo.finish(taskId);
             };
             */
            // The plugin is typically toggled with some button on your UI.
            
            //Make sure to get at least one GPS coordinate in the foreground before starting background services
            var myNum=sessionService.getNum();
            
            navigator.geolocation.getCurrentPosition(function(pos){
                                                     $scope.item={};
                                                     var location=pos.coords;
                                                     $scope.item.lat=location.latitude ;
                                                     $scope.item.lng=location.longitude;
                                                     $scope.item.checked=1;
                                                     var actifPromise =  user.setActif($scope.item,myNum);
                                                     actifPromise.then(function(response){  },function(error){alert(error);});
                                                     
                                                     console.log("Succesfully retreived our GPS position, we can now start our background tracker.");
                                                     }, function(err) {
                                                     alert("Cant get position");
                                                     
                                                     });
            
            
            
            //Get plugin
            var bgLocationServices =  window.plugins.backgroundLocationServices;
            
            //Congfigure Plugin
            bgLocationServices.configure({
                                         //Both
                                         desiredAccuracy: 20, // Desired Accuracy of the location updates (lower means more accurate but more battery consumption)
                                         distanceFilter: 1, // (Meters) How far you must move from the last point to trigger a location update
                                         debug: true, // <-- Enable to show visual indications when you receive a background location update
                                         interval: 9000, // (Milliseconds) Requested Interval in between location updates.
                                         useActivityDetection: true, // Uses Activitiy detection to shut off gps when you are still (Greatly enhances Battery Life)
                                         
                                         //Android Only
                                         notificationTitle: 'Beeride', // customize the title of the notification
                                         notificationText: 'Tracking', //customize the text of the notification
                                         fastestInterval: 5000 // <-- (Milliseconds) Fastest interval your app / server can handle updates
                                         
                                         });
            
            //Register a callback for location updates, this is where location objects will be sent in the background
            bgLocationServices.registerForLocationUpdates(function(location) {
                                                          console.log("xx "+location.longitude+"We got an BG Update" + JSON.stringify(location));
                                                          
                                                          $scope.item={};
                                                          $scope.item.lat=location.latitude ;
                                                          $scope.item.lng=location.longitude;
                                                          $scope.item.checked=1;
                                                          var actifPromise =  user.setActif($scope.item,myNum);
                                                          actifPromise.then(function(response){  },function(error){alert(error);});
                                                          }, function(err) {
                                                          console.log("Error: Didnt get an update", err);
                                                          });
            
            //Register for Activity Updates
            
            //Uses the Detected Activies / CoreMotion API to send back an array of activities and their confidence levels
            //See here for more information:
            //https://developers.google.com/android/reference/com/google/android/gms/location/DetectedActivity
            bgLocationServices.registerForActivityUpdates(function(activities) {
                                                          console.log("We got an activity update" + activities);
                                                          }, function(err) {
                                                          console.log("Error: Something went wrong", err);
                                                          });
            if (value=="1") {
            bgLocationServices.start();
            } else {
            bgLocationServices.stop();
            }
            
            
            }
            
            
            
            $rootScope.side_menu = document.getElementsByTagName("ion-side-menu")[0];
            
            function onSuccess(position) {
            
            var myNum=sessionService.getNum();
            $scope.item.lat=position.coords.latitude ;
            $scope.item.lng=position.coords.longitude;
            $scope.item.checked=1;
            var actifPromise =  user.setActif($scope.item,myNum);
            actifPromise.then(function(response){ },function(error){alert(error);});
            /*var element = document.getElementById('geolocation');
             element.innerHTML = 'Latitude: '  + position.coords.latitude      + '<br />' +
             'Longitude: ' + position.coords.longitude     + '<br />' +
             '<hr />'      + element.innerHTML;*/
            }
            
            // onError Callback receives a PositionError object
            //
            function onError(error) {
            alert('code: '    + error.code    + '\n' +
                  'message: ' + error.message + '\n');
            }
            
            // Options: throw an error if no update is received every 30 seconds.
            //
            var watchID;
            
            $rootScope.$on('actif', function(event, id) {
                           backgroundposition(id);
                           /*if(id=="1")
                            watchID = navigator.geolocation.watchPosition(onSuccess, onError, {enableHighAccuracy: true, timeout: 30000 });
                            else
                            navigator.geolocation.clearWatch(watchID);*/
                           });
        $scope.siderAction = function() {
           
            if($ionicSideMenuDelegate.isOpen())
             $rootScope.side_menu.style.visibility = "hidden";
            else
            $rootScope.side_menu.style.visibility = "visible";
            // alert($ionicSideMenuDelegate.isOpen()+" "+$rootScope.side_menu.style.visibility);
           /* if ($ionicHistory.currentStateName() == "app.rechercheMap") {

                if ($rootScope.side_menu.style.visibility == "hidden")
                    $rootScope.side_menu.style.visibility = "visible";
                else if ($rootScope.side_menu.style.visibility == "visible")
                    $rootScope.side_menu.style.visibility = "hidden";
            }*/
        };
       $scope.$watch(function () {
                      return $ionicSideMenuDelegate.getOpenRatio();
                  }, function (newValue, oldValue) {
                    if (newValue == 0) {
                          $scope.hideLeft = true;
                      } else {
                          $scope.hideLeft = false;
                      }
                  });

            $scope.logout=function(){
            sessionService.destroy("riderstate");
             sessionService.destroy("riderpic");
             sessionService.destroy("ridernom");
             sessionService.destroy("riderrndm");
              $state.go('app.login');
            }
          
            
    } catch (e) {
        alert(e);
    }

})


.controller('actifCtrl', function($scope,sessionService,user,$rootScope) {
 $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
            viewData.enableBack = false;
             // $scope.doRefresh();
        });
      $scope.item={};
     

       $scope.updateEtat=function(){
$rootScope.$emit('actif', $scope.item.checked);
    


      }
})



.controller('resultatRechercheCtrl', function($scope,$ionicModal,$state,$stateParams,Markers,$rootScope) {
            try{
            $scope.$on('$ionicView.enter', function() {
                           init();
                                  });
                                   $scope.data={};
            
            
            $scope.getNumber=function(num){
            return Markers.getNumber(num);
            }
            
    
 $scope.goTo=function(id){
         $scope.closeModel();   $state.go('app.waiting', { 'id':id,'dep':$stateParams.source,'arr':$stateParams.destination,'lat':$stateParams.lat,'lng':$stateParams.lng,'price':$scope.data.montant });
            
            }
           
$scope.getNumber=function(num){
 return Markers.getNumber(num);
 }


$scope.getRider=function(position){


  $rootScope.allMarkers = [];
                  var markerPromise = Markers.getMarkers(position.lat,position.lng);
                  markerPromise.then(function(response) {
 $scope.showing=true;
   $rootScope.allMarkers = response.user;
                                               
                                    
                      }); }
function init(){
$scope.showing=false;
var request = {
  'address':$stateParams.source
};
plugin.google.maps.Geocoder.geocode(request, function(results) {

  if (results.length) {
    var result = results[0];
    var position = result.position;

    $scope.getRider(result.position);
  } else {
    alert("Not found");

    $scope.getRider({lat:$stateParams.lat,lng:$stateParams.lng});

  }
});}
            $ionicModal.fromTemplateUrl('templates/reserver.html', {
                                        scope: $scope,
                                        animation: 'slide-in-up'
                                        }).then(function(modal) {
                                                $scope.modal = modal;
                                                });
            $scope.closeModel = function() {
            $scope.modal.hide();
            };
            
            // Open the login modal
            $scope.showModel = function(id) {
           $scope.data.id = id ;

            $scope.modal.show();
            };
            }catch(e){
            alert(e);
            }
})


.controller('rechercheMapCtrl', function(Markers, $scope, $rootScope, $timeout,$state, $ionicLoading, $ionicSideMenuDelegate, $cordovaGeolocation, $ionicModal) {
    try {
        
            $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
            viewData.enableBack = false;
             // $scope.doRefresh();
        });
            $scope.$on('$ionicView.enter', function() {
                       $scope.options = {
                        types: ['(cities)'],
                       componentRestrictions: { country: 'FR' }
                       }
                     //  $rootScope.side_menu.style.visibility = "hidden";
                       $scope.initMap();
                       });
            
            $scope.disableTap = function(){
            $scope.map.setClickable(false);
             container = document.getElementsByClassName('pac-container');
            // disable ionic data tab
            angular.element(container).attr('data-tap-disabled', 'true');
            // leave input field if google-address-entry is selected
            angular.element(container).on("click", function(){
                                      $scope.map.setClickable(true);
                                          document.getElementById('searchBar').blur();
                                          });
            };
        $scope.data = {};
         $scope.data.dist=false;
        $scope.data.myPosition = {};
        $scope.data.focused = 0;
        var source, destination;
           
        var directionsDisplay,directionsService;


      
        
        $scope.getDist = function() {
             $scope.map.setClickable(true);
            source = $scope.data.input;
            destination = $scope.data.input2;
             directionsService = new google.maps.DirectionsService();
           /* directionsDisplay = new google.maps.DirectionsRenderer({
                                                                   'draggable': true
                                                                   });*/
            if(source && destination){
            
            try{
           var request = {
                origin: source,
                destination: destination,
                travelMode: google.maps.TravelMode.DRIVING
            };
            directionsService.route(request, function(response, status) {
                if (status == google.maps.DirectionsStatus.OK) {
                 // directionsDisplay.setDirections(response);

                } });

            //*********DISTANCE AND DURATION**********************//
var service = new google.maps.DistanceMatrixService();
              service.getDistanceMatrix({
                origins: [source],
                destinations: [destination],
                travelMode: google.maps.TravelMode.DRIVING,
                unitSystem: google.maps.UnitSystem.METRIC,
                avoidHighways: false,
                avoidTolls: false
            }, function(response, status) {
                if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS") {
                    var distance = response.rows[0].elements[0].distance.text;
                    var duration = response.rows[0].elements[0].duration.text;
                   var durationMin = response.rows[0].elements[0].duration.value;
                  durationMin= Math.round(parseInt((parseInt(durationMin) * 0.7)));
                  
                  var hours = parseInt( durationMin / 3600 ) % 24;
                   var minutes = parseInt( durationMin / 60 ) % 60;
                                        var resultTime;
                                        if(hours==0)resultTime=minutes+" mins";
                                        else resultTime=hours +" hours "+minutes+" mins";
                    $scope.data.distance = " "+distance;
                    $scope.data.dist=true;
                    $scope.data.time = " "+resultTime;
                    $scope.data.time2 =  " "+duration ;


                } else {
                    console.log("Unable to find the distance via road.");
                }
            }); $timeout(function(){if(!$scope.data.dist){$scope.getDist();} },1000);
        }catch(e){alert(e);}
        }  }


        $scope.focused = function() {
            /*if ($scope.data.focused == 0) $ionicLoading.show({
                template: 'Déplacez le pin jaune pour retrouver l adresse exacte...',
                duration: 3500
            });*/
            $scope.data.input="";
            $scope.data.focused = 1;
        }
        $scope.focused2 = function() {
            /*if ($scope.data.focused == 0) $ionicLoading.show({
                template: 'Déplacez le pin jaune pour retrouver l adresse exacte...',
                duration: 3500
            });*/
             $scope.data.input2="";
            $scope.data.focused = 2;
        }
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
        $scope.showModel = function(id) {
            $scope.data.id = id ;
            $scope.$apply(function () {
            $scope.data.dateTime = new Date(2017, 11, 28, 14, 57);
                          });
             $scope.modal.show();
        };
        var posOptions = {
            timeout: 10000,
            enableHighAccuracy: true
        };

       
       /* $scope.$watch(function() {
            return $ionicSideMenuDelegate.getOpenRatio();
        }, function(newValue, oldValue) {
            if (newValue == 0) {
                $scope.hideLeft = true;
            } else {
                $scope.hideLeft = false;
            }
        });  */
      
            $scope.initMap=function(){
             var div = document.getElementById("map");
            
            // Initialize the map view
            $scope.map = window.plugin.google.maps.Map.getMap(div);
            $scope.map.clear();
            //$scope.map.off();
            // Wait until the map is ready status.
            $cordovaGeolocation.getCurrentPosition(posOptions).then(getPosReady, function(err) {
                                                                    alert("Cant get position");
                                                                    //getPosReady(new plugin.google.maps.LatLng(17.422858, -12.085065));
                                                                    });
             }


        function getPosReady(position) {
            try {
           console.log("latlngFirs"+position.coords.latitude+" "+position.coords.longitude);
                $scope.data.myPosition={lat:position.coords.latitude,lng: position.coords.longitude};
                $scope.map.animateCamera({
                    target: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                    zoom: 5,
                    tilt: 10,
                    bearing: 10,
                    duration: 3000
                }, function() {

                   var markerSizeScale = 5;
                   var markerSize = {
                   width: parseInt(37 * markerSizeScale),
                   height: parseInt(52 * markerSizeScale)
                   };
                    $scope.map.addMarker({
                        position: new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude),
                        title: "Je suis là \n" +
                            "",
                        snippet: "",

                        animation: plugin.google.maps.Animation.BOUNCE
                    }, function(marker) {
                        marker.setDraggable(true);
                      
                        marker.getPosition(function(latLng) {

console.log("latLng.lat, latLng.lng"+latLng.lat+" "+latLng.lng);

                                                       var request = {
                                                           'position': new plugin.google.maps.LatLng(latLng.lat, latLng.lng)
                                                       };
                                                       plugin.google.maps.Geocoder.geocode(request, function(results) {
                                                           if (results.length) {
                                                               var result = results[0];
                                                               var position = result.position;
                                                             

                                                             
                                                             var address = [
                                                                   result.subThoroughfare || "",
                                                                   result.thoroughfare || "",
                                                                   result.locality || "",
                                                                   result.adminArea || "",
                                                                   result.postalCode || "",
                                                                   result.country || ""
                                                               ].join(" ");

                                                            address=address.replace(/Unnamed/g, "");
                                                             address=address.replace(/null/g, "");
                                                             address=address.replace(/\(/g, "");
                                                                address=address.replace(/\)/g, "");
                                                      

                                                $scope.$apply(function () {
                                                                   $scope.data.input = address;
                                                });

                                                           } else {
                                                               alert("Adresse pas trouvée");
                                                           }
                                                       });


                                                   });

                        marker.on(plugin.google.maps.event.MARKER_DRAG_END, function() {

                            marker.getPosition(function(latLng) {
$scope.data.myPosition={lat:latLng.lat,lng: latLng.lng};

 for (i = 0; i < $scope.myMarkers.length; i++) {
$scope.myMarkers[i].remove();
    }

$scope.generateMarker(latLng.lat,  latLng.lng);
                                var request = {
                                    'position': new plugin.google.maps.LatLng(latLng.lat, latLng.lng)
                                };
                                plugin.google.maps.Geocoder.geocode(request, function(results) {
                                    if (results.length) {
                                        var result = results[0];
                                        console.log("drga latLng.lat, latLng.lng"+latLng.lat+" "+latLng.lng);
                                        var position = result.position;
                                                 
                                                                    
                                                                    
                                                 var address = [
                                                                                   result.subThoroughfare || "",
                                                                                   result.thoroughfare || "",
                                                                                   result.locality || "",
                                                                                   result.adminArea || "",
                                                                                   result.postalCode || "",
                                                                                   result.country || ""
                                                                                   ].join(" ");
                                                                  address=address.replace(/Unnamed/g, "");
                                                                   address=address.replace(/null/g, "");
                                                                  address=address.replace(/\(/g, "");
                                                                   address=address.replace(/\)/g, "");
console.log("drag address"+address);
                                        if ($scope.data.focused == 1)
                                            $scope.data.input = address;
                                        else if ($scope.data.focused == 2)
                                            $scope.data.input2 = address;
                                        marker.setTitle(address);
                                        marker.showInfoWindow();

                                    } else {
                                        alert("Adresse pas trouvée");
                                    }
                                });


                            });

                        });
                        marker.on(plugin.google.maps.event.INFO_CLICK, function() {

                            // To do something...
                             

                        });
                    });
                    $scope.generateMarker(position.coords.latitude, position.coords.longitude);
                });
          
            } catch (e) {
                alert(e);
            }
        }
        var createMarker = function(info) {
            try {
                 $scope.map.addMarker({
                        position: new plugin.google.maps.LatLng(info.lat, info.longg),
                        title: info.nom + " " + info.prenom,
                        markerId: info.type_id,
                        data: info,
                        snippet: info.commercialName,
                        'icon': {
                            'url': 'www/img/icone-scooter.png'
                        },
                        animation: plugin.google.maps.Animation.BOUNCE
                    },
                    function(marker) {

                        // Show the info window
                        // marker.showInfoWindow();

                        // Catch the click event
                        marker.on(plugin.google.maps.event.MARKER_CLICK, function(marker) {


                        });
                        marker.on(plugin.google.maps.event.INFO_CLICK, function(marker) {

                            // To do something...


                            $scope.showModel($scope.myMarkers.indexOf(marker));

                        });
                          $scope.myMarkers.push( marker);

                    });
            } catch (e) {
                alert("yyyy " + e);
            }
        };

        $scope.generateMarker = function(lat,lng) {
            try {
               $scope.markers = [];
               $scope.myMarkers = [];
                var markerPromise = Markers.getMarkers(lat,lng);
                markerPromise.then(function(response) {
 
                    $scope.markers = response.user;



                    for (i = 0; i < $scope.markers.length; i++) {
 createMarker($scope.markers[i]);
                    }
                }, function(error) {
                    alert(error);
                });


            } catch (e) {
                alert("xxx " + e);
            }
        };

        $scope.showRecherche = function() {
 $scope.map.clear();
  $scope.map.off();

            $state.go('app.resultRecherche', {
                'source': $scope.data.input ,
                'destination': $scope.data.input2,
                'lat': $scope.data.myPosition.lat,
                'lng': $scope.data.myPosition.lng
            });
        }
            $scope.goTo=function(id){
            try{$scope.closeModel();
           /* var d = new Date($scope.data.startTime);
            var datestring = d.getDate()  + "-" + (d.getMonth()+1) + "-" + d.getFullYear() + " " +
            d.getHours() + ":" + d.getMinutes();*/
           
           $state.go('app.waiting', { 'id':id,'dep':$scope.data.input,'arr':$scope.data.input2,'lat':$scope.data.myPosition.lat,'lng':$scope.data.myPosition.lng,'price':$scope.data.montant });
            }catch(e){
            alert(e);
            }
            }
$scope.getNumber=function(num){
return Markers.getNumber(num);
}
        $scope.centerOnMe = function() {
            if (!$scope.map) {
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
    } catch (e) {
        alert(e);
    }


});
