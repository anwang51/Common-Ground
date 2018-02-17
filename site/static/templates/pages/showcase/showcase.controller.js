(function(){
  angular
    .module('MB')
    .controller('ShowcaseCtrl', ShowcaseCtrl);

  ShowcaseCtrl.$inject = ['FormService', 'ShowcaseSheetURL'];

  function ShowcaseCtrl(FormService, ShowcaseSheetURL){
    var vm = this;
    vm.submitted = false;

    vm.company = { organization: null, email: null, firstName: null, lastName: null, message: null };
    console.log(ShowcaseSheetURL)

    vm.sendRequest = () => {
      var errMsg = "Error: Please complete all fields so we have enough information to proceed.";
      if (vm.company.message == null) { vm.company.message = ' ' }
      var sent = FormService.sendToSheet(vm.company, ShowcaseSheetURL, errMsg);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      return false;
    };
  }

}());
