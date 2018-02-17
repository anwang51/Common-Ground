(function(){
  angular
    .module('MB')
    .controller('ContactCtrl', ContactCtrl);
  ContactCtrl.$inject = ['FormService', '$http', '$log', 'ContactSheetURL'];

  function ContactCtrl(FormService, $http, $log, ContactSheetURL) {
    var vm = this;

    vm.submitted = false;
    vm.contact = { firstName: null, lastName: null, email: null, subject: null, message: null };

    vm.sendMessage = () => {
      var sent = FormService.sendToSheet(vm.contact, ContactSheetURL);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      return false;
    };
  }

}());
