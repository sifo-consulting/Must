 
mymodule.factory('user', function ($http, $rootScope, $stateParams,$q) {


  var url='http://must.sifo-consulting.com/MustProject/web/app_dev.php/api/';


  return {

    all: function () {
      return $http.get('https://friends.json/all', { params: { user_id: $rootScope.session } })
    },
    validerCode: function (session) {
                        var deffered = $q.defer();
                    $http.get(url+'tempClient/mails/check?rand='+session.randm+'&num='+session.num)
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
    add: function (id) {
      return $http.get('https://friends.json/new', { params: {idfriends:id}})
    }
  };
}
 ).factory('Markers', function($http) {
                           
                           var markers = [];
           var data = [
                       {'title': 'marker1','desc': 'marker1', 'position': (37.422858, -122.085065)},
                       {'title': 'marker2','desc': 'marker2', 'position':  (37.422858, 10.085065)},
                       
                       {'title': 'markerN','desc': 'markerN', 'position':  (37.422858, -10.085065)}
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
