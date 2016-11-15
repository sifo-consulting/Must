mymodule.controller('waitingCtrl', function($scope ,$interval,$state,Reservation,$stateParams,sessionService, $ionicPopup, roundProgressService) {
                    var timer=null;
                    $scope.time=0;
                    $scope.gradient=true;
                    $scope.current =        0;
                    $scope.max =            180;
                    $scope.timerCurrent =   0;
                    $scope.uploadCurrent =  0;
                    $scope.stroke =         22;
                    $scope.radius =         125;
                    $scope.isSemi =         false;
                    $scope.rounded =        false;
                    $scope.responsive =     false;
                    $scope.clockwise =      true;
                    $scope.currentColor =   '#feb100';
                    $scope.bgColor =        '#eaeaea';
                    $scope.iterations =     50;
                    $scope.currentAnimation = 'easeOutCubic';
                    
                    $scope.increment = function(amount){
                    $scope.current+=(amount || 1);
                    };
                    
                    $scope.decrement = function(amount){
                    $scope.current-=(amount || 1);
                    };
                    
                    $scope.animations = [];
                    
                    angular.forEach(roundProgressService.animations, function(value, key){
                                    $scope.animations.push(key);
                                    });
                    
                    $scope.getStyle = function(){
                    return {
                    'top': $scope.isSemi ? 'auto' : '50%',
                    'bottom': $scope.isSemi ? '5%' : 'auto',
                    'left': '50%',
                    'transform': ($scope.isSemi ? '' : 'translateY(-50%) ') + 'translateX(-50%)',
                    'font-size': $scope.radius/1.8 + 'px'
                    };
                    };
                    
                    $scope.getColor = function(){
                    return $scope.gradient ? 'url(#gradient)' : $scope.currentColor;
                    };
                    
                   
                    
                 
                    $scope.$on('$ionicView.beforeLeave', function(event, viewData) {
                             $interval.cancel(timer);
                               // $scope.doRefresh();
                               });
                    
                    var reservationId=null;
                  var x=sessionService.get("riderrndm").split(",");

 var reservationPromise = Reservation.setReservation($stateParams,x[1]);
                    reservationPromise.then(function(response) {

                                            if(response.done)
                                            reservationId=response.reservation_id;
                                            });

                    
                                       function update() {
                    try{
                    timer= $interval(function() {
                                   
                                   $scope.current=$scope.current+1;
                                   $scope.timerCurrent = $scope.time+1;
                                   $scope.time = $scope.time+1;
                                  
                             if ($scope.current > $scope.max) {
                                   $scope.current=0;$scope.timerCurrent=0;$scope.time=0;
                                   $scope.cancel();
                          
                             }else{
                             
                             
                             if($scope.current=="36" ||$scope.current=="72" ||$scope.current=="108"||$scope.current=="144") {
                           

                             var checkPromise = Reservation.checkResponse(reservationId);
                             checkPromise.then(function(response) {
                                                 //alert(JSON.stringify(response));
                                               });
                             }
                             }
                             //update();
                             }, 1000);
                    }catch(e){alert(e);}
                    }
                    update();
                    
                    
                    $scope.cancel=function(){
                    $interval.cancel(timer);
                    var confirmPopup = $ionicPopup.confirm({
                                                           title: 'Pas de réponse',
                                                           template: 'Attendre plus',
                                                           buttons: [
                                                              { text: 'NON',
                                                                  onTap:  function(){  $state.go('app.rechercheMap'); }},
                                                                {
                                                                  text: 'Attendre',
                                                                    type: 'button-assertive',
                                                                      onTap:  function(){ $scope.current=0;$scope.timerCurrent=0;$scope.time=0;    update();}
                                                                 }   ]

                                                           
                                                           });


                   
                    }
                   
})
