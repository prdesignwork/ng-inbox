angular.module('inboxApp')
.controller('toolbar', toolbar)

  function toolbar() {
    const vm = this
    const url = 'https://ang-database.herokuapp.com/api/messages';

    vm.test = function(mail) {
      for (var i = 0; i < mail.length; i++) {
        mail[i].selected = true
      }
    }
    vm.unselectAll = function(mail) {
      for (var i = 0; i < mail.length; i++) {
        mail[i].selected = false
      }
    }

    vm.selectAll = function(mail) {
      var count = 0
      for (var i = 0; i < mail.length; i++) {
        if (mail[i].selected == true) {
        count++
      }
    }
    return count
  }
  vm.allLabels = [
    {
      id: 1,
      label: 'dev'
    },
    {
      id: 2,
      label: 'personal'
    },
    {
      id: 3,
      label: 'gschool'
    }
  ]


  vm.addLabel = function(selected, mail) {
    for (var i = 0; i < mail.length; i++) {
      if (mail[i].labels.indexOf(selected) === -1 && mail[i].selected == true) {
        mail[i].labels.push(selected)
      }
      mail[i].labels.sort()
    }
  }

  vm.removeLabel = function(deleted, mail) {
    for (var i = 0; i < mail.length; i++) {
    if (mail[i].labels.indexOf(deleted) >= 0 && mail[i].selected == true) {
      mail[i].labels.splice(mail[i].labels.indexOf(deleted), 1)
    }
    }
  }

  vm.star = function(message) {
      let bool = message.starred
        if (bool) {
          bool = false;
        } else {
          bool = true;
        }
      let data = {
        "messageIds": [message.id],
        "command": "star",
        "star": bool
      }
      $http.patch(url, data)
      .then(() => {
        $http.get(url)
        .then((result) => {
          vm.messages = result.data._embedded.messages
        })
      })
    }

}
