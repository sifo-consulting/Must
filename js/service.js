 
mymodule.factory('user', function ($http, $rootScope, $stateParams,$q) {


  var url='http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/';


  return {

    all: function () {
      return $http.get('https://friends.json/all', { params: { user_id: $rootScope.session } })
    },
    validerCode: function (session) {
                        var deffered = $q.defer();
                        alert(url+'tempClient/mails/check?rand='+session.randm+'&num='+session.num+'&type=0');
                    $http.get(url+'tempClient/mails/check?rand='+session.randm+'&num='+session.num+'&type=0')
                              .success(function (data, status, headers, config) {
                                  deffered.resolve(data);
                               }).error(function (data, status, headers, config) {
                                 alert("failed"); deffered.reject(status);
                               });

                               return deffered.promise;

          },

        inscrit: function (session) {
       var deffered = $q.defer();
     $http.get(url+'tempClient/create?email='+ session.email+'&nom='+session.nom+'&prenom='+session.prenom+'&num='+session.num+'&pwd='+session.password)
             .success(function (data, status, headers, config) {
                 deffered.resolve(data);
              }).error(function (data, status, headers, config) {
                alert("failed"); deffered.reject(status);
              });

              return deffered.promise;

        },
         inscritt: function (data) {
               var deffered = $q.defer();
            $http.post(url+"user/registers", { adrPERS:data.adrespers ,adrPRO:data.adrespro ,master:data.checked,visa:!data.checked, numcrt:data.numCart ,ccv:data.ccv, mma:data.mmaa,file:data.picname,num:data.num})
            .success(function (data, status, headers, config) {
                         deffered.resolve(data);
                      }).error(function (data, status, headers, config) {
                        alert("failed"); deffered.reject(status);
                      });

                      return deffered.promise;

                },
    login: function (session) {
        var deffered = $q.defer();
          $http.get(url+'user/login?pwd='+ session.password+'&login='+session.login)
                  .success(function (data, status, headers, config) {
                      deffered.resolve(data);
                   }).error(function (data, status, headers, config) {
                     alert("failed"); deffered.reject(status);
                   });

                   return deffered.promise;
    }
  };
}
 ).factory('Markers', function($http) {
                           
                           var markers = [];
           var data = [
                       {id:1,title: 'marker1',desc: 'marker1',lat: 37.422858, longg: -122.085065},
                       {id:2,title: 'marker2',desc: 'marker2', lat: 37.422858,longg:   10.085065},
                       
                       {id:3,title: 'markerN',desc: 'markerN', lat: 37.422858,longg:  -10.085065}
                       ];

                           return {
                           getMarkers: function(){
                           
           return data;
           /*$http.get("http://example.com/markers.php").then(function(response){
                                                                                   markers = response;
                                                                                   return markers;
                                                                                   });*/
                           
                           }
                           }
                           })
 .factory('sessionService',['$http',function($http){
 return {
    set:function(key,value){
       return localStorage.setItem(key,JSON.stringify(value));
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
                           );
