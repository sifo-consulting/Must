mymodule.controller('loginCtrl', function($scope ,$state,user) {
$scope.myLogin={};


$scope.connect=function(){

var loginPromise =  user.login($scope.myLogin);
loginPromise.then(function(response){if(response.enabled)$state.go('app.rechercheMap');},function(error){alert(error);});
}

})
.controller('codeValidationCtrl', function($scope,$state,$ionicPopup,user,sessionService ) {
$scope.data={};
 $scope.showConfirm = function() {
    var confirmPopup = $ionicPopup.confirm({
      title: 'Code erroné',
      template: 'Envoyez le code à nouveau?'
    });

    confirmPopup.then(function(res) {
      if(res) {
        console.log('You are sure');
      } else {
        console.log('You are not sure');
      }
    });
  };

$scope.valider=function(){
alert($scope.data.code);
var x=sessionService.get("rndm").split(",");

var session={num:x[1],randm:x[0]};


if($scope.data.code==x[0] && $scope.data.code){
var userPromise =  user.validerCode(session);
userPromise.then(function(response){alert(JSON.stringify(response));alert(response.mail_check);;$state.go('app.inscription2');},function(error){alert(error);});
}else
 $scope.showConfirm();
}
})
.controller('inscriptionCtrl', function($scope,$rootScope,$state , $ionicLoading, country,user,sessionService) {

try{
$scope.inscri={};
var countryPromise =  country.getAll();
countryPromise.then(function(response){$scope.country=response;},function(error){alert(error);});

$scope.send=function(){
 $ionicLoading.show({
      template: 'Loading...'
    });
var userPromise =  user.inscrit($scope.inscri);
 userPromise.then(function(response){
$ionicLoading.hide();
alert(JSON.stringify(response));
if(response.email==$scope.inscri.email && response.email){
alert("enregistré"+response.randm);


sessionService.set("rndm",response.randm+","+$scope.inscri.num);
$state.go('app.codeValidation');
}



 //assign data here to your $scope object
},function(error){
alert(error);
});
 }
}catch(e){
alert(e);}
})
 .controller('inscription2Ctrl',  function ($scope, $cordovaCamera, $ionicLoading,user,sessionService ) {
                                 try{	$scope.data = { };
                                        $scope.data.ftLoad=false;
                                        var x=sessionService.get("rndm").split(",");
                                        $scope.data.num=x[1];

                                        $scope.data.picname="";
                                       // $scope.data.picData="img/moto-1.jpg";
                                        //$scope.data.ftLoad = true;
                                     $scope.takePicture = function() {
                                 	  var options = {
                                         quality: 50,
                                         destinationType: Camera.DestinationType.FILE_URI,
                                         sourceType: Camera.PictureSourceType.CAMERA
                                       };
                                 	  $cordovaCamera.getPicture(options).then(
                                 		function(imageData) {
                                        $scope.data.picData =   imageData;
                                         $scope.uploadPicture();
                                            $scope.data.ftLoad = true;


                                 			$ionicLoading.show({template: 'Chargement...', duration:500});
                                 		},
                                 		function(err){
                                 			$ionicLoading.show({template: 'Error de chargement...', duration:500});
                                 			})
                                 	  }

                                 	  $scope.selectPicture = function() {
                                 		var options = {
                                 			quality: 50,
                                 			destinationType: Camera.DestinationType.FILE_URI,
                                 			sourceType: Camera.PictureSourceType.PHOTOLIBRARY
                                 		};

                                 	  $cordovaCamera.getPicture(options).then(
                                 		function(imageData) {
                                 			$scope.data.picData =   imageData;
                                 			 $scope.uploadPicture();
                                                $scope.data.ftLoad = true;


                                 		},
                                 		function(err){
                                 			$ionicLoading.show({template: 'Erreur ...', duration:500});
                                 		})
                                 	};

                                     $scope.uploadPicture = function() {
                                 		try{$ionicLoading.show({template: 'Uploading...'});
                                 		 var fileURL =$scope.data.picData;
                                 		var options = new FileUploadOptions();
                                 		options.fileKey = "file";
                                 		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                                 		options.mimeType = "image/jpeg";
                                 		options.chunkedMode = false;

                                 		var params = {};
                                 		params.prenom = "ch";



                                 		options.params = params;

                                 		var ft = new FileTransfer();}catch(e){alert(e);}
                                 		$ionicLoading.hide();
                                 		ft.upload(fileURL, encodeURI("http://must.sifo-consulting.com/MustProject/web/upload.php"), viewUploadedPictures, function(error) {alert(JSON.stringify(error));$ionicLoading.show({template: 'error de connection...'});
                                 		$ionicLoading.hide();}, options);
                                     }

                                 	var viewUploadedPictures = function(res) {


var img=res.response.replace(/[\r\n]+/g," ");img=img.replace(/\ /g, "");
$scope.data.picname=res.response;
alert("http://must.sifo-consulting.com/MustProject/web/users_pictures/"+res.response);
                                      //  $scope.data.picData="http://must.sifo-consulting.com/MustProject/web/users_pictures/"+res.response;

                                     }
$scope.send=function(){
alert($scope.data.checked);
var inscri2Promise =  user.inscritt($scope.data);
inscri2Promise.then(function(response){  alert(JSON.stringify(response.data));},function(error){alert(error);});


}



                                  }catch(e){
                                     alert(e);}
                                 })