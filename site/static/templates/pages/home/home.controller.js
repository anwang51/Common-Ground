(function() {
  angular
  .module('MB')
  .controller('HomeCtrl', HomeCtrl)
  .directive('membersList', MembersList);

  HomeCtrl.$inject = ['FormService', 'NotificationSheetURL', 'TeamService'];

  function HomeCtrl(FormService, NotificationSheetURL, TeamService) {
    var vm = this;

    vm.submitted = false;
    vm.notification = { firstName: null, lastName: null, email: null };

    vm.sendMessage = () => {
      var sent = FormService.sendToSheet(vm.notification, NotificationSheetURL);
      if (sent) {
        vm.submitted = true;
        return true;
      }
      return false;
    };

    vm.team = TeamService.getAll();
    vm.officers = TeamService.getOfficers();
    vm.developers = TeamService.getDevelopers();
    vm.alumni = TeamService.getAlumni();
  }

  function MembersList() {
    return {
      restrict: 'E',
      // transclude: true,
      scope: {
        name: "@",
        list: "="
      },
      templateUrl: 'templates/pages/home/members-list.html'
    };
  }

})();
