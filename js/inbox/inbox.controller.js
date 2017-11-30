angular.module('inboxApp')
.controller('inbox', inbox)

  function inbox($http) {
    const vm = this
    const url = 'https://ang-database.herokuapp.com/api/messages';
      $http.get(url)
      .then((data) => {
        console.log(data);
        vm.messages = data.data._embedded.messages;
      })
  }
