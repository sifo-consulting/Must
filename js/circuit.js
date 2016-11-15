 mymodule.
controller('circuitCtrl', function($scope,Markers, $q,$timeout,$ionicLoading,sessionService) {
            $scope.$on('$ionicView.beforeEnter', function(event, viewData) {
                       viewData.enableBack = false;
                       });
           $scope.disableTap = function(){
           container = document.getElementsByClassName('pac-container');
           // disable ionic data tab
           angular.element(container).attr('data-tap-disabled', 'true');
           // leave input field if google-address-entry is selected
          
           };
           var boxpolys = null;
           var directions = null;
           var routeBoxer = null;
           var distance = null;
           $scope.cicuits=[];
           var directionsService,directionsDisplay;
             routeBoxer = new RouteBoxer();
           $scope.data={};
           $scope.circuits=[];
           function getPosition(adrs){
           var deffered = $q.defer();
           var request = {
           'address': adrs
           };
           plugin.google.maps.Geocoder.geocode(request, function(results) {
                                               if (results.length) {
                                               var result = results[0];
                                               var position = result.position;
                                               
                                                deffered.resolve(position);
                                               
                                               } else {
                                              deffered.reject("adresse pas trouvée");
                                               }
                                          
                                               });
                return deffered.promise;
           
           }
           $scope.search=function(){
          directionsService = new google.maps.DirectionsService();
           try{
          
           var myPosition= [];
           $scope.loading = $ionicLoading.show({
                                               content: 'Getting current location...',
                                               duration: 10000
                                               });
           var positionPromise = getPosition($scope.data.depart);
           positionPromise.then(function(response) {
                             
                                myPosition.push(response);
                                var positionPromiseArriver = getPosition($scope.data.arriver);
                                positionPromiseArriver.then(function(response) {
                                                             myPosition.push(response);

                                                            var d = new Date($scope.data.startTime);
                                                            var datestring = d.getFullYear() + "-" + (d.getMonth()+1) + "-" +d.getDate() ;
                                                           // +" "+ d.getHours()+":"+d.getMinutes()
                                                        var num=sessionService.getNum()+"1";
                                                            var circuitPromise = Markers.addCircuits(myPosition,datestring,$scope.data,num);
                                                            circuitPromise.then(function(response) {
                                                         navigator.notification.alert("Trajet ajouter avec succée", function(){}, "Alerte", "ok");
                                                          //$scope.circuits=response.user;
                                                           /*  for (var i=0;i<response.user.length;i++){
                                                                   route(response.user[i],myPosition[0],1);
                                                                }
                                                              for (var i=0;i<response.user.length;i++){
                                                                     route(response.user[i],myPosition[1],0);
                                                               if(i==response.user.length-1){$scope.loading.hide();if($scope.circuits.length==0)
                                                               navigator.notification.alert("Il n'y a aucun trajet pour le moment", function(){}, "Alerte", "ok");}
                                                                 }*/
                                                            
                                                                                
                                                                                }, function(error) {
                                                            alert(error);
                                                           });
                                                           
                                                            }, function(error) {
                                                            alert(error);
                                                            });
                                

                                
                                
                                
                              }, function(error) {
                              alert(error);
                              });
           
           $scope.getDist = function() {
          var  source = $scope.data.depart;
           var destination = $scope.data.arriver;
          
           
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
                                     if (status == google.maps.DistanceMatrixStatus.OK && response.rows[0].elements[0].status != "ZERO_RESULTS"&& response.rows[0].elements[0].status != "NOT_FOUND") {

                                     var distance = response.rows[0].elements[0].distance.text;
                                     var duration = response.rows[0].elements[0].duration.text;
                                    
                                     //alert(distance);
                                        /* $scope.data.distance = distance;
                                     $scope.data.dist=true;
                                     $scope.data.time = num=Math.round(parseInt((parseInt(duration) * 0.7)))+"minutes";
                                     $scope.data.time2 = duration ;*/
                                     
                                     
                                     } else {
                                     //alert("Unable to find the distance via road.");
                                     }
                                     }); //$timeout(function(){if(!$scope.data.dist){$scope.getDist();} },3000);
           }catch(e){alert(e);}
           }  }
           $scope.getDist();
           
           
           }catch(e){
           alert(e);}
           };
           
           
           function route(crc,pos,arr) {
           try{
           clearBoxes();
           
           // Convert the distance to box around the route from miles to km
           distance = 10;
           
           var request = {
           origin: new google.maps.LatLng(crc.lat,crc.longg),
           destination: new google.maps.LatLng(crc.latArv,crc.longgArv),
           travelMode: google.maps.DirectionsTravelMode.DRIVING
           }
           directionsService.route(request, function(result, status) {
                                  if (status == google.maps.DirectionsStatus.OK) {
                                  // directionsRenderer.setDirections(result);
                                   
                                  // Box around the overview path of the first route
                                  var path = result.routes[0].overview_path;
                                  var boxes = routeBoxer.box(path, distance);
                                   drawBoxes(boxes,crc,pos,arr);
                                  } else {
                                  alert("Directions query failed: " + status);
                                  }
                                  });
           
           }catch(e){
           alert(e);}
          
           }
           function drawBoxes(boxes,crc,pos,arr) {
           try{
           
           boxpolys = new Array(boxes.length);
           
           for (var i = 0; i < boxes.length; i++) {
           // boxpolys[i]= new google.maps.Polygon({paths: boxes[i]})
           boxpolys[i] = new google.maps.Rectangle({
                                                   bounds: boxes[i]
                                                   });
           
           if(boxpolys[i].getBounds().contains(new google.maps.LatLng(pos.lat ,pos.lng)))
           {
           if(arr==1){


           $scope.$apply(function () {$scope.circuits.push(crc);});
          
           }
           return 1;
           }
           else
           {
           //alert("Outside");
           }
           }
           if(i==boxes.length){alert("outside");
            $scope.$apply(function () { $scope.circuits.splice(  $scope.circuits.indexOf(crc), 1 );});
          
           }
           }catch(e){
           alert(e);}
           }
           function clearBoxes() {
           if (boxpolys != null) {
           for (var i = 0; i < boxpolys.length; i++) {
           boxpolys[i].setMap(null);
           }
           }
           boxpolys = null;
           }
           
            })
.controller('circuitCtrl2', function($scope, $q,$timeout,$ionicLoading,$stateParams) {
            alert($scope.id=$stateParams.id);
            
            });
