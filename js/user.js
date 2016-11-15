mymodule.controller('loginCtrl', function($scope ,$rootScope,$timeout,$state,$ionicLoading,user,sessionService) {
$scope.myLogin={};
                    
 
                    try{
                     
                    if(sessionService.get("riderpic")&&sessionService.get("ridernom")&&sessionService.get("ridernom")!="undefined"){
                    $rootScope.myName=sessionService.get("ridernom");
                    $rootScope.photo=sessionService.get("riderpic");
                    }
                    }catch(e){
                    console.log(e);}
                    try{
                    if(sessionService.get("riderstate")){
                   
                    $timeout(function(){$state.go(sessionService.get("riderstate"));}, 1500);
                    }
                    }catch(e){
                    console.log(e);}

$scope.connect=function(){

var loginPromise =  user.login($scope.myLogin);
                   
loginPromise.then(function(response){if(response.done=="false"){$ionicLoading.show({template: 'Email ou mot de passe incorrect...', duration:1500});}else{sessionService.set("riderrndm","OK"+","+response.username);sessionService.set("riderpic",response.photo);sessionService.set("riderstate",'app.actif'); $state.go('app.actif');}},function(error){alert("error "+error);});
}

})
.controller('profilCtrl', function($scope,user,$ionicPopup,$rootScope,sessionService,$ionicLoading ) {
try{
$scope.$on('$ionicView.beforeEnter', function(event, viewData) {
            viewData.enableBack = false;
            init();
             // $scope.doRefresh();
        });
 function uploadPicture(){
  try{

   var uploadPromise=user.uploadPicture($scope.data.picData);
   uploadPromise.then(function(response){
                                                       $scope.showing = true;  $scope.data.disable=false;
                                                       $scope.data.picname=response;

                                                       },  function(error){ $scope.showing = true;$ionicLoading.show({template: 'erreur de connection...',duration:1500});});
 }catch(e){alert(e);}
   }
$scope.data={};
$scope.data.picname=null;
$scope.showing = true;

 $scope.data.ftLoad=false;
            $scope.showSelectValue=function(mySelect){
            $scope.data.master=mySelect;
            }
   $scope.showConfirm = function() {
                                         var confirmPopup = $ionicPopup.confirm({
                                              title: 'Mode de chargement',
                                              template: 'Prendre une photo?',
                                               scope: $scope,
                                                 buttons: [
                                                  { text: 'Gallery',
                                                    onTap:  $scope.selectPicture},
                                               {
                                                text: 'Camera',
                                                type: 'button-assertive',
                                                onTap:  $scope.takePicture
                                              }   ]

                                         });

                                       };

                                        $scope.data.picname="";
                                       // $scope.data.picData="img/moto-1.jpg";
                                        //$scope.data.ftLoad = true;
                                     $scope.takePicture = function() {
                                 	  var options = {
                                         quality: 50,
                                         destinationType: Camera.DestinationType.FILE_URI,
                                         sourceType: Camera.PictureSourceType.CAMERA
                                       };
                                 	 	navigator.camera.getPicture(
                                                                      		function(imageData) {
                                                                      		   $scope.data.disable=true;$scope.showing = false;
                                                                      			$scope.data.picData =   imageData;
                                                                      			imageData="";
                                                                      			 uploadPicture();
                                                                                     $scope.data.ftLoad = true;
navigator.camera.cleanup(function(){}, function(e){console.log("fail cleaning");});

                                                                      		},
                                                                      		function(err){
                                                                      			$ionicLoading.show({template: 'Erreur ...', duration:500});
                                                                      		},options);
                                 	  }

                                 	  $scope.selectPicture = function() {

                                 		var options = {
                                 			quality: 40,
                                 			destinationType: Camera.DestinationType.FILE_URI,
                                 			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                                 		};


                                 	navigator.camera.getPicture(
                                 		function(imageData) {
                                 			    $scope.data.disable=true;$scope.showing = false;
                                 			$scope.data.picData =   imageData;
                                 			imageData="";
                                 			uploadPicture();
                                                $scope.data.ftLoad = true;


                                 		},
                                 		function(err){
                                 			$ionicLoading.show({template: 'Erreur ...', duration:500});
                                 		},options);
                                 	};

var myNum=sessionService.getNum();
function init(){
            alert("xx ");alert("xx "+myNum);
var userPromise =  user.getProfile(myNum);
            userPromise.then(function(response){alert(JSON.stringify(response[0])); $scope.data=response[0];sessionService.set("ridernom",response[0].nom);sessionService.set("riderpic",response[0].photo);$rootScope.myName=$scope.data.nom;$rootScope.photo=$scope.data.photo;},function(error){alert(error);});

}

$scope.send=function(){

            var inscri2Promise =  user.setProfile($scope.data,myNum);
            inscri2Promise.then(function(response){ if(response.done){sessionService.set("riderpic",$scope.data.picname);$rootScope.photo=$scope.data.picname;}},function(error){alert(error);});
            
            
            }
            
}catch(e){alert(e);}
})
.controller('codeValidationCtrl', function($scope,$state,$ionicLoading,$ionicPopup,user,sessionService ) {

        $scope.data={};
$ionicLoading.show({template: 'Vérifiez votre boite email pour le code...', duration:1500});
 $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.alert({
      title: 'Code erroné',
      template: 'Essayez à nouveau?'
    });

    confirmPopup.then(function(res) {

        console.log('You are sure');

    });
  };

$scope.valider=function(){

var x=sessionService.get("riderrndm").split(",");

var session={num:x[1],randm:x[0]};

         
if($scope.data.code==x[0] && $scope.data.code){
var userPromise =  user.validerCode(session);
            userPromise.then(function(response){if(response.mail_check=="true"){sessionService.set("riderstate",'app.inscription2');$state.go('app.inscription2');}else
                                                                                          $scope.showConfirm();
                                                                                         },function(error){alert(error);});
}else
 $scope.showConfirm();
}
})
.controller('inscriptionCtrl', function($scope,$rootScope,$state , $ionicLoading, country,user,sessionService) {

try{
$scope.inscri={};
$scope.showSelectValue=function(mySelect){
$scope.inscri.selectedItem=mySelect;
}


var countryPromise =  country.getAll();
            countryPromise.then(function(response){ $scope.country=response;
                                $scope.inscri.mySelect="+33";$scope.inscri.selectedItem="+33"},function(error){alert(error);});

$scope.send=function(){
            try{
 $ionicLoading.show({
      template: 'Loading...'
    });
var userPromise =  user.inscrit($scope.inscri);
 userPromise.then(function(response){
$ionicLoading.hide();
 
if(response.email==$scope.inscri.email && response.email){

sessionService.set("riderrndm",response.randm+","+($scope.inscri.selectedItem+$scope.inscri.num).replace("+","00"));
                  sessionService.set("riderstate",'app.codeValidation'); sessionService.set("ridernom",$scope.inscri.nom);
                  $rootScope.myName=$scope.inscri.nom;    $state.go('app.codeValidation');
}else
$ionicLoading.show({template: 'Email /tel existant...', duration:1500});



 //assign data here to your $scope object
},function(error){
alert(error);
});
            }catch(e){
            alert(e);
            }
 }
}catch(e){
alert(e);}
})
 .controller('inscription2Ctrl',  function ($scope,$rootScope, $ionicPopup, $rootScope,$ionicLoading,user,sessionService ,$state) {
                                 try{	$scope.data = { };
             
             
                         $scope.data.ftLoad=[false,false,false,false,false,false];
                          $scope.data.disable=true;$scope.showing =[true,true,true,true,true,true];
             $scope.data.picname=new Array('6');;
             $scope.data.picData=new Array('6');;
             
             try{var x=sessionService.get("riderrndm").split(",");
                                        $scope.data.num=x[1];
             $scope.handleStripe = function(status, response){
             if(response.error) {
             // there was an error. Fix it.
             } else {
             // got stripe token, now charge it or smt
             token = response.id
             }
             }
                                    }catch(e){console.log(e);}
             $scope.data.master="visa";
             $scope.showSelectValue=function(mySelect){
             $scope.data.master=mySelect;
             }
                                    $scope.showConfirm = function(id) {
                                      $scope.id=id;  var confirmPopup = $ionicPopup.confirm({
                                              title: 'Mode de chargement',
                                              template: 'Prendre une photo?',
                                               scope: $scope,
                                                 buttons: [
                                                  { text: 'Gallery',
                                                    onTap: function(){ $scope.selectPicture()}},
                                               {
                                                text: 'Camera',
                                                type: 'button-assertive',
                                                onTap:  function(){$scope.takePicture()}
                                              }   ]
                                            
                                         });

                                       };


                                       // $scope.data.picData="img/moto-1.jpg";
                                        //$scope.data.ftLoad = true;
                                     $scope.takePicture = function() {
                                 	  var options = {
                                         quality: 50,
                                         destinationType: Camera.DestinationType.FILE_URI,
                                         sourceType: Camera.PictureSourceType.CAMERA
                                       };
                                 	 	 navigator.camera.getPicture(
                                                                      		function(imageData) {
                                                                      			$scope.data.picData[$scope.id] =   imageData;
                                                                      			imageData="";

                                                                      			 uploadPicture($scope.id);
                                                                                     $scope.data.ftLoad[$scope.id] = true;
navigator.camera.cleanup(function(){}, function(e){console.log("fail cleaning");});

                                                                      		},
                                                                      		function(err){
                                                                      			$ionicLoading.show({template: 'Erreur ...', duration:500});
                                                                      		},options);
                                 	  }

                                 	  $scope.selectPicture = function() {

                                 		var options = {
                                 			quality: 40,
                                 			destinationType: Camera.DestinationType.FILE_URI,
                                 			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                                 		};


                                 	navigator.camera.getPicture(
                                 		function(imageData) {
                                 		 	$scope.data.picData[$scope.id] =   imageData;
                                 			imageData="";
                                 			uploadPicture($scope.id);
                                               $scope.data.ftLoad[$scope.id] = true;


                                 		},
                                 		function(err){
                                 			$ionicLoading.show({template: 'Erreur ...', duration:500});
                                 		},options);
                                 	};

   function uploadPicture(id){

$scope.$apply(function () {
   $scope.showing[id] = false;
   $scope.data.disable=true;
 });
console.log("iddddd "+$scope.data.picData[id]);
   var uploadPromise=user.uploadPicture($scope.data.picData[id]);
   uploadPromise.then(function(response){

                                                            $scope.showing[id]= true;  $scope.data.disable=false;

                                                       $scope.data.picname[id]=response;

                                                       },  function(error){$ionicLoading.show({template: 'erreur de connection...'});$scope.showing[id]= true;});
   }

$scope.send=function(){

$ionicLoading.show({template: 'Uploading...', duration:500});
 
var inscri2Promise =  user.setProfile($scope.data,$scope.data.num);
             inscri2Promise.then(function(response){   if(response.done){navigator.notification.alert("Merci pour votre inscription , nous activerons votre compte apres validation", function(){}, "Alerte", "ok"); sessionService.set("riderrndm","OK"+","+ $scope.data.num);sessionService.set("riderstate",'app.actif');sessionService.set("riderpic",$scope.data.picname);$rootScope.photo=$scope.data.picname;$state.go('app.login');}
             },function(error){alert("error "+JSON.stringify(error));});


}



                                  }catch(e){
                                     alert(e);}
                                 })
