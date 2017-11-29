angular.module('inboxApp')
.controller('inbox', inbox)

  function inbox($http) {
    const vm = this
      $http.get('https://ang-database.herokuapp.com/api/messages')
      .then((data) => {
        vm.messages = data.data._embedded.messages;
      })
}
