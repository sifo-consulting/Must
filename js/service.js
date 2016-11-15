 
mymodule.factory('user', function ($http, $rootScope, $stateParams,$q) {


  var url='http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/';


  return {

    all: function () {
      return $http.get('https://friends.json/all', { params: { user_id: $rootScope.session } })
    },
   setActif: function (session,num) {
                            var deffered = $q.defer();

                        $http.get(url+'user/availables/set?lat='+session.lat+'&longg='+session.lng+'&available='+session.checked+'&num='+num)
                                  .success(function (data, status, headers, config) {
                                      deffered.resolve(data);
                                   }).error(function (data, status, headers, config) {
                                     alert("failed"); deffered.reject(status);
                                   });

                                   return deffered.promise;

              },
   validerCode: function (session) {
                        var deffered = $q.defer();

                    $http.get(url+'tempClient/mails/check?rand='+session.randm+'&num='+session.num+'&type=1')
                              .success(function (data, status, headers, config) {
                                  deffered.resolve(data);
                               }).error(function (data, status, headers, config) {
                                 alert("failed"); deffered.reject(status);
                               });

                               return deffered.promise;

          },
 getProfile: function (num) {
                        var deffered = $q.defer();

                    $http.get(url+'user/profile?num='+num)
                              .success(function (data, status, headers, config) {
                                  deffered.resolve(data);
                               }).error(function (data, status, headers, config) {
                                 alert("failed"); deffered.reject(status);
                               });

                               return deffered.promise;

          },
        inscrit: function (session) {
       var deffered = $q.defer();

 $http.get(encodeURI(url+'tempClient/create?email='+ session.email+'&nom='+session.nom+'&prenom='+session.prenom+'&num='+(session.selectedItem+session.num).replace('+','00')+'&pwd='+session.password))
             .success(function (data, status, headers, config) {
                 deffered.resolve(data);
              }).error(function (data, status, headers, config) {
                alert("failed"); deffered.reject(status);
              });

              return deffered.promise;

        },uploadPicture : function(picData) {
                                                var deffered = $q.defer();
                                           		try{
                                           		 var fileURL =picData;
                                           		var options = new FileUploadOptions();
                                           		options.fileKey = "file";
                                           		options.fileName = fileURL.substr(fileURL.lastIndexOf('/') + 1);
                                           		options.mimeType = "image/jpeg";
                                           		options.chunkedMode = false;

                                           		var params = {};
                                           		params.prenom = "ch";



                                           		options.params = params;

                                           		var ft = new FileTransfer();}catch(e){alert(e);}

                                           		ft.upload(fileURL, encodeURI("http://must.sifo-consulting.com/MustProject/web/upload.php"),
                                           		 function success(res){var img=res.response.replace(/(?:\r\n|\r|\n)/g,"");img=img.replace(/\ /g, "");

                                                                           deffered.resolve(img);},
                                                   function error(error) {deffered.reject(error);
                                           		}, options);
                                           		return deffered.promise;
          },
        setProfile: function (data,num) {
                      var deffered = $q.defer();
   console.log("imgggggg "+ data.adrpersonelle +" "+data.adresPro +" "+data.master+" "+data.numcrt +" "+data.ccv+" "+data.mmaa+" "+data.picname[0]+" "+data.picname[1]+" "+data.picname[2]+" "+data.picname[3]+" "+data.picname[4]+" "+data.picname[5]+" "+data.num);

         $http.post("http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/user/riders/registers", { cvv:data.cvv,numcrt:data.numcrt,master:data.master,mmaa:data.mmaa,prenom:data.prenom,adrPRO:data.adresPro ,adrpersonelle:data.adrpersonelle,photo:data.picname[0],   img_cin:data.picname[1], img_permis:data.picname[2],  img_carte_grise:data.picname[3],  img_assurance:data.picname[4],img_moto:data.picname[5],num:data.num})
                            .success(function (data, status, headers, config) {
                               deffered.resolve(data);
                             }).error(function (data, status, headers, config) {
                               alert("failed"); alert("error "+JSON.stringify(data)); deffered.reject(status);
                             });

                             return deffered.promise;

                       },
       inscritt: function (data) {
               var deffered = $q.defer();

            $http.post(url+"user/RiderRegister", { adrPERS:data.adrespers ,adrPRO:data.adrespro ,master:data.selectedItem, numcrt:data.numCart ,cvv:data.ccv, mma:data.mmaa,photo:data.picname[0],img_cin:data.picname[1],img_permis:data.picname[2],img_carte_grise:data.picname[3],img_assurance:data.picname[4],img_moto:data.picname[5],num:data.num})
            .success(function (data, status, headers, config) {
                        deffered.resolve(data);
                      }).error(function (data, status, headers, config) {
                        alert("failed"); deffered.reject(status);
                      });

                      return deffered.promise;

                },
    login: function (session) {
        var deffered = $q.defer();
          $http.get(url+'user/login?pwd='+ session.password+'&login='+session.login+'&type=1')
                  .success(function (data, status, headers, config) {
                      deffered.resolve(data);
                   }).error(function (data, status, headers, config) {
                     alert("failed"); deffered.reject(status);
                   });

                   return deffered.promise;
    },
     logout: function () {
                 var deffered = $q.defer();
                 $http.get(url+'user/logout')
                 .success(function (data, status, headers, config) {
                          deffered.resolve(data);
                          }).error(function (data, status, headers, config) {
                                   alert("failed"); deffered.reject(status);
                                   });
                 
                 return deffered.promise;
                 }
                 
  };
}
  )
.factory('Reservation', function($http,$q) {
         var url="http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/";
         
       
         
         return {
         setReservation: function(obj,idMe){
        
         var deffered = $q.defer();
         $http.get(url+'reservation/register?typeUser='+idMe+"0"+'&typeRider='+obj.id+'&price='+obj.price+'&startTime=&adrDep='+obj.dep+'&adrArv='+obj.arr+'&lat='+obj.lat+'&langg='+obj.lng)
         .success(function (data, status, headers, config) {
                  
                  deffered.resolve(data);
                  }).error(function (data, status, headers, config) {
                           deffered.reject(status);
                           });
         
         return deffered.promise;
         },
         checkResponse: function(id){
          
         var deffered = $q.defer();
         $http.get(url+'reservation/confirms/rider?id='+id)
         .success(function (data, status, headers, config) {
                  
                  deffered.resolve(data);
                  }).error(function (data, status, headers, config) {
                           alert("failed"); deffered.reject(status);
                           });
         
         return deffered.promise;
         }
         }
         
         })
.factory('Markers', function($http,$q) {
         
          var url="http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/";



                           return {
                           getMarkers: function(lat,lng){
         
                             var deffered = $q.defer();
                           $http.get(url+'user/nearestppl?lat='+ lat+'&lng='+ lng+'&rad=1500.2')
                        .success(function (data, status, headers, config) {
                              
                                 deffered.resolve(data);
                         }).error(function (data, status, headers, config) {
                           alert("failed"); deffered.reject(status);
                         });

                         return deffered.promise;
                           },
           addCircuits: function(pos,dt,session,num){
        console.log(url+"joureny/register?adrArv="+session.arriver+"&adrDep="+session.depart+"&date="+dt+"&idUser="+num+"&latDep="+pos[0].lat+"&longgDep="+pos[0].lng+"&montant="+session.montant+"&latArv="+pos[1].lat+"&longArv="+pos[1].lng);
           var deffered = $q.defer();
           $http.get(url+"joureny/register?adrArv="+session.arriver+"&adrDep="+session.depart+"&date="+dt+"&idUser="+num+"&latDep="+pos[0].lat+"&longgDep="+pos[0].lng+"&montant="+session.montant+"&latArv="+pos[1].lat+"&longArv="+pos[1].lng)

           .success(function (data, status, headers, config) {
                   deffered.resolve(data);
                    }).error(function (data, status, headers, config) {
                             alert("failed"); deffered.reject(status);
                             });
           
           return deffered.promise;
           },
           
                           getNumber : function(num) {
                                if(num){
           var ratings = [];
           
           for (var i = 0; i < num; i++) {
         ratings.push(i);
           }
          
           return ratings ;
           
                                       }
                                   }
           
           }})
 .factory('sessionService',['$http',function($http){
 return {
    set:function(key,value){
       return localStorage.setItem(key,JSON.stringify(value));
    },
    getNum:function(){
          try{var x=JSON.parse(localStorage.getItem("riderrndm")).split(",");
           return  x[1];
           }catch(e){
           console.log(e);
           }
        },
    get:function(key){
      return JSON.parse(localStorage.getItem(key));
    },
    destroy:function(key){
      return localStorage.removeItem(key);
    },
  };
 }])
 .factory('country', function($http,$q) {
          return { getAll : function () {
        var deffered = $q.defer();
        $http({
          method: 'GET',
          url: './images/countries.json'
        }).success(function (data, status, headers, config) {
          deffered.resolve(data);
        }).error(function (data, status, headers, config) {
          alert("failed"); deffered.reject(status);
        });

        return deffered.promise;
      
      }
  }}
 )
.directive('select', function() {
           return {
           restrict: 'E',
           link: function(scope, element, attrs) {
           element.bind('focus', function(e) {
                        if (window.cordova && window.cordova.plugins.Keyboard) {
                        // console.log("show bar (hide = false)");
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(false);
                        }
                        });
           element.bind('blur', function(e) {
                        if (window.cordova && window.cordova.plugins.Keyboard) {
                        // console.log("hide bar (hide = true)");
                        cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                        }
                        });
           }
           };
           })
 .directive('mhToggle', function($ionicGesture, $timeout) {

               return {
                 restrict: 'E',
                 replace: true,
                 require: '?ngModel',
                 transclude: true,
                 template:
                 '<div class="wrap">' +
                 '<div ng-transclude></div>' +
                 '<label class="toggle">' +
                 '<input type="checkbox">' +
                 '<div class="track">' +
                 '<div class="handle"></div>' +
                 '</div>' +
                 '</label>' +
                 '</div>',

                 compile: function(element, attr) {
                   var input = element.find('input');
                   angular.forEach({
                     'name': attr.name,
                     'ng-value': attr.ngValue,
                     'ng-model': attr.ngModel,
                     'ng-checked': attr.ngChecked,
                     'ng-disabled': attr.ngDisabled,
                     'ng-true-value': 1,
                     'ng-false-value': 0,
                     'ng-change': attr.ngChange
                   }, function(value, name) {
                     if (angular.isDefined(value)) {
                       input.attr(name, value);
                     }
                   });


                   if(attr.toggleClass) {
                     element[0].getElementsByTagName('label')[0].classList.add(attr.toggleClass);
                   }

                   return function($scope, $element, $attr) {
                     var el, checkbox, track, handle;

                     el = $element[0].getElementsByTagName('label')[0];
                     checkbox = el.children[0];track = el.children[1];
                     handle = track.children[0];

                     var ngModelController = angular.element(checkbox).controller('ngModel');

                     $scope.toggle = new ionic.views.Toggle({
                       el: el,
                       track: track,
                       checkbox: checkbox,
                       handle: handle,
                       onChange: function() {
                         if(checkbox.checked) {
                           ngModelController.$setViewValue(true);
                         } else {
                           ngModelController.$setViewValue(false);
                         }
                         $scope.$apply();
                       }
                     });

                     $scope.$on('$destroy', function() {
                       $scope.toggle.destroy();
                     });
                   };
                 }

               };
             }) ;
