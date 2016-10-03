 
mymodule.factory('starter.Friends', function ($http, $rootScope, $stateParams) {

  return {
    all: function () {
      return $http.get('https://friends.json/all', { params: { user_id: $rootScope.session } })
    },
    get: function () {
      return $http.get('https://friends.json/getOne', { params: { user_id: $rootScope.session, chat_id: $stateParams.idchat } })
    },
    add: function (id) {
      return $http.get('https://friends.json/new', { params: {idfriends:id}})
    }
  };
});
