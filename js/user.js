mymodule.controller('loginCtrl', function($scope ) {
$scope.myLogin={};


$scope.connect=function(){
alert($scope.myLogin.password);}

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
userPromise.then(function(response){alert(response.mail_check);;$state.go('app.inscription2');},function(error){alert(error);});
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
 .controller('inscription2Ctrl', function($scope, $ionicModal, $ionicHistory) {/*$ionicHistory.nextViewOptions({
                                                                                            disableBack: true
                                                                                        });*/})